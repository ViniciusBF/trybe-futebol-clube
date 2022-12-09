import MatchModel from '../database/models/Match';
import MatchesService from './matches.service';
import TeamsService from './teams.service';
import { ITeam } from '../interfaces/ITeam';
import { ILeaderboard } from '../interfaces/ILeaderboard';

const INITIAL_POINTS = { td: 0, tv: 0, tl: 0 };
const INITIAL_GOALS = { gc: 0, gp: 0 };

export default class LeaderboardService {
  private _serviceMatch = new MatchesService();
  private _serviceTeam = new TeamsService();

  sort = (team1: ILeaderboard, team2: ILeaderboard) => {
    let result = team2.totalPoints - team1.totalPoints;
    if (!result) result = team2.totalVictories - team1.totalVictories;
    if (!result) result = team2.goalsBalance - team1.goalsBalance;
    if (!result) result = team2.goalsFavor - team1.goalsFavor;
    if (!result) result = team2.goalsOwn - team1.goalsOwn;
    return result;
  };

  getPoints = (actualTeam: number, otherTeam: number) => {
    if (actualTeam > otherTeam) return 'tv';
    if (actualTeam < otherTeam) return 'tl';
    return 'td';
  };

  getResultsPoints = (id: number, match: MatchModel[]) => {
    const initial = { ...INITIAL_POINTS };
    const { td, tv, tl } = match.reduce((acc, curr) => {
      const point = id === curr.homeTeam
        ? this.getPoints(curr.homeTeamGoals, curr.awayTeamGoals)
        : this.getPoints(curr.awayTeamGoals, curr.homeTeamGoals);
      acc[point] += 1;
      return acc;
    }, initial);
    return { td, tv, tl, tg: tv + td + tl, tp: tv * 3 + td };
  };

  getResultsGoals = (id: number, match: MatchModel[]) => {
    const initial = { ...INITIAL_GOALS };
    return match.reduce((acc, curr) => {
      if (id === curr.homeTeam) {
        acc.gp += curr.homeTeamGoals;
        acc.gc += curr.awayTeamGoals;
      } else {
        acc.gp += curr.awayTeamGoals;
        acc.gc += curr.homeTeamGoals;
      }
      return acc;
    }, initial);
  };

  order = ({ teamName, id }: ITeam, match: MatchModel[]) => {
    const { td, tv, tl, tg, tp } = this.getResultsPoints(id, match);
    const { gp, gc } = this.getResultsGoals(id, match);
    const eff = ((tp / (tg * 3)) * 100).toFixed(2);

    return {
      name: teamName,
      totalPoints: tp,
      totalGames: tg,
      totalVictories: tv,
      totalDraws: td,
      totalLosses: tl,
      goalsFavor: gp,
      goalsOwn: gc,
      goalsBalance: gp - gc,
      efficiency: Number(eff),
    };
  };

  getMatches = (jogos: MatchModel[], type: string, time: ITeam) => {
    switch (type) {
      case 'away':
        return jogos
          .filter(({ awayTeam }) => awayTeam === time.id);
      case 'home':
        return jogos
          .filter(({ homeTeam }) => homeTeam === time.id);
      default:
        return jogos
          .filter(({ awayTeam, homeTeam }) => awayTeam === time.id || homeTeam === time.id);
    }
  };

  getAll = async (type: string): Promise<ILeaderboard[]> => {
    const jogos = await this._serviceMatch.getByProgress(false);
    const times = await this._serviceTeam.getAll();

    const result = times.map((e) => {
      const teamMatch = this.getMatches(jogos, type, e);
      return this.order(e, teamMatch);
    });
    const leaderboard = result.sort(this.sort);

    return leaderboard;
  };
}
