import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/User';
import { mockUser, mockLoginBody, mockLoginPassword } from './mocks/login.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando a rota login', () => {
  let chaiHttpResponse: Response;

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
    (bcrypt.compare as sinon.SinonStub).restore();
  })

  describe('Caso de sucesso', () => {
    it('Se o login é realizado com sucesso', async () => {
      sinon.stub(User, "findOne").resolves({ ...mockUser } as User);
      sinon.stub(bcrypt, "compare").resolves(true);
      
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(mockLoginBody);
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.haveOwnProperty('token');
    });
  })

  describe('Casos de falhas', () => {
    it('Se o login falha se faltar o email', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(mockLoginPassword);
  
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.haveOwnProperty('message');
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });
  })
});
