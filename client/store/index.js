import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import singleBookReducer from "./singleBook";
import singleUserReducer from "./singleUser"
import booksReducer from "./books";
import stockReducer from "./stock";
import stockItemReducer from "./stockItem";
import cartReducer from "./cart"
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import usersReducer from "./users";

//add reducers here! Don't forget to import!

const reducer = combineReducers({
  auth,
  booksReducer,
  singleBookReducer,
  singleUserReducer,
  usersReducer,
  stockReducer,
  stockItemReducer,
  cartReducer
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
