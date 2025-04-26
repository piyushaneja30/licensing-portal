import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User';

interface LicenseAttributes {
  id: number;
  userId: number;
  licenseNumber: string;
  licenseType: string;
  issueDate: Date;
  expirationDate: Date;
  status: 'active' | 'expired' | 'suspended' | 'revoked';
  documents: string[];
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LicenseCreationAttributes extends Optional<LicenseAttributes, 'id'> {}

class License extends Model<LicenseAttributes, LicenseCreationAttributes> implements LicenseAttributes {
  public id!: number;
  public userId!: number;
  public licenseNumber!: string;
  public licenseType!: string;
  public issueDate!: Date;
  public expirationDate!: Date;
  public status!: 'active' | 'expired' | 'suspended' | 'revoked';
  public documents!: string[];
  public notes?: string;
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
      references: {
        model: User,
        key: 'id',
      },
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
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'expired', 'suspended', 'revoked'),
      defaultValue: 'active',
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
  },
  {
    sequelize,
    modelName: 'License',
    tableName: 'licenses',
    hooks: {
      beforeSave: async (license: License) => {
        if (license.changed('expirationDate')) {
          const now = new Date();
          if (license.expirationDate < now) {
            license.status = 'expired';
          }
        }
      },
    },
  }
);

// Define associations
License.belongsTo(User, { foreignKey: 'userId', as: 'licensee' });

export default License; 