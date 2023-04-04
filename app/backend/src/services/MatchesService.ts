import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamsModel';
import IMatches from '../database/models/interfaces/matchesModel';
import Matches from '../database/models/MatchesModel';
import IMatchesService from './interfaces/matchesService';

export default class MatchesService implements IMatchesService {
  constructor(private matchesModel: ModelStatic<Matches>) { }

  async getAllMatches(): Promise<IMatches[]> {
    return this.matchesModel.findAll({ include: [
      {
        model: Teams, as: 'homeTeam',
      },
      {
        model: Teams, as: 'awayTeam',
      },
    ] });
  }
}
