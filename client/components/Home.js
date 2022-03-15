import React from "react";

import Books from "./AllBooks";
import { useSelector } from "react-redux";
import GenreCarousel from "./Carousel"
/**
 * COMPONENT
 */
const Home = () => {
  const username = useSelector((state) => state.auth.username)

  return (
    <div>
      <GenreCarousel />
      {username? (<h1>Hello {username}!</h1> ): (<h1>Hello Book Shopper!</h1>)}
      <Books />
    </div>
  );
};

export default Home;