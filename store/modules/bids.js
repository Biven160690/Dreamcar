
//Модуль ставок


export default {
  state: {
    bids: [],
    selectedLot: [],
    quantityBid: ""
  },

  mutations: {
    addBid(state, newBid) {
      return state.bids.push(newBid);
    },
    searchMinBidAndItsLength(state, lot) {
      var arr = [];
      var bid_on_id = state.bids.filter(id => id.lot_id === lot.id);
      for (var i = 0; i < bid_on_id.length; i++) {
        arr.push(bid_on_id[i].bid_price);
      }
      var min_Bid = Math.min(...arr);
      lot.bid = min_Bid;

      var quant = bid_on_id.length;
      state.quantityBid = quant;
    },
    quantityOldBid(state, lot) {
      var bid_on_id = state.bids.filter(id => id.lot_id === lot.id);
      var quant = bid_on_id.length;
      state.quantityBid = quant;
    }
  },

  getters: {
    getAllBids(state) {
      return state.bids;
    },
    getquantityBid(state) {
      return state.quantityBid;
    }
  }
};
