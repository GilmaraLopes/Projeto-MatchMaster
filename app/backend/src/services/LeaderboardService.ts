import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import IGetLeader, { ILeaderboard } from './interfaces/leaderboardModel';

export default class LeaderboardService implements IGetLeader {
  private teamsModel: ModelStatic<Teams> = Teams;
  private matchesModel: ModelStatic<Matches> = Matches;

  async getTeam(): Promise<Teams[]> {
    const nameTeam = await this.teamsModel.findAll();
    return nameTeam;
  }

  async getMatches(): Promise<Matches[]> {
    const matches = await this.matchesModel.findAll({ where: { inProgress: false } });
    return matches;
  }

  static getTotalGames(id: number, matches: Matches[]) {
    const totalGames = matches.map((match) => id === match.homeTeamId)
      .reduce((count, m) => Number(count) + Number(m), 0);
    return totalGames;
  }

  static getTotalVictories(id:number, matches:Matches[]) {
    const totalVictories = matches.map((match) =>
      match.homeTeamGoals > match.awayTeamGoals && id === match.homeTeamId)
      .reduce((count, m) => Number(count) + Number(m), 0);
    return totalVictories;
  }

  static getTotalDraws(id: number, matches: Matches[]) {
    const totalDraws = matches.map((match) =>
      match.homeTeamGoals === match.awayTeamGoals && id === match.homeTeamId)
      .reduce((draw, count) => Number(draw) + Number(count), 0);
    return totalDraws;
  }

  static getTotalLoss(id:number, matches:Matches[]) {
    const totalLoss = matches.map((match) =>
      match.homeTeamGoals < match.awayTeamGoals && id === match.homeTeamId)
      .reduce((loss, count) => Number(loss) + Number(count), 0);
    return totalLoss;
  }

  static getGoalsFavor(id:number, matches:Matches[]) {
    const totalGoalsFavor = matches
      .map((match) => id === match.homeTeamId && match.homeTeamGoals)
      .reduce((favor, count) => Number(favor) + Number(count), 0);
    return totalGoalsFavor;
  }

  static getGoalsOwn(id: number, matches: Matches[]) {
    const totalGoalsOwn = matches
      .map((match) => id === match.homeTeamId && match.awayTeamGoals)
      .reduce((favor, count) => Number(favor) + Number(count), 0);
    return totalGoalsOwn;
  }

  static getTotalPoints(id: number, matches: Matches[]) {
    const partidas = this.getTotalGames(id, matches);
    const vitorias = this.getTotalVictories(id, matches);
    const derrotas = this.getTotalLoss(id, matches);
    const empates = this.getTotalDraws(id, matches);
    const totalPoints = ((partidas - empates - derrotas) * 3) + (partidas - vitorias - derrotas);
    return totalPoints;
  }

  async getInfo(): Promise<ILeaderboard[]> {
    const teams = await this.getTeam();
    const match = await this.getMatches();
    const test = teams.map((t) => ({
      name: t.teamName,
      totalPoints: LeaderboardService.getTotalPoints(t.id, match),
      totalGames: LeaderboardService.getTotalGames(t.id, match),
      totalVictories: LeaderboardService.getTotalVictories(t.id, match),
      totalDraws: LeaderboardService.getTotalDraws(t.id, match) as number,
      totalLosses: LeaderboardService.getTotalLoss(t.id, match) as number,
      goalsFavor: LeaderboardService.getGoalsFavor(t.id, match) as number,
      goalsOwn: LeaderboardService.getGoalsOwn(t.id, match) as number,
    }));
    return test;
  }
}
