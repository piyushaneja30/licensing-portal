import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User';

interface LicenseApplicationAttributes {
  id: number;
  userId: number;
  licenseType: string;
  status: 'pending' | 'approved' | 'rejected' | 'in_review';
  applicationDate: Date;
  documents: string[];
  notes?: string;
  reviewDate?: Date;
  reviewerId?: number;
  reviewNotes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LicenseApplicationCreationAttributes extends Optional<LicenseApplicationAttributes, 'id'> {}

class LicenseApplication extends Model<LicenseApplicationAttributes, LicenseApplicationCreationAttributes> implements LicenseApplicationAttributes {
  public id!: number;
  public userId!: number;
  public licenseType!: string;
  public status!: 'pending' | 'approved' | 'rejected' | 'in_review';
  public applicationDate!: Date;
  public documents!: string[];
  public notes?: string;
  public reviewDate?: Date;
  public reviewerId?: number;
  public reviewNotes?: string;
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
      references: {
        model: User,
        key: 'id',
      },
    },
    licenseType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected', 'in_review'),
      defaultValue: 'pending',
    },
    applicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
    reviewDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    reviewerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    reviewNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'LicenseApplication',
    tableName: 'license_applications',
  }
);

// Define associations
LicenseApplication.belongsTo(User, { foreignKey: 'userId', as: 'applicant' });
LicenseApplication.belongsTo(User, { foreignKey: 'reviewerId', as: 'reviewer' });

export default LicenseApplication; 