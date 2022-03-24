import React , { useEffect }from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGenre } from "../store/genre";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap"

const GenrePage = () => {
  //Need to get the genre from the URL
  const dispatch = useDispatch();
  const books = useSelector((state) => state.genreReducer);
  const { genre } = useParams();
  const strGenre = String(genre)

  useEffect(() => {
      dispatch(fetchGenre(strGenre));
  }, [])

 console.log(genre);

  return (

   <Container>
    
      <Row>
        <h1>{genre}</h1>
      </Row>

      <Row>
      <div className="book-small">
      {books.map((book) => {
        {
          if (book.bought === false)
            return (
              <div className="book-info" key={book.id}>
                <div className="shadow-lg">
                  <Link to={`/books/${book.id}`}>
                    <img className="book-cover all-books" src={book.coverimg} />
                  </Link>
                </div>
              </div>
            );
        }
      })}
       </div>
      </Row>
    </Container>
  );
};

export default GenrePage;