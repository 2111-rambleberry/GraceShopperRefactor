import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { loadOrders } from '../store/orders'
import {Table, Stack, Image} from 'react-bootstrap'

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
                  <th>Books</th>
                  {/* <th>Price</th> */}
                </tr>
              </thead>
              <tbody className="cartTable"> 
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                    <div>
                      <h2>Order Date: {order.createdAt.slice(0, 10)}</h2>
                    </div>
                    <div className="book-orders">
                      {order.books.map((book) => (
                        <div key={book.id}>
                          <Image height = "150px" src={book.coverimg} className = "cartBook"/>
                        </div>
                      ))}
                    </div>
                    </td>
                    {/* <td>{order.checkout_price}</td> */}
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