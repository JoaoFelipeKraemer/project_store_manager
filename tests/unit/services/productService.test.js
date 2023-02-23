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
    it('Retorna erro caso o ID do produto não exista', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);

      const result = await productService.findById(999);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('Product not found');
      });

      it('É possível deletar um produto que esteja cadastrado no banco de dados', async function () {
      sinon.stub(productModel, 'findById').resolves([products[0]]);
      sinon.stub(productModel, 'deleteById').resolves(undefined);

      const result = await productService.deleteById(1);

      expect(result).to.deep.equal({ type: null, message: '' });
      });

    it('Retorna mensagem de erro ao tentar deletar uma venda inexistente no banco de dados', async function () {

      const result = await productService.deleteById(999);

      expect(result).to.be.deep.equal({ type: 404, message: 'Product not found' });
    });
  })
  
   afterEach(function () {
     sinon.restore();
   });
 });