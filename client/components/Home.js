import React from "react";
import Books from "./AllBooks";
import { useSelector } from "react-redux";
import HomeCarousel from "./HomeCarousel"
import GenreCarousel from "./Carousel"
import { Image } from "react-bootstrap";
/**
 * COMPONENT
 */
const Home = () => {

  return (
    <div>
      <HomeCarousel />
      <div className="marginTop">
        {/* <Image  src="../welcome-to-bookshopper.png"/> */}
        <GenreCarousel genre = {'Fiction'} />
        <GenreCarousel genre = {'Historical'} />
        {/* <GenreCarousel genre3 = {'Westerns'} /> */}
        <Books />
      </div>
    </div>
  );
};

export default Home;