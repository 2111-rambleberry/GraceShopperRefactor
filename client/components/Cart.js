import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { loadCart, removeItemThunk, cartCheckoutStatus } from '../store/cart'
// import { reduceStockQty } from '../store/stockItem'
import { reduceStockQty } from '../store/stock'
// import { reduceBookQty } from '../store/singleBook'
import { reduceBookQty } from '../store/books'
import { RiDeleteBin3Line } from "react-icons/ri";
import {Table, Button, Stack, Image} from 'react-bootstrap'


const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const cart = useSelector((state) => state.cartReducer)
  const books = useSelector((state) => state.booksReducer)

  useEffect(() => {
    dispatch(loadCart())
  }, []);

  function getTotal(cart){
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

// function reduceQty(cart){
//   cart.books.map((book) => reduceStockQty(book.id, book.quantity))
// }
    console.log('react cart', cart)
  return (
    <>
      {!cart.books || cart.books.length === 0 ? (
        <div className="genreCenter">
          <Stack gap = {3}>
            <center>
            <h2 className="bold darkPurple marginTop" >Nothing in Cart - Start Shopping!</h2>
            <Image src = "boy-reading.png" height = "400px"/>
            {/* <GenreCarousel genre = "Fiction" /> */}
            </center>
           </Stack>
        </div>
        ) : (
        <>
        <div>
          <h2 className="cart">My Cart</h2>
        </div>
        <div>
         <Table bordered className = "checkoutTable">
           <thead>
             <tr>
               <th>Book</th>
               <th></th>
               <th>Price</th>
               <th>Remove</th>
             </tr>
           </thead>
           {/* <tbody>  */}
             {cart.books.map((book) => (
               <tr key={book.id}>
                 <td><Image height = "150px" src={book.coverimg} className = "cartBook"/></td>
                 <td>
                   <Stack>
                     <h3>{book.title}</h3>
                     <p>{book.author}</p>
                   </Stack></td>
                 <td>${book.price
                     ? (book.price / 100).toFixed(2)
                     : (5.0).toFixed(2)}
                 </td>
        
                 <td className="ms-auto">
                   <Button
                     size="md"
                     type="button"
                     variant="primary"
                     onClick={() => {dispatch(removeItemThunk(book.id))}}
                   >
                     <RiDeleteBin3Line color = "black"/>
                   </Button>
                 </td>
               </tr>
             ))}
              <tr className = "total">
                 <td>Total</td>
                 <td></td>
                 <td><h1>${total}</h1></td>
                 <td></td>
                </tr>
             {/* </tbody>  */}
         </Table>
       </div>
       <div>

         <center>
         <Button
           size="md"
           type="button"
           variant="primary"
           onClick={() => {
             console.log('onclick', cart.books)
            cart.books.map((book) => dispatch(reduceBookQty(book, history)));
           //  dispatch(cartCheckoutStatus(cart.id))}
           }}
         >
           <h1>Checkout</h1>
         </Button>
         </center>

       </div>
        </>
      )}
    </>
  );
}

export default Cart;