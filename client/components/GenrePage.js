import React , { useEffect }from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGenre } from "../store/genre";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Container, Row, Card, Button, Col } from "react-bootstrap"
import { addItemThunk } from "../store/cart";
import { BsFillBasket3Fill } from "react-icons/bs";

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
    
      <Row className = "genre marginBottom">
        <h1>{genre}</h1>
      </Row>

      <Row s={2} md={1} className="g-4">
      <div className="book-small">
      
      {books.map((book) => {
        {
          if (book.bought === false)
            return (
            <Col>
              <div className="book-info" key={book.id}>
                <div className="book-card">
                  <Card className = "border-0" style={{ width: '10rem', height: '32rem' }}> 
                    <Card.Link href = {`/books/${book.id}`}> 
                      <Card.Img variant ="top" className="book-cover shadow-lg" src={book.coverimg} />
                      </Card.Link>
                      <Card.Body className= "d-flex flex-column">
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text className="text-muted">
                          {book.author.length > 30 ? 
                          book.author.slice(0,40) + '...' :
                          book.author
                          }
                        </Card.Text>

                        <Card.Text>                        $
                        {book.price
                          ? (book.price / 100).toFixed(2)
                          : (5.0).toFixed(2)}
                        </Card.Text>
                        
                        <Button
                        size="sm"
                        style ={{color:"white", backgroundColor: "purple", border: "purple"}}
                        type="submit"
                        variant="primary"
                        onClick={() => addItemThunk(book)}
                      >
                        <BsFillBasket3Fill color = "white"/>  Add To Cart
                      </Button >
                      </Card.Body>
                  </Card>
                </div>
              </div>
              </Col>
            );
        }
      })}
       </div>
      </Row>
    </Container>
  );
};

export default GenrePage;