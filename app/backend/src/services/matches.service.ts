import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Team';
import TeamsService from './teams.service';
import { validateInsert } from './validations/validations';
import { IMatchBody, IMatch } from '../interfaces/IMatch';

const includes = [
  { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
  { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
];

export default class MatchesService {
  private _model = MatchModel;
  private _service = new TeamsService();

  getAll = async (): Promise<MatchModel[]> => {
    const jogos = await this._model.findAll({
      include: includes,
    });

    return jogos;
  };

  getByProgress = async (whe: boolean): Promise<MatchModel[]> => {
    const jogos = await this._model.findAll({
      where: { inProgress: whe },
      include: includes,
    });

    return jogos;
  };

  insert = async (body: IMatchBody): Promise<MatchModel> => {
    validateInsert(body);

    await this._service.getOne(body.awayTeam);
    await this._service.getOne(body.homeTeam);

    const partida = await this._model.create({ ...body, inProgress: true });

    return partida.dataValues;
  };

  update = async (id: number): Promise<void> => {
    await this._model.update({ inProgress: false }, {
      where: { id },
    });
  };

  updateGoals = async (id: number, { homeTeamGoals, awayTeamGoals }: IMatch): Promise<void> => {
    await this._model.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id },
    });
  };
}
