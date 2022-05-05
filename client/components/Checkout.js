import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadCart } from "../store/cart";
import {Stack, Image} from 'react-bootstrap'
//this thunk should include the active carts total price
//import all thunks needed here

const Checkout = () => {
  return (
    <div>
      <Stack gap = {3} className = "checkoutPage"> 
      <center> 
      <h1>Thank you for shopping at BookShopper!</h1>
      <Image src = "boy-reading.png" height = "400px"/>
      </center>
      </Stack>
    </div>
  );
};

export default Checkout;
