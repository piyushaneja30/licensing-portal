import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import readline from 'readline';
import User from '../src/models/User';
import License from '../src/models/License';
import LicenseApplication from '../src/models/LicenseApplication';
import ApplicationReviewNote from '../src/models/ApplicationReviewNote';
import ApplicationDocument from '../src/models/ApplicationDocument';
import ApplicationEducation from '../src/models/ApplicationEducation';
import BusinessProfile from '../src/models/BusinessProfile';
import UserProfile from '../src/models/UserProfile';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt for password
function promptForPassword(): Promise<string> {
  return new Promise((resolve) => {
    rl.question('Please enter your MySQL root password: ', (password) => {
      resolve(password);
    });
  });
}

// MySQL default installation paths on Windows
const mysqlPaths = [
  'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe',
  'C:\\Program Files (x86)\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe',
  'C:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\mysql.exe',
  'C:\\Program Files (x86)\\MySQL\\MySQL Server 5.7\\bin\\mysql.exe'
];

// Function to find MySQL executable
function findMySQLPath() {
  for (const mysqlPath of mysqlPaths) {
    if (fs.existsSync(mysqlPath)) {
      return mysqlPath;
    }
  }
  return null;
}

// Function to check if MySQL is installed
function checkMySQL() {
  return new Promise((resolve) => {
    const mysqlPath = findMySQLPath();
    if (!mysqlPath) {
      console.log('Could not find MySQL installation in standard paths.');
      console.log('Please enter your MySQL root password when prompted.');
      resolve(false);
      return;
    }

    exec(`"${mysqlPath}" --version`, (error) => {
      if (error) {
        console.log('Error checking MySQL version. Please make sure MySQL is running.');
        resolve(false);
      } else {
        console.log('MySQL is installed and accessible.');
        resolve(true);
      }
    });
  });
}

// Function to create database
async function createDatabase(password: string) {
  return new Promise((resolve) => {
    const mysqlPath = findMySQLPath();
    const createDbCommand = `"${mysqlPath}" -u root -p${password} -e "CREATE DATABASE IF NOT EXISTS licensing_portal;"`;
    
    exec(createDbCommand, (error) => {
      if (error) {
        console.log('Error creating database. Please check your password and try again.');
        resolve(false);
      } else {
        console.log('Database "licensing_portal" created successfully.');
        resolve(true);
      }
    });
  });
}

// Function to create tables
async function createTables(password: string) {
  try {
    const sequelize = new Sequelize({
      dialect: 'mysql',
      host: 'localhost',
      username: 'root',
      password: password,
      database: 'licensing_portal',
      logging: false,
    });

    // Sync all models
    await sequelize.sync({ force: true });
    console.log('All tables created successfully.');

    await sequelize.close();
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  }
}

// Main function
async function setup() {
  console.log('Checking MySQL installation...');
  const isMySQLInstalled = await checkMySQL();
  
  if (isMySQLInstalled) {
    const password = await promptForPassword();
    
    console.log('Creating database...');
    const dbCreated = await createDatabase(password);
    
    if (dbCreated) {
      // Update .env file
      const envPath = path.join(__dirname, '../.env');
      const envContent = `PORT=5001
JWT_SECRET=your-secret-key
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=${password}
MYSQL_DATABASE=licensing_portal`;

      fs.writeFileSync(envPath, envContent);
      console.log('.env file updated with MySQL configuration.');
      
      console.log('\nCreating tables...');
      await createTables(password);
      
      console.log('\nSetup completed! You can start the server with:');
      console.log('npm run dev:backend');
    }
  }
  
  rl.close();
}

setup(); 