import * as sinon from 'sinon';
import { Model } from "sequelize";
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import Matches from './mocks/matchesMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /matches', () => {

  // let Response: Response;
  afterEach(sinon.restore);

  describe('GET matches', () => {
    it('Deve retornar a lista de partidas', async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(Matches as unknown as MatchesModel[]);

      const response = await chai.request(app).get('/matches');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(Matches);
    });

    it('Deve retornar a lista de partidas in progress', async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(Matches as unknown as MatchesModel[]);

      const response = await chai.request(app).get('/matches').set('inProgress', 'true');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(Matches);
    });

    it('Deve retornar a lista de partidas finalizadas', async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(Matches as unknown as MatchesModel[]);

      const response = await chai.request(app).get('/matches').set('inProgress', 'false');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(Matches);
    });

    // it('Testa se é possível finalizar uma partida no banco de dados', async () => {
    //   sinon.stub(MatchesModel, 'update').resolves();
      
    //   Response = await chai.request(app).patch('/1/finish');
    //   expect(Response.status).to.be.equal(404);
    //   expect(Response.body).to.be.deep.equal({message: 'Finished'});
    // });

  })
  
});