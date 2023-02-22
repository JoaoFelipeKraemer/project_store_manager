const everySaleMock = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
]

const salebyidMock = [
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
]

 const response = {
  "id": 22,
  "itemsSold": [
    {
      "productId": 2,
      "quantity": 3
    },
    {
      "productId": 3,
      "quantity": 7
    }
  ]
}


const correctMock =[
  {
    "productId": 2,
    "quantity": 3
  },
  {
    "productId": 3,
    "quantity": 7
  }
]

const invalidProductId =[
  {
    "productId": 999,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const quantityZero =[
  {
    "productId": 1,
    "quantity": 0
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const quantityEmpty =[
  {
    "productId": 1,
    "quantity": ''
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

module.exports = {
  everySaleMock,
  salebyidMock,
  correctMock,
  quantityEmpty,
  quantityZero,
  invalidProductId,
  response,

};