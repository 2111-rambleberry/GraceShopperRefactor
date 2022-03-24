import React from "react";
import Books from "./AllBooks";
import { useSelector } from "react-redux";
import HomeCarousel from "./HomeCarousel"
import GenreCarousel from "./Carousel"
/**
 * COMPONENT
 */
const Home = () => {

  return (
    <div>
      <HomeCarousel />
      <div className="marginTop">
        <h2 className="boldCarousel">Browse Our Fiction Collection</h2>
        <GenreCarousel genre = {'Fiction'} />
        {/* <GenreCarousel genre2 = {'Historical'} />
        <GenreCarousel genre3 = {'Westerns'} /> */}
        <Books />
      </div>
    </div>
  );
};

export default Home;