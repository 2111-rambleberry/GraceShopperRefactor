import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { loadCart, removeItemThunk  } from '../store/cart'
import { Button, Tab } from 'react-bootstrap';
import { RiDeleteBin3Line } from "react-icons/ri";
import Table from 'react-bootstrap/Table'

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
          <Table responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
              {cart.books.map((book) => (
                <tr key={book.id}>
                  {/* <img src={book.coverimg} /> */}
                  <td>{book.title}</td>
                  <td>{book.author}</td>
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
                      <RiDeleteBin3Line color = "white"/>
                    </Button>
                  </td>
                </tr>
              ))}
          </Table>
        </div>
        </>
      )}
    </>
  );
}

export default Cart;