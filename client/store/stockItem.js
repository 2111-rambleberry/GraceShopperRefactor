import axios from "axios";

const TOKEN = "token";

//ACTIONS
const GET_STOCK_ITEM = "GET_STOCK_ITEM";

//ACTION CREATORS
export const getStockItem = (stockItem) => ({
  type: GET_STOCK_ITEM,
  stockItem,
});

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

//REDUCER
const initialState = {};

export default function stockItemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STOCK_ITEM:
      return action.stockItem;
    default:
      return state;
  }
}
