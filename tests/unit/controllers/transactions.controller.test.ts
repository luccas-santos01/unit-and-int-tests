import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import transactionService from '../../../src/services/transactions.service';
import transactionController from '../../../src/controllers/transactions.controller';
import { Transaction } from '../../../src/types/Transaction';

chai.use(sinonChai);

const completeTransaction: Transaction = {
    id: 1,
    name: 'Complete Transaction',
    price: 1,
    type: 'Depósito',
    userId: 1
};

const emptyNameTransaction: Transaction = {
    id: 1,
    name: '',
    price: 1,
    type: 'Depósito',
    userId: 1
};

describe('TransactionController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('#create', function () {
    it('deve salvar ao enviar dados válidos', async function () {
      req.body = completeTransaction
      sinon.stub(transactionService, 'create').resolves({
        status: 'SUCCESSFUL',
        data: completeTransaction
      });

      await transactionController.create(req, res)

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(completeTransaction);
    });

    it('deve retornar um erro se enviar um nome inválido', async function () {
      req.body = emptyNameTransaction
      sinon.stub(transactionService, 'create').resolves({
        status: 'INVALID_DATA',
        data: { message: 'Name is required' }
      });

      await transactionController.create(req, res)

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: 'Name is required' });
    });
  });
});
