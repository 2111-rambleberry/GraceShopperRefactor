import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { loadOrders } from '../store/orders'
import { RiDeleteBin3Line } from "react-icons/ri";
import {Table, Button, Stack, Image} from 'react-bootstrap'

const PastOrders = () => {

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.ordersReducer)

  useEffect(() => {
    dispatch(loadOrders());
  }, [])

  return (
    <>
      {!orders ? (
        <div className="genreCenter">
          <Stack gap = {3}>
            <center>
            <h2 className="bold darkPurple marginTop" >No Orders - Start Shopping!</h2>
            <Image src = "boy-reading.png" height = "400px"/>
            {/* <GenreCarousel genre = "Fiction" /> */}
            </center>
           </Stack>
        </div>
        ) : (
        <>
          <div>
            <h2 className="cart">My Orders</h2>
          </div>
          <div style={{marginLeft: "8%", marginRight: "8%"}}>
            <Table className="cart-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody className="cartTable"> 
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                    {order.books.map((book) => (
                      <>
                        <Image height = "150px" src={book.coverimg} className = "cartBook"/>
                        <h4>{book.title}</h4>
                        <p>{book.author}</p>
                      </>
                    ))}
                    </td>
                    <td>{order.checkout_price}</td>
                  </tr>
                ))}
                </tbody> 
            </Table>    
          </div>
        </>
      )}
    </>
  );
}

export default PastOrders;