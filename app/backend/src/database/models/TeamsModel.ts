import { DataTypes, InferAttributes, Model } from 'sequelize';
import db from '.';

class Teams extends Model<InferAttributes<Teams>> {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default Teams;
