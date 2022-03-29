import React , { useEffect }from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGenre } from "../store/genre";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Container, Row, Card, Button } from "react-bootstrap"

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
    
      <Row className = "genre">
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
                  <Card style={{ width: '8rem' }}> 
                      <Card.Img variant ="top" className="book-cover all-books" src={book.coverimg} />
                      <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text className="text-muted">{book.author}</Card.Text>

                        <Card.Text>{book.price}</Card.Text>
                        <Button variant="primary">Add to Cart</Button>
                      </Card.Body>
                  </Card>
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