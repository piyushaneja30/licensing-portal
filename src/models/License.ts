import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class License extends Model {
  public id!: number;
  public userId!: number;
  public licenseNumber!: string;
  public licenseType!: string;
  public issueDate!: Date;
  public expiryDate!: Date;
  public status!: string;
  public name!: string;
  public description!: string;
  public fee!: number;
  public category!: string;
  public requirements!: any[];
  public processingTime!: string;
  public validityPeriod!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

License.init(
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
    licenseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    licenseType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    issueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fee: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requirements: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    processingTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    validityPeriod: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'License',
    tableName: 'licenses',
  }
);

export default License; 