import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { loadCart, removeItemThunk  } from '../store/cart'
import { Button } from 'react-bootstrap';
import { RiDeleteBin3Line } from "react-icons/ri";

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

  return (
    <>
      {!cart.books ? (
        <div className="genreCenter">
           <h2 className="boldCarousel">Nothing in Cart - Start Shopping!</h2>
        </div>
        ) : (
        <>
        <div>
          <h2 className="boldCarousel">My Cart</h2>
        </div>
        <div>
          {cart.books.map((book) => (
            <div key={book.id}>
              <img src={book.coverimg} />
              <h2>{book.title}</h2>
              <h2>{book.author}</h2>
              <h2>${book.price
                  ? (book.price / 100).toFixed(2)
                  : (5.0).toFixed(2)}
              </h2>
              <div className="ms-auto">
                <Button
                  size="md"
                  type="button"
                  variant="primary"
                  onClick={() => dispatch(removeItemThunk(book.id))}
                >
                  <RiDeleteBin3Line color = "white"/>
                </Button>
              </div>
            </div>
          ))}
        </div>
        </>
      )}
    </>
  );
}

export default Cart;