import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import User from './models/User.js';
import License from './models/License.js';
import LicenseApplication from './models/LicenseApplication.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// Initialize database connection
async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

// Initialize database
initializeDatabase();

// Import routes
import authRoutes from './routes/authRoutes.js';
import licenseRoutes from './routes/licenseRoutes.js';
import licenseApplicationRoutes from './routes/licenseApplicationRoutes.js';

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/licenses', licenseRoutes);
app.use('/api/applications', licenseApplicationRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 