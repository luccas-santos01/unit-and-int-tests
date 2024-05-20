import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import jwt from 'jsonwebtoken';
import TransactionModel from '../../../src/database/models/transaction.model';
import UserModel from '../../../src/database/models/user.model';
import loginMock from '../../../tests/mocks/login.mock';
import { Transaction } from 'src/types/Transaction';

chai.use(chaiHttp);

const completeTransaction: Transaction = {
    id: 1,
    name: 'Valid Transaction',
    price: 1,
    type: 'Depósito',
    userId: 1
  };

  const incompleteTransaction: Transaction = {
    id: 1,
    name: '',
    price: 1,
    type: 'Depósito',
    userId: 1
  };

describe('POST /transactions', function () {
  beforeEach(function () { sinon.restore(); });

  describe('quando a requisição é feita com dados válidos', function () {
    it('deve retornar um status 201 com uma transação criada', async function () {
      sinon.stub(jwt, 'verify').resolves({ email: loginMock.existingUser.email });
      const mockFindOneReturn = UserModel.build(loginMock.existingUser);
      sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);
      const mockCreateReturn = TransactionModel.build(completeTransaction);
      sinon.stub(TransactionModel, 'create').resolves(mockCreateReturn);

      const httpResponse = await chai
        .request(app)
        .post('/transactions')
        .send(completeTransaction)
        .set('Authorization', 'genericToken');

      expect(httpResponse.status).to.equal(201);
      expect(httpResponse.body).to.be.deep.equal(completeTransaction);
    });
  });

  describe('quando a requisição é feita com dados inválidos', function () {
    it('ao enviar um nome vazio deve retornar um status 400 com uma mensagem de erro', async function () {
      sinon.stub(jwt, 'verify').resolves({ email: loginMock.existingUser.email });
      const mockFindOneReturn = UserModel.build(loginMock.existingUser);
      sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

      const httpResponse = await chai
        .request(app)
        .post('/transactions')
        .send(incompleteTransaction)
        .set('Authorization', 'genericToken');

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.be.deep.equal({ message: 'Name is required'});
    });
  });
});
