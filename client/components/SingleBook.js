import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleBook } from "../store/singleBook";
import { addItemThunk } from "../store/cart";
import { Button, Stack, Container, Row, Col, Card } from "react-bootstrap";

const SingleBook = () => {
  const dispatch = useDispatch();
  const book = useSelector((state) => state.singleBookReducer);
  const { bookId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleBook(bookId));
  }, []);

  return (
    <>
      {!book ? (
        <p> Loading... </p>
      ) : (
        <div>
          <Container>
            <Row>
              <Col sm={4}>
                <img
                  className="float-right shadow-lg"
                  src={book.coverimg}
                  style={{ width: "280px" }}
                />
              </Col>

              <Col sm={8}>
                <div className="card mb-4 border-0">
                  <h1>{book.title}</h1>
                  <p>{book.author}</p>

                  <Stack direction="horizontal" gap={3}>
                    <div>
                      <h4>
                        $
                        {book.price
                          ? (book.price / 100).toFixed(2)
                          : (5.0).toFixed(2)}
                      </h4>
                    </div>

                    <div className="ms-auto">
                      <Button
                        size="sm"
                        type="button"
                        variant="primary"
                        onClick={() => addItemThunk(book)}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </Stack>

                  <h3>Description</h3>
                  <p>{book.description}</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

//book has a bought property that once it is bought it is true. (keep in mind for button)
export default SingleBook;
