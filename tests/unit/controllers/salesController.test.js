const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect, use } = chai;
chai.use(sinonChai);
const { salesService } = require('../../../src/services');
const { salesControler } = require('../../../src/controllers');

const { everySaleMock, productOneMock } = require('./mocks/sales.controller.mock');

describe('Teste de unidade do salesControler', function () {
  describe('Listando as sales', function() {
    it('Deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'allSales')
        .resolves({ everySaleMock });

      // act
      await salesControler.allSales(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([everySaleMock][1]);
    });
  });
it('Retorno de id invalido', async function () {
    const res = {};
    const req = {
      params: { id: 10 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'salesById').resolves({  type: 'INVALID_VALUE', message: 'Product not found' });

    await salesControler.salesById(req, res);

    expect(res.status).to.have.been.calledWith(404);
     expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
  
  it('Retorno de id valido', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'salesById').resolves( productOneMock );

   const result = await salesControler.salesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(result);
  });

  afterEach(function () {
    sinon.restore();
  });
});