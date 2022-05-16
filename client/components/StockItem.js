import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { fetchStockItem } from "../store/stockItem";
import { Stack, Container, Row, Col } from "react-bootstrap";

const StockItem = () => {
    const dispatch = useDispatch();
    const match = useParams();
    const { book } = useSelector((state) => {
        return {
            book: state.stockItemReducer
        }
    })

    useEffect(() => {
        dispatch(fetchStockItem(match.stockId))
    }, [])

    return (
      <div className="singleBook">
          <Container>
            <Row>
              <Col sm={4}>
                <div key="img">
                  <img
                    className="float-right shadow-lg"
                    src={book.coverimg}
                    style={{ width: "220px", height: "350px" }}
                  />
                </div>
              </Col>

              <Col sm={8}>
                <div className="card mb-4 border-0">
                  <h1 className="bold">{book.title}</h1>
                  <h4>{book.author}</h4>

                  <Stack direction="horizontal" gap={3}>
                    <div>
                      <h4>
                        ${book.price ? (book.price / 100).toFixed(2) : 5.0}
                      </h4>
                    </div>

                    <div className = "ms-auto">
                        <Link to={`/stock/edit/${book.id}`}>
                        <button>Update Item</button>
                        </Link>
                    </div>
                  </Stack>
                  <p> Description: {book.description}</p>
                </div>
              </Col>
            </Row>
          </Container>
      </div>
    );
}

export default StockItem;
