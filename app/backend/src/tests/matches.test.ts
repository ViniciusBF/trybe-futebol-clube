import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Match from '../database/models/Match';
import { mockMatches } from './mocks/match.mock';
import { IMatch } from '../interfaces/IMatches';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando a rota matches', () => {
  let chaiHttpResponse: Response;
  
  it('Se é possivel retornar todos as partidas', async () => {
    sinon.stub(Match, "findAll").resolves(mockMatches as IMatch[]);
    
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(mockMatches);

    (Match.findAll as sinon.SinonStub).restore();
  });
});
