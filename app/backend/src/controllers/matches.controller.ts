import { Request, Response } from 'express';
import { MatchesService } from '../services';

export default class MatchesController {
  private _service = new MatchesService();

  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    const partidas = inProgress
      ? await this._service.getByProgress(inProgress === 'true')
      : await this._service.getAll();

    res.status(200).json(partidas);
  };

  insert = async (req: Request, res: Response) => {
    const partida = await this._service.insert(req.body);

    res.status(201).json(partida);
  };

  updateProgress = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this._service.update(Number(id));

    res.status(200).json({ message: 'Finished' });
  };

  updateGoals = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this._service.updateGoals(Number(id), req.body);

    res.status(200).json(req.body);
  };
}
