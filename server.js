const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI environment variable is not set!');
    console.log('⚠️  Running in demo mode without database');
}

if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    })
    .then(() => {
        console.log('✅ MongoDB Connected successfully');
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error.message);
    });
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

// POST new submission
app.post('/api/submissions', async (req, res) => {
    try {
        const newSubmission = new Submission({
            ...req.body,
            updatedAt: Date.now()
        });
        const saved = await newSubmission.save();
        res.json({ success: true, data: saved });
    } catch (error) {
        console.error('Error creating submission:', error);
        res.status(500).json({ success: false, error: error.message });
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
app.delete('/api/submissions/:id', async (req, res) => {
    try {
        const submission = await Submission.findByIdAndDelete(req.params.id);
        
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

// Fallback to serve index.html for root path
app.get('/', (req, res) => {
    console.log('✅ Root route (/) hit - serving landing.html');
    res.sendFile(__dirname + '/landing.html');
});

// Serve specific HTML files
app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/submissions.html', (req, res) => {
    res.sendFile(__dirname + '/submissions.html');
});

app.get('/process-flow.html', (req, res) => {
    res.sendFile(__dirname + '/process-flow.html');
});

app.get('/landing.html', (req, res) => {
    res.sendFile(__dirname + '/landing.html');
});

// Fallback for any other route - serve index.html (SPA routing)
app.get('*', (req, res) => {
    console.log(`⚠️  Fallback route (*) hit for: ${req.path} - serving index.html`);
    res.sendFile(__dirname + '/index.html');
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log('📊 API Endpoints:');
    console.log('  GET  /api/submissions - Get all submissions');
    console.log('  POST /api/submissions - Create new submission');
    console.log('  PUT  /api/submissions/:id - Update submission');
    console.log('  DELETE /api/submissions/:id - Delete submission');
    console.log('  GET  /api/stats - Get statistics\n');
});
