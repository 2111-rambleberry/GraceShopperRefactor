import axios from "axios";

const TOKEN = "token";

//ACTIONS
const LOAD_CART = "LOAD_CART";
const UPDATE_CART = "UPDATE_CART";
const REMOVE_ITEM = "REMOVE_ITEM";
// EMPTY CART each time user checks out
const EMPTY_CART = "EMPTY_CART";


//ACTION CREATORS
const gotCart = (cart) => ({ type: LOAD_CART, cart });
const updateCart = (cart) =>({ type: UPDATE_CART, cart})
const removeItem = (book)=> ({ type: REMOVE_ITEM, book});
const emptyCart = () => ({ type: EMPTY_CART });

//Thunks
export const loadCart = () => {
  return async (dispatch) => {
    try { const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.get("/api/cart", {
          headers: {
            authorization: token,
          },
        });
        dispatch(gotCart(data));
      }
    } catch (err) {
      console.log(">>>>>>thunk not working");
    }
  };
};

// funk for adding book to cart
export const addItemThunk = (item) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN)
      if (token) {
    const { data: cart } = await axios.post("/api/cart", item, {
      headers: {
        authorization: token
      }
    });

      dispatch(updateCart(cart));
      }
  } catch (error) {
    console.log(error);
  }
};

// funk for deleting book from cart
export const removeItemThunk = (bookId) => async(dispatch) => {
  try{
      await axios.delete(`/api/cart/${bookId}`)
      dispatch(removeItem(bookId))
  } catch(err){
    console.log('error removing book')
  }
}

//Initial state:
const initialState = {} 

//RReducer
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      return action.cart;
      case UPDATE_CART:{
        return action.cart
      } 
      case REMOVE_ITEM:{
        const newState = state.filter(
          cartBook => cartBook.bookId !== action.bookId
        )
        return newState
      }
      case EMPTY_CART:
        return initialState;
      default:
        return state;
    }
  }