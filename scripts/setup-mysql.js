import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

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
function createDatabase() {
  return new Promise((resolve) => {
    const mysqlPath = findMySQLPath();
    const createDbCommand = `"${mysqlPath}" -u root -e "CREATE DATABASE IF NOT EXISTS licensing_portal;"`;
    
    exec(createDbCommand, (error) => {
      if (error) {
        console.log('Error creating database. Trying with password prompt...');
        console.log('Please enter your MySQL root password when prompted.');
        console.log('You can also manually create the database using:');
        console.log('CREATE DATABASE licensing_portal;');
        resolve(false);
      } else {
        console.log('Database "licensing_portal" created successfully.');
        resolve(true);
      }
    });
  });
}

// Function to create tables
async function createTables() {
  try {
    const sequelize = new Sequelize({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'licensing_portal',
      logging: false,
    });

    // Import models
    const User = (await import('../src/models/User.js')).default;
    const License = (await import('../src/models/License.js')).default;
    const LicenseApplication = (await import('../src/models/LicenseApplication.js')).default;

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
    console.log('Creating database...');
    await createDatabase();
    
    // Update .env file
    const envPath = path.join(__dirname, '../.env');
    console.log('Please enter your MySQL root password:');
    const envContent = `PORT=5001
JWT_SECRET=your-secret-key
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=licensing_portal`;

    fs.writeFileSync(envPath, envContent);
    console.log('.env file updated with MySQL configuration.');
    console.log('IMPORTANT: Please update the MYSQL_PASSWORD in .env with your actual MySQL root password.');
    
    console.log('\nCreating tables...');
    await createTables();
    
    console.log('\nSetup completed! After updating the password in .env, you can start the server with:');
    console.log('npm run dev:backend');
  }
}

setup(); 