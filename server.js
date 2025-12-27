// server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const enquiryRoutes = require('./routes/enquiryRoutes');
const Career =require('./routes/careerRoutes')
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Multiple origins allowed
const allowedOrigins = [
  "http://localhost:3000",
  "https://coxfuture.com"
];

app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// Middleware
app.use(express.json());

// Routes
<<<<<<< Updated upstream
app.use('/api/enquiry', enquiryRoutes);
app.use('/api', Career);
=======
app.use('/enquiry', enquiryRoutes);
>>>>>>> Stashed changes

// Root route
app.get('/api/', (req, res) => {
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
