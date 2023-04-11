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

  })
  
});