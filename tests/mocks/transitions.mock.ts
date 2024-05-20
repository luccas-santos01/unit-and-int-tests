export interface TransactionInput {
  name: string;
  price: number;
  type: string;
  userId: number;
}

export const validTransactionData = { name: 'Test', price: 100, type: 'Depósito', userId: 1 };

export const invalidTransactionData = { name: '', price: 100, type: 'Depósito', userId: 1 };
