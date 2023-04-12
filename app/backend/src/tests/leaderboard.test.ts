import * as sinon from 'sinon';
import { Model } from "sequelize";
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /leaderboard', () => {
  let Response : Response;
  afterEach(sinon.restore);

  describe('GET leaderboard', () => {
    it('testa a rota Leaderboard home', async () => {
      
      Response = await chai.request(app).get('/leaderboard/home');

      expect(Response.status).to.be.equal(200);
    });

    it('testa a rota Leaderboard away', async () => {

      Response = await chai.request(app).get('/leaderboard/away');

      expect(Response.status).to.be.equal(200);
    });

  });
})