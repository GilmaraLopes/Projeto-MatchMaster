import ITeam from '../../database/models/interfaces/teamModel';

export default interface IteamService {
  getAllTeams(): Promise<ITeam[]>;
  getByIdTeams(id: string): Promise<ITeam | null>;
}
