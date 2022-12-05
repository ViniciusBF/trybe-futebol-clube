import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/User';
import { mockUser, mockLoginBody } from './mocks/login.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando a rota login', () => {
  let chaiHttpResponse: Response;

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
        .send({ password: mockLoginBody.password });
  
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.haveOwnProperty('message');
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });

    it('Se o login falha se faltar a senha', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: mockLoginBody.email });
  
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.haveOwnProperty('message');
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');

      (User.findOne as sinon.SinonStub).restore();
    });

    it('Se o login falha quando não encontar um email correspondente', async () => {
      sinon.stub(User, "findOne").resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(mockLoginBody);
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.haveOwnProperty('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');

      (User.findOne as sinon.SinonStub).restore();
      (bcrypt.compare as sinon.SinonStub).restore();
    });

    it('Se o login falha quando a senha não corresponder', async () => {
      sinon.stub(User, "findOne").resolves({ ...mockUser } as User);
      sinon.stub(bcrypt, "compare").resolves(false);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(mockLoginBody);
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.haveOwnProperty('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');

      (User.findOne as sinon.SinonStub).restore();
      (bcrypt.compare as sinon.SinonStub).restore();
    });
  })
});
