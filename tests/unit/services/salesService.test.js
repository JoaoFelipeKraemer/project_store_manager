const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel, productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { everySaleMock,
  salebyidMock,
  quantityZero,
  quantityEmpty,
  invalidProductId,
  correctMock,
  response} = require('./mocks/salesService.mock');

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
  it('é possível deletar algo do banco de dados', async function () {
    sinon.stub(salesModel, 'salesById').resolves(everySaleMock[0]);
    sinon.stub(salesModel, 'deleteById').resolves(undefined)

    const result = await salesService.deleteById(1);
   
    expect(result).to.deep.equal({ type: null, message: '' });
  });
  it('n é possível deletar algo que não existe', async function () {
      sinon.stub(salesModel, 'salesById').resolves([]);

    const result = await salesService.deleteById(111);
   
    expect(result).to.be.deep.equal({ type: 404, message: 'Sale not found' });
  });
    it('Se cadastra uma nova venda com sucesso', async function () {
       sinon.stub(connection, "execute").resolves([[everySaleMock[0]]]);
      
       const result = await salesService.insertSale([
      {
        productId: 1,
        quantity: 20,
      },
    ]);
      expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal({
      id: undefined,
      itemsSold: [
        {
          productId: 1,
          quantity: 20,
        },
      ],
    })
    });

    it('quantity igual a 0', async function () {
    const responde = await salesService.insertSale(quantityZero) 
      expect(responde.type).to.equal(422);
      expect(responde.message).to.equal(
           '"quantity" must be greater than or equal to 1'
         );
    });
    it('quantity igual a null', async function () {
    const responde = await salesService.insertSale(quantityEmpty) 
      expect(responde.type).to.equal(400);
      expect(responde.message).to.equal(
           '"quantity" must be a number'
         );
    });
    
    it('invalidProductId', async function () {
    const responde = await salesService.insertSale(invalidProductId) 
      expect(responde.type).to.equal(404);
      expect(responde.message).to.equal(
           'Product not found'
         );
  });
  
   afterEach(function () {
     sinon.restore();
   });
    });  
 });