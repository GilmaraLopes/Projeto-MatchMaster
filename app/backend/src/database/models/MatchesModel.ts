import { DataTypes, InferAttributes, Model } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';

class Matches extends Model<InferAttributes<Matches>> {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Teams.hasMany(Matches, { foreignKey: 'home_team_id', as: 'id' });
Teams.hasMany(Matches, { foreignKey: 'home_team_goals', as: 'id' });
Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'home_team_id' });
Matches.belongsTo(Teams, { foreignKey: 'homeTeamGoals', as: 'home_team_goals' });

export default Matches;
