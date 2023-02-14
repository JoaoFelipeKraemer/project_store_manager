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

  afterEach(function () {
    sinon.restore();
  });
});