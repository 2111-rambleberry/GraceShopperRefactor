//note: look at todos and todo in PairExercise.TodoList.V2 for a good example of how to pass an id prop to each single book
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchStock, removeStock } from "../store/stock";

const Stock = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { books } = useSelector((state) => {
    return {
      books: state.stockReducer,
    };
  });

  useEffect(() => {
    dispatch(fetchStock());
  }, []);

  return (
    <div>
      <button type = "button" onClick = {() => {history.push(`/add-book`)}}>Add Book </button>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
          {books.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>${book.price ? (book.price/100).toFixed(2) : 5.00}</td>
                <td>
                  <button onClick={() => {history.push(`/stock/${book.id}`)}}>Edit</button>
                  <button onClick={() => dispatch(removeStock(book.id))}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>  
    </div>
  );
};

export default Stock;
