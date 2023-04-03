import * as sinon from 'sinon';
import {Model} from "sequelize";
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import  Teams  from './mocks/teamsMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /teams', () => {
  afterEach(sinon.restore);
 
  describe('GET teams', () => {
    it('Deve retornar a lista de times', async () => {
      sinon.stub(TeamsModel, 'findAll').resolves(Teams as unknown as TeamsModel[]);

      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(Teams);
    });

    it('Deve retornar um time pelo seu ID', async () => {
      // const team = { id: 1, team_name: 'Avaí/Kindermann' };
      sinon.stub(TeamsModel, 'findByPk').resolves({ id: 1, team_name: 'Avaí/Kindermann' } as unknown as TeamsModel);
     
      const response = await chai.request(app).get('/teams/1');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal({ id: 1, team_name: 'Avaí/Kindermann' });
    });
  })
  
});
