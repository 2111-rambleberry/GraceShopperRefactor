import axios from "axios";

const TOKEN = "token";

//ACTIONS
const GET_STOCK_ITEM = "GET_STOCK_ITEM";
const CHECKOUT_STOCK = "CHECKOUT_STOCK";


//ACTION CREATORS
export const getStockItem = (stockItem) => ({
  type: GET_STOCK_ITEM,
  stockItem,
});

export const checkoutStock = (stockItem) => ({
  type: CHECKOUT_STOCK,
  stockItem
})

//THUNK CREATORS

export const fetchStockItem = (stockId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN)
      if (token) {
        const { data: stockItem } = await axios.get(`/api/stock/${stockId}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(getStockItem(stockItem));
      }
    } catch (err) {
        console.log(err, '>>>>>>>>fetchStockItem Thunk Error!!!');
    }
  };
};

export const reduceStockQty = (stockId, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN)
      if(token){
          const { data: stockItem } = await axios.put(`/api/stock/${stockId}`, {
            headers: {
              authorization: token,
            },
          });
          console.log("redux stuff", data);
          dispatch(checkoutStock(stockItem));
      }    
      // history.push(`/stock/${stockItem.id}`)  
    } catch (err) {
      console.log(err);
    }
  }
};

//REDUCER
const initialState = {};

export default function stockItemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STOCK_ITEM:
      return action.stockItem;
    case CHECKOUT_STOCK:
      console.log(stockItem)
      return action.stockItem.quantity--
    default:
      return state;
  }
}
