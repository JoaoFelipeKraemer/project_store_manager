const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const { productService } = require('../../../src/services');
const { productControler } = require('../../../src/controllers');

const { products } = require('./mocks/product.controller.mock');

describe('Teste de unidade do productControler', function () {
  describe('Listando os produtos', function() {
    it('Deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findAll')
        .resolves({ type: null, message: products });

      // act
      await productControler.findAll(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});