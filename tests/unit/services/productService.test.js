const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { products } = require('./mocks/productService.mock');

describe('Teste camada service de products', function () {
  describe('listagem de products', function () {
    it('retorna a lista completa de pessoas passageiras', async function () {
      // arrange
      sinon.stub(productModel, 'findAll').resolves(products);
      
      // act
      const  result  = await productService.findAll();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(products);
    });
    it('retorna a lista de produtos por id', async function () {
    sinon.stub(productModel, 'findById').resolves([products[1]]);

    const result = await productService.findById(2);

    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal([products[1]]);
  });
  });
  
   afterEach(function () {
     sinon.restore();
   });
 });