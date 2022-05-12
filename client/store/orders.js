import axios from "axios";

const TOKEN = "token";

//Initial state:
const initialState = [] 

//ACTIONS
const LOAD_ORDERS = "LOAD_ORDERS";


//ACTION CREATORS
const getOrders = (orders) => ({ type: LOAD_ORDERS, orders})

//Thunks
export const loadOrders = () => {
  return async (dispatch) => {
    try { const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: orders } = await axios.get("/api/cart/my-orders", {
          headers: {
            authorization: token,
          },
        });
        console.log("thunk", orders)
        dispatch(getOrders(orders));
      } 
    } catch (err) {
      console.log(">>>>>>getOrdersThunk not working");
    }
  };
};

//Reducer
export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ORDERS:
      return action.orders
    default:
      return state;
    }
  }