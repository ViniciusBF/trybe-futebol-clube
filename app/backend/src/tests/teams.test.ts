import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Team from '../database/models/Team';
import { mockTeam } from './mocks/team.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando a rota teams', () => {
  let chaiHttpResponse: Response;
  
  it('Se o possivel retornar todos os times', async () => {
    sinon.stub(Team, "findAll").resolves(mockTeam as Team[]);
    
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(mockTeam);

    (Team.findAll as sinon.SinonStub).restore();
  });

  it('Se o possivel retornar um time', async () => {
    sinon.stub(Team, "findByPk").resolves(mockTeam[1] as Team);
    
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(mockTeam[1]);

    (Team.findByPk as sinon.SinonStub).restore();
  });
});
