import axios from "axios";

const TOKEN = "token";

//ACTIONS
const LOAD_CART = "LOAD_CART";
const UPDATE_CART = "UPDATE_CART";
const REMOVE_ITEM = "REMOVE_ITEM";
// EMPTY CART each time user checks out
const EMPTY_CART = "EMPTY_CART";


//ACTION CREATORS
const getCart = (cart) => ({ type: LOAD_CART, cart });
const updateCart = (book) =>({ type: UPDATE_CART, book})
const removeItem = (book)=> ({ type: REMOVE_ITEM, book});
const emptyCart = () => ({ type: EMPTY_CART });

//Thunks
export const loadCart = () => {
  return async (dispatch) => {
    try { const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: cart } = await axios.get("/api/cart", {
          headers: {
            authorization: token,
          },
        });
        dispatch(getCart(cart));
      }
    } catch (err) {
      console.log(">>>>>>thunk not working");
    }
  };
};

// funk for adding book to cart
export const addItemThunk = (book) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN)
        if (token) {
      const { data: added } = await axios.post("/api/cart", book, {
        headers: {
          authorization: token
        }
      });
      dispatch(updateCart(added));
      }
    } catch (error) {
      console.log("Thunk not working!!!")
      console.log(error);
    }
  }
};

// thunk for deleting book from cart
export const removeItemThunk = (bookId) => {
  return async (dispatch) => {
    try{
      const token = window.localStorage.getItem(TOKEN)
      if(token){
        const { data: removed } = await axios.put(`/api/cart/${bookId}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(removeItem(removed))
      }
    } catch(err){
      console.log('error removing book')
    }
  }
}

//Initial state:
const initialState = [] 

//RReducer
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      return action.cart;
    case UPDATE_CART:
      return [...state, action.book]
    case REMOVE_ITEM:
      console.log(state)
      return state.filter((book) => book.id !== action.book.id);
    case EMPTY_CART:
      return initialState;
    default:
      return state;
    }
  }