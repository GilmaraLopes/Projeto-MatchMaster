import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamsModel';
import IMatches from '../database/models/interfaces/matchesModel';
import Matches from '../database/models/MatchesModel';
import IMatchesService, { IGoals } from './interfaces/matchesService';

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
    await this.matchesModel.update({ inProgress: 0 }, { where: { id } });
  }

  async updateMatch(match: IGoals, id: number): Promise<void> {
    await this.matchesModel.update({
      homeTeamGoals: match.homeTeamGoals,
      awayTeamGoals: match.awayTeamGoals,
    }, { where: { id } });
    console.log({ match });
  }
}
