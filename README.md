# API Financial Transactions - Testes Unitários e de Integração

Repositório de testes para uma API de gerenciamento de transações financeiras. Este repositório contém testes unitários e de integração utilizando Mocha, Chai e Sinon.

## Ferramentas Utilizadas

- Mocha: Framework de testes JavaScript.
- Chai: Biblioteca de asserções BDD/TDD.
- Sinon: Biblioteca para spies, mocks e stubs.

## Estrutura de Testes

### Testes de Integração

Os testes de integração verificam o funcionamento das rotas da API. Focamos na rota /transactions (POST), testando:

- Dados Válidos: Deve retornar status HTTP 201 com uma transação criada.
- Dados Inválidos: Nome vazio deve retornar status HTTP 400 com a mensagem "Name is required".
- Os testes estão no arquivo create.test.ts em tests/integration/transactions/.

### Testes Unitários

#### Camada de Serviço

##### Testes para a função create na camada de serviço:

- Criação Bem-Sucedida: Deve ser possível criar uma transação com sucesso.
- Erro ao Não Enviar Nome: Deve retornar um erro se um nome não for enviado ("Name is required").
- Os testes estão no arquivo transactions.service.test.ts em tests/unit/services/.

#### Camada de Controladora

##### Testes para a função create na camada de controladora:

- Criação Bem-Sucedida: Deve salvar ao enviar dados válidos.
- Erro ao Não Enviar Nome: Deve retornar um erro se um nome não for enviado ("Name is required").
- Os testes estão no arquivo transactions.controller.test.ts em tests/unit/controllers/.
