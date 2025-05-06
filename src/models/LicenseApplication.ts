import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

class LicenseApplication extends Model {
  public id!: number;
  public userId!: number;
  public licenseType!: string;
  public status!: string;
  public applicationDate!: Date;
  public reviewDate?: Date;
  public documents!: any[];
  public notes?: string;
  public personalInfo!: any;
  public education!: any;
  public reviewNotes!: any[];
  public applicationNumber!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

LicenseApplication.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    licenseType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'draft',
    },
    applicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    reviewDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    documents: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    personalInfo: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    education: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    reviewNotes: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    applicationNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'LicenseApplication',
    tableName: 'license_applications',
  }
);

LicenseApplication.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(LicenseApplication, { foreignKey: 'userId' });

export default LicenseApplication; 