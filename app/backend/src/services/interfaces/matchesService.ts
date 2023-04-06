import IMatches from '../../database/models/interfaces/matchesModel';

export default interface IMatchesService {
  getAllMatches(): Promise<IMatches[]>;
  getOne(statusMatch:string): Promise<IMatches[]>;
}
