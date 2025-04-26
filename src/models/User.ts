import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  role: 'user' | 'admin';
  accountType: 'individual' | 'business';
  firstName: string;
  lastName: string;
  phone: string;
  profession?: string;
  licenseNumber?: string;
  specialization?: string;
  yearsOfExperience?: number;
  companyName?: string;
  industryType?: string;
  companySize?: string;
  businessType?: string;
  registrationNumber?: string;
  jobTitle?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public role!: 'user' | 'admin';
  public accountType!: 'individual' | 'business';
  public firstName!: string;
  public lastName!: string;
  public phone!: string;
  public profession?: string;
  public licenseNumber?: string;
  public specialization?: string;
  public yearsOfExperience?: number;
  public companyName?: string;
  public industryType?: string;
  public companySize?: string;
  public businessType?: string;
  public registrationNumber?: string;
  public jobTitle?: string;
  public street?: string;
  public city?: string;
  public state?: string;
  public zipCode?: string;
  public country?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async comparePassword(candidatePassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      throw new Error('Password comparison failed');
    }
  }

  public generateAuthToken(): string {
    return jwt.sign(
      { userId: this.id.toString() },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
  }

  public toJSON(): any {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, Infinity],
      },
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    },
    accountType: {
      type: DataTypes.ENUM('individual', 'business'),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    licenseNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    yearsOfExperience: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    industryType: {
      type: DataTypes.ENUM(
        'Healthcare',
        'Manufacturing',
        'Technology',
        'Finance',
        'Education',
        'Construction',
        'Retail',
        'Transportation',
        'Energy',
        'Other'
      ),
      allowNull: true,
    },
    companySize: {
      type: DataTypes.ENUM(
        '1-10 employees',
        '11-50 employees',
        '51-200 employees',
        '201-500 employees',
        '501-1000 employees',
        '1000+ employees'
      ),
      allowNull: true,
    },
    businessType: {
      type: DataTypes.ENUM('Corporation', 'LLC', 'Partnership', 'Sole Proprietorship', 'Other'),
      allowNull: true,
    },
    registrationNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeSave: async (user: User) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User; 