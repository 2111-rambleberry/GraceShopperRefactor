//note: look at todos and todo in PairExercise.TodoList.V2 for a good example of how to pass an id prop to each single book
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../store/books";

const Books = () => {
  //gives access to dispatch thunks directly
  const dispatch = useDispatch();
  
  //gives access to redux state
  const books = useSelector((state) => state.booksReducer);

  //where you preform side effects, including data fetching, manually changing the DOM, using history (also available as a hook). Basically componentDidMount, componentDidUpdate and componentWillUnmount combined.
  useEffect(() => {
    dispatch(fetchBooks());
    //this empty bracket determines that whatever is in the useEffect body will be called once, making this a replacement for componentDidMount.
  }, []);

  return (
    // <>
    // <div className="book-small">
    //   {books.map((book) => {
    //       {
    //         if (book.bought === false)
    //           return (
    //             <Card style={{ width: '10rem' }} bg="light" key={book.id}>
    //               <Card.Img variant="top" src={book.coverimg} />
    //               <Card.Body>
    //                 {/* <Card.Title>{book.title}</Card.Title>
    //                 <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle> */}
    //                 <Button variant="primary">Add to Cart</Button>
    //               </Card.Body>
    //             </Card>
    //               // <Link to={`/books/${book.id}`}>
    //               //   <img className="book-cover all-books"  />
    //               // </Link>
    //           );
    //       }
    //     })}
    //   </div>
    // </>
    <div className="book-small">
      {books.map((book) => {
        {
            return (
              book.quantity ? 
              <div className="book-info" key={book.id}>
                <div className="shadow-lg">
                  <Link to={`/books/${book.id}`}>
                    <img className="book-cover all-books" src={book.coverimg} />
                  </Link>
                </div>
              </div> :
              <div className="book-info" key={book.id}>
                <div className="soldOut">
                  <Link to={`/books/${book.id}`}>
                    <img className="book-cover all-books" src={book.coverimg} />
                 </Link>
                    </div>
                      </div>
            ); 
        }
      })}
    </div>
  );
};

export default Books;
