// server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const enquiryRoutes = require('./routes/enquiryRoutes');
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
// Middleware
app.use(express.json());

// Routes
app.use('/api/enquiry', enquiryRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Node.js backend running...');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {})
.then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
.catch((err) => console.log('MongoDB connection error:', err));
