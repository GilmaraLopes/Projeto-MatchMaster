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

  async getOne(statusMatch: string): Promise<IMatches[]> {
    const inProgress = statusMatch === 'true' ? 1 : 0;
    return this.matchesModel.findAll({
      where: { inProgress },
      include: [
        {
          model: Teams, as: 'homeTeam',
        },
        {
          model: Teams, as: 'awayTeam',
        },
      ],
    });
  }

  async updateMatchFinish(id: number): Promise<void> {
    // const inProgress = statusMatch === 'true' ? 1 : 0;
    await this.matchesModel.update({ inProgress: 0 }, { where: { id } });
  }
}
