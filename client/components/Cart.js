import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { loadCart, removeItemThunk, checkoutBooks} from '../store/cart'
// import { reduceStockQty } from '../store/stockItem'
import { reduceStockQty } from '../store/stock'
import { reduceBookQty } from '../store/singleBook'
//import { reduceBookQty } from '../store/books'
import { RiDeleteBin3Line } from "react-icons/ri";
import {Table, Button, Stack, Image} from 'react-bootstrap'
import CheckoutModal  from './CheckoutModal';

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const cart = useSelector((state) => state.cartReducer)
  const books = useSelector((state) => state.booksReducer)

  const [modalShow, setModalShow] = useState(false);

  const handleClose = () => setModalShow(false);

  const checkout = (order) => {
    dispatch(checkoutBooks(order))
    handleClose()
  }

  const getTotal = (cart) => {
    if(cart.books == undefined) return;
    let books = cart.books;
    let total = 0;
    for(let book in books){
      let cost = books[book].price;
      if(cost === 0 || cost < 100) total += 500;
      else total+=cost;
    }
    return (total/100).toFixed(2);
  }
  const total = getTotal(cart);

  return (
    <>
      {!cart.books || cart.books.length === 0 ? (
        <div className="genreCenter">
          <Stack gap = {3}>
            <center>
            <h2 className="bold darkPurple marginTop" >Nothing in Cart - Start Shopping!</h2>
            <Image src = "boy-reading.png" height = "400px"/>
            </center>
           </Stack>
        </div>
        ) : (
        <>
          <div>
            <h2 className="cart">My Cart</h2>
          </div>
          <div style={{marginLeft: "8%", marginRight: "8%"}}>
            <Table className="cart-table">
              <thead>
                <tr>
                  <th>Book</th>
                  <th></th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody className="cartTable"> 
                {cart.books.map((book) => (
                  <tr key={book.id}>
                    <td><Image height = "150px" src={book.coverimg} className = "cartBook"/></td>
                    <td>
                      <Stack>
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                      </Stack>
                    </td>
                    <td>${book.price
                        ? (book.price / 100).toFixed(2)
                        : (5.0).toFixed(2)}
                    </td>
                    <td className="ms-auto">
                      <Button
                        size="md"
                        type="button"
                        variant="outline-primary"
                        onClick={() => dispatch(removeItemThunk(book.id))}
                      >
                        <RiDeleteBin3Line/>
                      </Button>
                    </td>
                  </tr>
                ))}
                </tbody> 
            </Table>
          </div>
          <div style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "20px",
                marginRight: "8%",
                marginBottom: "8%"
              }}>        
            <div>
              <h2>Total: ${total}</h2>
            </div>
            <div> 
            <Button
              size="md"
              type="button"
              variant="primary"
              onClick={() => setModalShow(true)}
            >
              <h4>Checkout</h4>
            </Button>
            </div>    
          </div>
        </>
      )}
      <CheckoutModal show={modalShow} checkout={() => checkout(cart)}/>
    </>
  );
}

export default Cart;