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
    <>
    <Row className = "genre">
      <h1>{genre}</h1>
    </Row>

   <Container>
      <Row s={2} md={1} className="g-4">
      <div className="book-small">
      
      {books.map((book) => {
            return (
            <Col key = {book.id}>
                  {/* */}
                  <Card className = "border-0"  style={{ width: '12rem', height: '32rem' }}> 
                    <Card.Link href = {`/books/${book.id}`}> 
                      {book.quantity > 0 ? 
                      <Card.Img variant ="top" className="book-cover shadow-lg" src={book.coverimg}/> :
                      <Card.Img variant ="top" className="outOfStock" src={book.coverimg}/> 
                      }
                      </Card.Link>
                      <Card.Body className= "d-flex flex-column">
                        <Card.Title>
                        <h6 className = "bookTitle">
                          {book.title.length > 40 ? 
                          book.title.slice(0, 40) +"..." : 
                          book.title}
                        </h6>
                        </Card.Title>
                        <Card.Text className="text-muted">
                          {book.author.length > 30 ? 
                          book.author.slice(0,30) +"..." :
                          book.author
                          }
                        </Card.Text>
                        {/* <div  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}> */}
                        <Card.Text>                       
                         ${book.price
                          ? (book.price / 100).toFixed(2)
                          : (5.0).toFixed(2)}
                        </Card.Text>

                      {/* </div> */}
                      </Card.Body>
                      <Card.Footer style ={{color:"white", border: "none", backgroundColor: "white"}}>
                        {book.quantity > 0 ? 
                        <Button
                        size="sm"
                        style ={{color:"white", backgroundColor: "purple", border: "purple"}}
                        type="submit"
                        variant="primary"
                        onClick={() => dispatch(addItemThunk(book))}
                      > <BsFillBasket3Fill color = "white"/>  Add To Cart
                      </Button >: 
                      <Button size="sm" variant="secondary" disabled>
                      Sold Out
                       </Button> 
                        }
                      </Card.Footer>
                  </Card>
              </Col>
            );
        
      })}
       </div>
      </Row>
    </Container>
    </>
  );
};

export default GenrePage;