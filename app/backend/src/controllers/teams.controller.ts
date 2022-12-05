import { Request, Response } from 'express';
import { TeamsService } from '../services';

export default class teamsController {
  private _service = new TeamsService();

  getAll = async (_req: Request, res: Response) => {
    const teams = await this._service.getAll();

    res.status(200).json(teams);
  };

  getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this._service.getOne(Number(id));

    res.status(200).json(team);
  };
}
