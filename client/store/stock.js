import axios from "axios";

const TOKEN = "token";

//ACTIONS
const GET_STOCK = "GET_STOCK";
const DELETE_STOCK = "DELETE_STOCK";
const ADD_STOCK = "ADD_STOCK"
const EDIT_STOCK = "EDIT_STOCK";

//ACTION CREATORS
export const getStock = (stock) => ({
  type: GET_STOCK,
  stock,
});

export const deleteStock = (stockItem) => ({
  type: DELETE_STOCK,
  stockItem,
});


export const setSingleItem = (singleBook) =>({
  type: ADD_STOCK,
  singleBook
})

export const editStock = (stockItem) => ({
  type: EDIT_STOCK,
  stockItem,
});


// export const addStock = stock => ({})

//THUNK CREATORS

export const fetchStock = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
      const { data: stock } = await axios.get("/api/stock", {
        headers: {
          authorization: token,
        },
      });
      dispatch(getStock(stock));
    }
  };
};

export const setStock = (stock, history) => {
  return async (dispatch) => {
    try{
      const token = window.localStorage.getItem(TOKEN)
      if(token){      
        const { data } = await axios.post(`/api/stock`, stock,  {
          headers: {
            authorization: token,
          }})
        dispatch(setSingleItem(data));
        history.push('/stock')
      }
    }catch (err) {
      console.log(err)
    }
  }
}

export const updateStock = (stockItem, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN)
      if (token){   
        const { data } = await axios.put(`/api/stock/${stockItem.id}`, stockItem, {
          headers: {
            authorization: token,
          }
        })
        dispatch(editStock(data));
      }  
      history.push(`/stock/${stockItem.id}`)
    } catch (err) {
      console.log(">>>>>>>>>>thunk not working!!")
      console.log(err);
    }
  };
};

export const removeStock = (id) => {
  return async (dispatch) => {
    try {
      //console.log('delete thunk works')
      const token = window.localStorage.getItem(TOKEN)
      if(token){
          const { data: stockItem } = await axios.delete(`/api/stock/${id}`,{
            headers: {
              authorization: token,
            },
          });
          dispatch(deleteStock(stockItem));
          // const { data: stock } = await axios.get('/api/books')
          // dispatch(getStock(stock))
      }      
    } catch (err) {
      console.log(err);
    }
  }
};

//REDUCER
const initialState = [];

export default function stockReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STOCK:
      return action.stock;
        case ADD_STOCK:
      return [...state, action.singleBook]
    case EDIT_STOCK:
      return state.map((stockItem) => {stockItem.id === action.stockItem.id ? action.stockItem : stockItem});
    case DELETE_STOCK:
      return state.filter((stockItem) => stockItem.id !== action.stockItem.id);
    default:
      return state;
  }
}
