import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class BusinessProfile extends Model {
  public id!: number;
  public userId!: number;
  public companyName!: string;
  public industryType!: string;
  public companySize!: string;
  public businessType!: string;
  public registrationNumber!: string;
  public jobTitle!: string;
  public street!: string;
  public city!: string;
  public state!: string;
  public zipCode!: string;
  public country!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BusinessProfile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
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
      allowNull: false,
    },
    businessType: {
      type: DataTypes.ENUM(
        'Corporation',
        'LLC',
        'Partnership',
        'Sole Proprietorship',
        'Other'
      ),
      allowNull: false,
    },
    registrationNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BusinessProfile',
    tableName: 'business_profiles',
  }
);

// Define associations
User.hasOne(BusinessProfile, { foreignKey: 'userId' });
BusinessProfile.belongsTo(User, { foreignKey: 'userId' });

export default BusinessProfile; 