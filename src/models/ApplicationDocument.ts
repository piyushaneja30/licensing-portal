import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import LicenseApplication from './LicenseApplication';

class ApplicationDocument extends Model {
  public id!: number;
  public applicationId!: number;
  public name!: string;
  public type!: string;
  public url!: string;
  public uploadDate!: Date;
  public status!: 'pending' | 'approved' | 'rejected';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ApplicationDocument.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    applicationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: LicenseApplication,
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uploadDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'ApplicationDocument',
    tableName: 'application_documents',
  }
);

// Define associations
LicenseApplication.hasMany(ApplicationDocument, { foreignKey: 'applicationId' });
ApplicationDocument.belongsTo(LicenseApplication, { foreignKey: 'applicationId' });

export default ApplicationDocument; 