import express from 'express';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import parcelRoutes from './routes/parcelRoutes.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middleware
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, "../frontend")));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/parcels', parcelRoutes);

// serve html files for specific routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "register.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "login.html"));
});

app.get("/client", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "client.html"));
});

app.get("/agent", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "agent.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "admin.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
