const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { products } = require('./mocks/product.model.mock');

describe('Testes da camada model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    // Arrange
  sinon.stub(connection, 'execute').resolves([products]);
  // Act
  const result = await productModel.findAll();
  // Assert
  expect(result).to.be.deep.equal(products);
  });

  it('Recuperando um produto a partir do id id', async function () { // Implementando um CRUD do zero - Parte 1 - Camada Model
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    const product = await productModel.findById(1);

    expect(product).to.be.deep.equal(products[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});