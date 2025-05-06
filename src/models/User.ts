import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../config/database.js';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  accountType: 'individual' | 'business';
  profile: {
    firstName: string;
    lastName: string;
    phone: string;
    profession?: string;
    specialization?: string;
    yearsOfExperience?: number;
    licenseNumber?: string;
    companyName?: string;
    industryType?: string;
    companySize?: string;
    businessType?: string;
    registrationNumber?: string;
    jobTitle?: string;
    businessAddress?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UserCreationAttributes extends Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public accountType!: 'individual' | 'business';
  public profile!: UserAttributes['profile'];
  public role!: 'user' | 'admin';
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
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
    },
    accountType: {
      type: DataTypes.ENUM('individual', 'business'),
      allowNull: false,
    },
    profile: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User; 