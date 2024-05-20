import sinon from 'sinon';
import { expect } from 'chai';
import TransactionService from '../../../src/services/transactions.service';
import TransactionModel from '../../../src/database/models/transaction.model';
import { Transaction } from '../../../src/types/Transaction';
import { ServiceResponseError } from 'src/types/ServiceResponse';

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

describe('TransactionService', function () {
  beforeEach(function () { sinon.restore(); });
  describe('#create', function () {
  it('deve ser possível criar uma transação com sucesso', async function () {
  const mockCreateReturn = TransactionModel.build(completeTransaction);
  sinon.stub(TransactionModel, 'create').resolves(mockCreateReturn);

  const createdTransaction = await TransactionService.create(completeTransaction);

  expect(createdTransaction.status).to.equal('SUCCESSFUL');
  expect(createdTransaction.data).to.deep.equal(completeTransaction);
  });

  it('deve retornar um erro quando um nome não é enviado', async function () {
    const response = await TransactionService.create(emptyNameTransaction);
    expect(response.status).to.equal('INVALID_DATA');
    expect((response as ServiceResponseError).data.message).to.equal('Name is required');
    });
  });
});
