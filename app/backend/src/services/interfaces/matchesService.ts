import IMatches from '../../database/models/interfaces/matchesModel';

export default interface IMatchesService {
  getAllMatches(): Promise<IMatches[]>;
  getOne(statusMatch:string): Promise<IMatches[]>;
  updateMatchFinish(id: number):Promise<void>;
  updateMatch(match: IGoals, id: number): Promise<void>;
}

export interface IGoals{
  'homeTeamGoals': number,
  'awayTeamGoals': number
}
