import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamsModel';
import IMatches from '../database/models/interfaces/matchesModel';
import Matches from '../database/models/MatchesModel';
import IMatchesService, { ICreate, IGoals } from './interfaces/matchesService';
import ErrorGenerate from '../helpers/errorGenerate';

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
  }

  async insertMatch(match: ICreate): Promise<IMatches> {
    if (match.homeTeamId === match.awayTeamId) {
      throw new ErrorGenerate('It is not possible to create a match with two equal teams', 422);
    }
    const homeTeam = await this.matchesModel.findByPk(match.homeTeamId);
    const awayTeam = await this.matchesModel.findByPk(match.awayTeamId);
    if (!homeTeam || !awayTeam) {
      throw new ErrorGenerate('There is no team with such id!', 404);
    }

    const result = await this.matchesModel.create({ ...match, inProgress: true });
    return result;
  }
}
