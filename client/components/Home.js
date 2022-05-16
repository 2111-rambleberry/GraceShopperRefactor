import React from "react";
import Books from "./AllBooks";
import HomeCarousel from "./HomeCarousel"
import GenreCarousel from "./Carousel"
import { Image, Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <div>
      <HomeCarousel />
      <div className="marginSide">
        <Row>
          <Col>
            <Image  src="../welcome-to-bookshopper.png"/>
          </Col>
          <Col>
          <div className="darkPurple centerItems">
            <h1 >We are an online bookstore specializing in new and 
              gently-loved used books! Browse our collection and add to your
              bookshelf today.
            </h1>
          </div>
          </Col>
        </Row>
      </div>
      <GenreCarousel genre = {'Fiction'} />
      <GenreCarousel genre = {'Historical'} />
      <Books />
    </div>
  );
};

export default Home;