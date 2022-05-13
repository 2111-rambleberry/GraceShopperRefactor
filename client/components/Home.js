import React from "react";
import Books from "./AllBooks";
import { useSelector } from "react-redux";
import HomeCarousel from "./HomeCarousel"
import GenreCarousel from "./Carousel"
import { Image, Row, Col } from "react-bootstrap";
/**
 * COMPONENT
 */
const Home = () => {

  return (
    <div>
      <HomeCarousel />
      <div className="marginTop">
        <Row>
          <Col>
            <Image  src="../welcome-to-bookshopper.png"/>
          </Col>
          <Col>
          <div className="darkPurple">
            <h2>We are an online bookstore specialising in new and 
              gently-loved used books! Browse our collection and add to your
              bookshelf today.
            </h2>
          </div>
          </Col>
        </Row>
        <GenreCarousel genre = {'Fiction'} />
        <GenreCarousel genre = {'Historical'} />
        {/* <GenreCarousel genre3 = {'Westerns'} /> */}
        <Books />
      </div>
    </div>
  );
};

export default Home;