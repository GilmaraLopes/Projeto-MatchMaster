import { ModelStatic } from 'sequelize';
import ITeam from '../database/models/interfaces/teamModel';
import Teams from '../database/models/TeamsModel';
import IteamService from './interfaces/teamService';

export default class TeamService implements IteamService {
  constructor(private teamModel:ModelStatic<Teams>) {}

  async getAllTeams(): Promise<ITeam[]> {
    return this.teamModel.findAll();
  }
}
