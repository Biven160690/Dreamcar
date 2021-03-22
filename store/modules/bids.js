//������ store ��� parts

export default {
  state: {
    bids: [
      {
        "id": 1,
        "lot_id": 1,
        "user_id": 1,
        "bid_price": 3000,
        "isWinner": false,
        "date": "22.02.2021",
        "user_company": "OOO “DileveryClub”"
      },
      {
        "id": 2,
        "lot_id": 1,
        "user_id": 2,
        "bid_price": 2999,
        "isWinner": false,
        "date": "22.02.2021",
        "user_company": "IBA"
      },
      {
        "id": 3,
        "lot_id": 1,
        "user_id": 3,
        "bid_price": 2700,
        "isWinner": false,
        "date": "22.02.2021",
        "user_company": "EPAM Systems"
      },
      {
        "id": 4,
        "lot_id": 1,
        "user_id": 4,
        "bid_price": 2700,
        "isWinner": false,
        "date": "22.02.2021",
        "user_company": "Dominos Pizza"
      },
      {
        "id": 4,
        "lot_id": 1,
        "user_id": 5,
        "bid_price": 2500,
        "isWinner": false,
        "date": "22.02.2021",
        "user_company": "INTEL CORE I20"
      },

    ]
  },

  mutations: {
    addBid(state, newBid) {
      state.parts.push(newPart)
    }
  },

  getters: {
    getAllBids(state) {
      return state.bids
    },
  }

}