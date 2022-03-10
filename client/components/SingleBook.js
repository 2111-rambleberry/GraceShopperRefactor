import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleBook } from "../store/singleBook";
import { addItemThunk } from '../store/cart'

const SingleBook = () => {
  const dispatch = useDispatch();
  const book = useSelector((state) => state.singleBookReducer)
  const { bookId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleBook(bookId));  
  }, []);

    return(
      <>
        {!book ? (
          <p> Loading... </p>
        ) : ( 
        <div>
          <h1>{book.title}</h1>
          <p>{book.author}</p>
          <img src = {book.coverimg} style = {{width: "220px", height: "350px"}} />
          <p> Description: {book.description}</p>
          <h4>${book.price ? (book.price/100).toFixed(2) : (5.00).toFixed(2)}</h4>
          <button type="button" onClick={() => addItemThunk(book)}>Add To Cart</button>
        </div>  
      )}
    </>
  )
}

//book has a bought property that once it is bought it is true. (keep in mind for button)
export default SingleBook