import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadCart } from "../store/cart";

//this thunk should include the active carts total price
//import all thunks needed here

const Checkout = () => {
  return (
    <div>
      <h1>Thank you for shopping at BookShopper!</h1>
    </div>
  );
};

export default Checkout;
