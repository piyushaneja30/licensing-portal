import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import LicenseApplication from './LicenseApplication';

class ApplicationReviewNote extends Model {
  public id!: number;
  public applicationId!: number;
  public date!: Date;
  public reviewer!: string;
  public note!: string;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ApplicationReviewNote.init(
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
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    reviewer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'ApplicationReviewNote',
    tableName: 'application_review_notes',
  }
);

// Define associations
LicenseApplication.hasMany(ApplicationReviewNote, { foreignKey: 'applicationId' });
ApplicationReviewNote.belongsTo(LicenseApplication, { foreignKey: 'applicationId' });

export default ApplicationReviewNote; 