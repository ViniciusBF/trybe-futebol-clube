import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

export default class LeaderboardController {
  private _service = new LeaderboardService();

  getAll = async (_req: Request, res: Response) => {
    const leaderboard = await this._service.getAll('all');

    res.status(200).json(leaderboard);
  };

  getAllAway = async (_req: Request, res: Response) => {
    const leaderboard = await this._service.getAll('away');

    res.status(200).json(leaderboard);
  };

  getAllHome = async (_req: Request, res: Response) => {
    const leaderboard = await this._service.getAll('home');

    res.status(200).json(leaderboard);
  };
}
