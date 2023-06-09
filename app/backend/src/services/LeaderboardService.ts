import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import IGetLeader, { ILeaderboard } from './interfaces/leaderboardModel';

export interface IObj {
  home: ILeaderboard[],
  away: ILeaderboard[],
}
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

  static getTotalGames(id: number, team:'homeTeamId' | 'awayTeamId', matches: Matches[]) {
    if (team === 'homeTeamId') {
      const totalGames = matches.map((match) => id === match.homeTeamId)
        .reduce((count, m) => Number(count) + Number(m), 0);
      return totalGames;
    }
    if (team === 'awayTeamId') {
      const totalGames = matches.map((match) => id === match.awayTeamId)
        .reduce((count, m) => Number(count) + Number(m), 0);
      return totalGames;
    }
  }

  static getTotalVictories(id: number, team: 'homeTeamId' | 'awayTeamId', matches:Matches[]) {
    if (team === 'homeTeamId') {
      const totalVictories = matches.map((match) =>
        match.homeTeamGoals > match.awayTeamGoals && id === match.homeTeamId)
        .reduce((count, m) => Number(count) + Number(m), 0);
      return totalVictories;
    }
    if (team === 'awayTeamId') {
      const totalVictories = matches.map((match) =>
        match.awayTeamGoals > match.homeTeamGoals && id === match.awayTeamId)
        .reduce((count, m) => Number(count) + Number(m), 0);
      return totalVictories;
    }
  }

  static getTotalDraws(id: number, team: 'homeTeamId' | 'awayTeamId', matches: Matches[]) {
    if (team === 'homeTeamId') {
      const totalDraws = matches.map((match) =>
        match.homeTeamGoals === match.awayTeamGoals && id === match.homeTeamId)
        .reduce((draw, count) => Number(draw) + Number(count), 0);
      return totalDraws;
    }
    if (team === 'awayTeamId') {
      const totalDraws = matches.map((match) =>
        match.awayTeamGoals === match.homeTeamGoals && id === match.awayTeamId)
        .reduce((draw, count) => Number(draw) + Number(count), 0);
      return totalDraws;
    }
  }

  static getTotalLoss(id: number, team: 'homeTeamId' | 'awayTeamId', matches:Matches[]) {
    if (team === 'homeTeamId') {
      const totalLoss = matches.map((match) =>
        match.homeTeamGoals < match.awayTeamGoals && id === match.homeTeamId)
        .reduce((loss, count) => Number(loss) + Number(count), 0);
      return totalLoss;
    }
    if (team === 'awayTeamId') {
      const totalLoss = matches.map((match) =>
        match.awayTeamGoals < match.homeTeamGoals && id === match.awayTeamId)
        .reduce((loss, count) => Number(loss) + Number(count), 0);
      return totalLoss;
    }
  }

  static getGoalsFavor(id: number, team: 'homeTeamId' | 'awayTeamId', matches:Matches[]) {
    if (team === 'homeTeamId') {
      const totalGoalsFavor = matches
        .map((match) => id === match.homeTeamId && match.homeTeamGoals)
        .reduce((favor, count) => Number(favor) + Number(count), 0);
      return totalGoalsFavor;
    }
    if (team === 'awayTeamId') {
      const totalGoalsFavor = matches
        .map((match) => id === match.awayTeamId && match.awayTeamGoals)
        .reduce((favor, count) => Number(favor) + Number(count), 0);
      return totalGoalsFavor;
    }
  }

  static getGoalsOwn(id: number, team: 'homeTeamId' | 'awayTeamId', matches: Matches[]) {
    if (team === 'homeTeamId') {
      const totalGoalsOwn = matches
        .map((match) => id === match.homeTeamId && match.awayTeamGoals)
        .reduce((favor, count) => Number(favor) + Number(count), 0);
      return totalGoalsOwn;
    }
    if (team === 'awayTeamId') {
      const totalGoalsOwn = matches
        .map((match) => id === match.awayTeamId && match.homeTeamGoals)
        .reduce((favor, count) => Number(favor) + Number(count), 0);
      return totalGoalsOwn;
    }
  }

  static getTotalPoints(id: number, team: 'homeTeamId' | 'awayTeamId', matches: Matches[]) {
    const partidas = this.getTotalGames(id, team, matches) as number;
    const vitorias = this.getTotalVictories(id, team, matches) as number;
    const derrotas = this.getTotalLoss(id, team, matches) as number;
    const empates = this.getTotalDraws(id, team, matches) as number;
    const totalPoints = ((partidas - empates - derrotas) * 3) + (partidas - vitorias - derrotas);
    return totalPoints;
  }

  static getAproveitamentoTime(id: number, team: 'homeTeamId' | 'awayTeamId', matches: Matches[]) {
    const totalPoints = this.getTotalPoints(id, team, matches);
    const totalGames = this.getTotalGames(id, team, matches) as number;
    const aproveitamento = ((totalPoints / (totalGames * 3)) * 100);
    return aproveitamento;
  }

  static getSaldodeGols(id: number, team: 'homeTeamId' | 'awayTeamId', matches: Matches[]) {
    const golMarcado = this.getGoalsFavor(id, team, matches);
    const golSofrido = this.getGoalsOwn(id, team, matches);
    const saldoDeGols = Number(golMarcado) - Number(golSofrido);
    return saldoDeGols;
  }

  static compareTimes(TeamsSorted: ILeaderboard[]) {
    return TeamsSorted.sort((teamA: ILeaderboard, teamB: ILeaderboard) => {
      if (teamA.totalPoints !== teamB.totalPoints) {
        return teamB.totalPoints - teamA.totalPoints;
      } if (teamA.totalVictories !== teamB.totalVictories) {
        return teamB.totalVictories - teamA.totalVictories;
      } if (teamA.goalsBalance !== teamB.goalsBalance) {
        return teamB.goalsBalance - teamA.goalsBalance;
      }
      return teamB.goalsFavor - teamA.goalsFavor;
    });
  }

  async getInfo(team: 'homeTeamId' | 'awayTeamId'): Promise<ILeaderboard[]> {
    const teams = await this.getTeam();
    const match = await this.getMatches();
    const board = teams.map((t) => ({
      name: t.teamName,
      totalPoints: LeaderboardService.getTotalPoints(t.id, team, match) as number,
      totalGames: LeaderboardService.getTotalGames(t.id, team, match) as number,
      totalVictories: LeaderboardService.getTotalVictories(t.id, team, match) as number,
      totalDraws: LeaderboardService.getTotalDraws(t.id, team, match) as number,
      totalLosses: LeaderboardService.getTotalLoss(t.id, team, match) as number,
      goalsFavor: LeaderboardService.getGoalsFavor(t.id, team, match) as number,
      goalsOwn: LeaderboardService.getGoalsOwn(t.id, team, match) as number,
      goalsBalance: LeaderboardService.getSaldodeGols(t.id, team, match) as number,
      efficiency: LeaderboardService
        .getAproveitamentoTime(t.id, team, match).toFixed(2) as unknown as number,
    }));
    const result = LeaderboardService.compareTimes(board);
    return result;
  }

  async generateAllInfo({ home, away }: IObj): Promise<ILeaderboard[]> {
    this.generateAllInfo = this.generateAllInfo.bind(this);
    return home.map((mh): ILeaderboard => {
      const awayTeamInfo = away.find((ma) => mh.name === ma.name) as unknown as ILeaderboard;
      const totalPoints = (mh.totalPoints + awayTeamInfo.totalPoints);
      const totalGames = mh.totalGames + awayTeamInfo.totalGames;
      const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
      return { name: mh.name,
        totalPoints,
        totalGames,
        totalVictories: mh.totalVictories + awayTeamInfo.totalVictories,
        totalDraws: mh.totalDraws + awayTeamInfo.totalDraws,
        totalLosses: mh.totalLosses + awayTeamInfo.totalLosses,
        goalsFavor: mh.goalsFavor + awayTeamInfo.goalsFavor,
        goalsOwn: mh.goalsOwn + awayTeamInfo.goalsOwn,
        goalsBalance: mh.goalsBalance + awayTeamInfo.goalsBalance,
        efficiency,
      };
    });
  }

  async getInfoGeneral() {
    const home = await this.getInfo('homeTeamId');
    const away = await this.getInfo('awayTeamId');
    const geral = await this.generateAllInfo({ home, away });
    const result = LeaderboardService.compareTimes(geral);
    return result;
  }
}
