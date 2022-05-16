import React from "react";
import { Stack, Image } from 'react-bootstrap'

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
