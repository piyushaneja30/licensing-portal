import express from 'express';
import cors from 'cors';
import { sequelize } from './config/database.ts';
import userRoutes from './routes/userRoutes.ts';
import licenseRoutes from './routes/licenseRoutes.ts';
import applicationRoutes from './routes/applicationRoutes.ts';
import authRoutes from './routes/authRoutes.ts';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/licenses', licenseRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/auth', authRoutes);

// Database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connection has been established successfully.');
    
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized.');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer(); 