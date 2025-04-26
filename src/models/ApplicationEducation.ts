import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import LicenseApplication from './LicenseApplication';

class ApplicationEducation extends Model {
  public id!: number;
  public applicationId!: number;
  public institution!: string;
  public degree!: string;
  public graduationYear!: number;
  public field!: string;
  public gpa?: number;
  public credits?: number;
  public major?: string;
  public minor?: string;
  public honors?: string;
  public thesis?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ApplicationEducation.init(
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
    institution: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    degree: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    graduationYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    field: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gpa: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    credits: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    major: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    minor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    honors: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thesis: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'ApplicationEducation',
    tableName: 'application_education',
  }
);

// Define associations
LicenseApplication.hasMany(ApplicationEducation, { foreignKey: 'applicationId' });
ApplicationEducation.belongsTo(LicenseApplication, { foreignKey: 'applicationId' });

export default ApplicationEducation; 