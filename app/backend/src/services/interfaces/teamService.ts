import ITeam from '../../database/models/interfaces/teamModel';

export default interface IteamService {
  getAllTeams(): Promise<ITeam[]>
}
