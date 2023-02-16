const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { products, nameV, nameI, productByID } = require('./mocks/productService.mock');

describe('Teste camada service de products', function () {
  describe('listagem de products', function () {
    it('retorna a lista completa de produtos', async function () {
      // arrange
      sinon.stub(productModel, 'findAll').resolves(products);
      
      // act
      const  result  = await productService.findAll();

      // assert
      expect(result.type).to.be.equal(result.null);
      expect(result.message).to.deep.equal([result.message][0]);
    });
    it('retorna a lista de produtos por id', async function () {
    sinon.stub(productModel, 'findById').resolves([products[1]]);

    const result = await productService.findById(2);

    expect(result.type).to.be.equal(result.null);
    
    expect(result.message).to.deep.equal(result.message);
  });
  });
  describe('Teste, inserção de produtos', function () {
   it('retorna um erro caso campo name seja invalido', async function () {
    sinon.stub(productModel, 'insertProduct').resolves(2)
     
    const result = await productService.insertProduct(nameV);
  
    expect(result.type).to.be.equal(result.null);
    expect(result.message).to.deep.equal(result.productByID);
    
   });
    it('retorna a lista de produtos por id', async function () {

    });
    
    it('retorna a lista de produtos por id', async function () {
   
  });
  })
  
   afterEach(function () {
     sinon.restore();
   });
 });