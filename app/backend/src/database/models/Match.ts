import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamsModel from './Team';

class Matches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      type: INTEGER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeam: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
  },
);

Matches.belongsTo(TeamsModel, { foreignKey: 'homeTeam', as: 'homeMT' });
Matches.belongsTo(TeamsModel, { foreignKey: 'awayTeam', as: 'awayMT' });

TeamsModel.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeTM' });
TeamsModel.hasMany(Matches, { foreignKey: 'awayTeam', as: 'awayTM' });

export default Matches;
