const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { everySaleMock, salebyidMock } = require('./mocks/salesService.mock');

describe('Teste camada service de sales', function () {
  describe('listagem de sales', function () {
    it('retorna a lista completa de sales', async function () {
      // arrange
      sinon.stub(salesModel, 'allSales').resolves(everySaleMock);
      
      // act
      const  result  = await salesService.allSales();

      // assert
      expect(result.type).to.be.equal(result.null);
      expect(result.message).to.deep.equal([result.message][0]);
    });
    it('retorna a lista de sales por id', async function () {
      sinon.stub(salesModel, 'salesById').resolves([salebyidMock]);

    const result = await salesService.salesById(1);

    expect(result.type).to.be.equal(null);
    
    expect(result.message).to.deep.equal(result.message);
  });
  });  
   afterEach(function () {
     sinon.restore();
   });
 });