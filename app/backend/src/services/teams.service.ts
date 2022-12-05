import TeamsModel from '../database/models/Team';
import { ITeam } from '../interfaces/ITeam';
import HttpException from '../utils/http';

export default class TeamsService {
  private _model = TeamsModel;

  getAll = async (): Promise<ITeam[]> => {
    const teams = await this._model.findAll();

    return teams;
  };

  getOne = async (id: number): Promise<ITeam> => {
    const teams = await this._model.findByPk(id);

    if (!teams) {
      throw new HttpException(404, 'Team not found');
    }

    return teams;
  };
}
