import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { loadCart, removeItemThunk  } from '../store/cart'
//import { Button } from 'react-bootstrap';
import { RiDeleteBin3Line } from "react-icons/ri";
import {Table, Button, Stack, Image} from 'react-bootstrap'

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const cart = useSelector((state) => state.cartReducer)

  useEffect(() => {
    dispatch(loadCart())
  }, []);

  const handleSubmit = (book) => {() => {
    dispatch(removeItemThunk(book.id))
    dispatch(loadCart()) 
    }
  }
  console.log(cart.books);

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

  return (
    <>
      {!cart.books ? (
        <div className="genreCenter">
           <h2 className="boldCarousel">Nothing in Cart - Start Shopping!</h2>
        </div>
        ) : (
        <>
        <div>
          <h2 className="cart">My Cart</h2>
        </div>
        <div>
         <Table bordered>
           <thead>
             <tr>
               <th>Book</th>
               <th></th>
               <th>Price</th>
               <th>Remove</th>
             </tr>
           </thead>
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
                     onClick={() => dispatch(removeItemThunk(book.id))}
                   >
                     <RiDeleteBin3Line color = "black"/>
                   </Button>
                 </td>
               </tr>
             ))}
         </Table>
         <h1 text-align = "center">Total : {total} </h1>
       </div>
        </>
      )}
    </>
  );
}

export default Cart;