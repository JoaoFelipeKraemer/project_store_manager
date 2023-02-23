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

const productOneMock = [
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

const returnMock = {
  "id": 5,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
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

 const response = {
  "id": undefined,
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

const validateCorrect = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]
module.exports = {
  everySaleMock,
  productOneMock,
  returnMock,
  correctMock,
  invalidProductId,
  response,
  validateCorrect,
};