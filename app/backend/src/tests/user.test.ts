import * as sinon from 'sinon';
import { Model } from "sequelize";
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Users from '../database/models/UsersModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login', () => {
  afterEach(sinon.restore);

describe('Testes de campo de login', () => {
  
  it('deve retornar status 400 caso o email não seja informado', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        username: 'any_username'
      })
    expect(httpResponse.status).to.equal(400)
    expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
  })

  it('deve retornar status 400 caso o password não seja informado', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        username: 'any_username',
        email: 'admin@admin.com'
      })
    expect(httpResponse.status).to.equal(400)
    expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
  })

  it('deve retornar status 401 caso o email for inválido', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        username: 'any_username',
        email: 'email_inválido',
        password: 'any_password'
      })
    expect(httpResponse.status).to.equal(401)
    expect(httpResponse.body).to.deep.equal({ message: 'Invalid email or password' })
  })

  it('deve retornar status 401 caso o password for menor que 6 caracteres', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        username: 'any_username',
        email: 'admin@admin.com',
        password: '12345'
      })
    expect(httpResponse.status).to.equal(401)
    expect(httpResponse.body).to.deep.equal({ message: 'Invalid email or password' })
  })
})
  
  it('deve retornar um status 200 se a requisição foi feita com sucesso', async () => {
    // const user = {
    //   email: 'admin@admin.com',
    //   id: 1,
    //   password: 'secret_admin',
    //   role: 'admin',
    //   username: 'Admin'
    // }
    // sinon.stub(Users, 'findByPk').resolves(null)
    // sinon.stub(Model, 'create').resolves(user as Users)

    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
})
    expect(response).to.not.be.null;
    const httpResponse = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', response.body.token)
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.deep.equal({
      role: 'admin' 
    });
  });
});
