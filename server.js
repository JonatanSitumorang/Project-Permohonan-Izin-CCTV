const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname, {
    index: 'landing.html' // Serve landing.html as default for root
}));

// Handle connection errors globally
app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    if (err.name === 'MongooseError' || err.name === 'MongoNetworkError') {
        return res.status(503).json({ success: false, error: 'Database connection error. Please try again.' });
    }
    res.status(500).json({ success: false, error: err.message || 'Internal server error' });
});

// MongoDB Connection - Cache globally to avoid connection storming on Vercel serverless
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI environment variable is not set!');
    console.log('⚠️  Running in demo mode without database');
}

// Ensure we only connect once across function invocations (critical for Vercel)
if (MONGODB_URI && !mongoose.connection.readyState) {
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 8000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 10000,
        maxPoolSize: 5,
        minPoolSize: 1,
        retryWrites: true,
        w: 'majority',
        family: 4 // Force IPv4 for better compatibility
    })
    .then(() => {
        console.log('✅ MongoDB Connected successfully');
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error.message);
    });
    
    // Handle connection events
    mongoose.connection.on('disconnected', () => {
        console.warn('⚠️  MongoDB disconnected');
    });
    
    mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err.message);
    });
} else if (MONGODB_URI) {
    console.log('✅ MongoDB already connected or connecting');
} else {
    console.log('⚠️  MongoDB connection skipped - using demo mode');
}

// Define Submission Schema
const submissionSchema = new mongoose.Schema({
    refNumber: { type: String, required: true, unique: true },
    nama: { type: String, required: true },
    departemen: { type: String, required: true },
    lokasi: { type: String, required: true },
    tujuan: { type: String, required: true },
    telepon: { type: String, required: true },
    email: { type: String, default: '-' },
    timestamp: { type: String, required: true },
    timestampMs: { type: Number, required: true },
    customDate: { type: String },
    customTime: { type: String },
    estimatedVerifikasi: { type: String },
    estimatedDisposisi: { type: String },
    catatan: { type: String, default: '' },
    status: { type: String, default: 'pending', enum: ['pending', 'verified', 'approved', 'rejected', 'escalated'] },
    verifiedAt: { type: String },
    verifiedBy: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Submission = mongoose.model('Submission', submissionSchema);

// Password Schema - simpan password untuk akses riwayat
const passwordSchema = new mongoose.Schema({
    key: { type: String, default: 'riwayatPassword', unique: true },
    password: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now }
});

const Password = mongoose.model('Password', passwordSchema);

// Routes

// GET all submissions
app.get('/api/submissions', async (req, res) => {
    try {
        const submissions = await Submission.find().sort({ timestampMs: -1 });
        res.json(submissions);
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST new submission with retry logic
app.post('/api/submissions', async (req, res) => {
    try {
        // Validate required fields
        if (!req.body.refNumber || !req.body.nama || !req.body.departemen) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }
        
        // Check if database is connected
        if (!mongoose.connection.readyState) {
            console.warn('⚠️  DB not ready, attempting to reconnect...');
            // Wait max 5 seconds for connection
            const connectionReady = await new Promise(resolve => {
                const checkInterval = setInterval(() => {
                    if (mongoose.connection.readyState === 1) {
                        clearInterval(checkInterval);
                        resolve(true);
                    }
                }, 500);
                setTimeout(() => {
                    clearInterval(checkInterval);
                    resolve(false);
                }, 5000);
            });
            
            if (!connectionReady) {
                return res.status(503).json({ success: false, error: 'Database sedang tidak siap. Silakan coba lagi.' });
            }
        }
        
        const newSubmission = new Submission({
            ...req.body,
            updatedAt: Date.now()
        });
        
        const saved = await newSubmission.save();
        
        res.json({ success: true, data: saved });
    } catch (error) {
        console.error('Error creating submission:', error.message);
        
        // Check if it's a duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({ success: false, error: 'Reference number already exists' });
        }
        
        // Check for timeout/connection errors
        if (error.message.includes('timed out') || error.name === 'MongoNetworkError' || error.name === 'MongoServerError') {
            return res.status(503).json({ success: false, error: 'Database timeout. Coba lagi dalam beberapa saat.' });
        }
        
        // Generic error
        res.status(500).json({ success: false, error: 'Gagal menyimpan pengajuan: ' + error.message });
    }
});

// PUT update submission (for status changes)
app.put('/api/submissions/:id', async (req, res) => {
    try {
        const submission = await Submission.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        
        if (!submission) {
            return res.status(404).json({ success: false, error: 'Submission not found' });
        }
        
        res.json({ success: true, data: submission });
    } catch (error) {
        console.error('Error updating submission:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// DELETE submission
app.delete('/api/submissions/:id', async (_req, res) => {
    try {
        const submission = await Submission.findByIdAndDelete(_req.params.id, {
            timeout: 30000
        });
        
        if (!submission) {
            return res.status(404).json({ success: false, error: 'Submission not found' });
        }
        
        res.json({ success: true, message: 'Submission deleted' });
    } catch (error) {
        console.error('Error deleting submission:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET statistics
app.get('/api/stats', async (req, res) => {
    try {
        const total = await Submission.countDocuments();
        const pending = await Submission.countDocuments({ $or: [{ status: 'pending' }, { status: { $exists: false } }] });
        const verified = await Submission.countDocuments({ status: 'verified' });
        const approved = await Submission.countDocuments({ status: 'approved' });
        const rejected = await Submission.countDocuments({ status: 'rejected' });
        const escalated = await Submission.countDocuments({ status: 'escalated' });
        
        const stats = {
            total,
            pending,
            verified,
            approved,
            rejected,
            escalated
        };
        
        res.json(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET riwayat password
app.get('/api/riwayat-password', async (_req, res) => {
    try {
        let passwordDoc = await Password.findOne({ key: 'riwayatPassword' });
        
        // Jika belum ada, buat dengan default password
        if (!passwordDoc) {
            passwordDoc = new Password({
                key: 'riwayatPassword',
                password: 'admin123'
            });
            await passwordDoc.save();
        }
        
        res.json({ password: passwordDoc.password });
    } catch (error) {
        console.error('Error fetching password:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// UPDATE riwayat password
app.post('/api/riwayat-password', async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        
        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ success: false, error: 'Password minimal 6 karakter' });
        }
        
        let passwordDoc = await Password.findOne({ key: 'riwayatPassword' });
        
        if (!passwordDoc) {
            passwordDoc = new Password({
                key: 'riwayatPassword',
                password: newPassword
            });
        } else {
            // Verify old password
            if (oldPassword !== passwordDoc.password) {
                return res.status(401).json({ success: false, error: 'Password lama salah' });
            }
            passwordDoc.password = newPassword;
        }
        
        passwordDoc.updatedAt = Date.now();
        await passwordDoc.save();
        
        res.json({ success: true, message: 'Password berhasil diubah' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Explicit routes for HTML files (must come BEFORE static middleware behavior)
app.get('/index.html', (_req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/submissions.html', (_req, res) => {
    res.sendFile(__dirname + '/submissions.html');
});

app.get('/process-flow.html', (_req, res) => {
    res.sendFile(__dirname + '/process-flow.html');
});

app.get('/landing.html', (_req, res) => {
    res.sendFile(__dirname + '/landing.html');
});

// Handle favicon request
app.get('/favicon.ico', (_req, res) => {
    res.status(204).end(); // Return empty response, no content
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log('📊 API Endpoints:');
    console.log('  GET  /api/submissions - Get all submissions');
    console.log('  POST /api/submissions - Create new submission');
    console.log('  PUT  /api/submissions/:id - Update submission');
    console.log('  DELETE /api/submissions/:id - Delete submission');
    console.log('  GET  /api/stats - Get statistics');
    console.log('  GET  /api/riwayat-password - Get riwayat password');
    console.log('  POST /api/riwayat-password - Update riwayat password\n');
});
