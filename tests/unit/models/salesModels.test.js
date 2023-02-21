const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { everySaleMock, salebyidMock } = require('./mocks/sales.model.mock');

describe('Testes da camada model de sales', function () {
  it(' listar todas as vendas', async function () {
    // Arrange
  sinon.stub(connection, 'execute').resolves([everySaleMock]);
  // Act
  const result = await salesModel.allSales();
  // Assert
  expect(result).to.be.deep.equal(everySaleMock);
  });

  it('Recuperando um produto a partir do id id', async function () { // Implementando um CRUD do zero - Parte 1 - Camada Model
    sinon.stub(connection, 'execute').resolves([salebyidMock]);
    // console.log([[everySaleMock]])
    const product = await salesModel.salesById(1);

    expect(product).to.be.deep.equal(salebyidMock);
    
  });
   it('Se deleta do banco de dados', async function () { // Implementando um CRUD do zero - Parte 1 - Camada Model
    sinon.stub(connection, 'execute').resolves(undefined);
    // console.log([[everySaleMock]])
    const product = await salesModel.deleteById(1);

    expect(product).to.be.deep.equal(undefined);
    
  });

  afterEach(function () {
    sinon.restore();
  });
});