import React from "react";
import Books from "./AllBooks";
import { useSelector } from "react-redux";
import HomeCarousel from "./HomeCarousel"
/**
 * COMPONENT
 */
const Home = () => {
  const username = useSelector((state) => state.auth.username)

  return (
    <div>
      <HomeCarousel />
      {username? (<h1>Hello {username}!</h1> ): (<h1>Hello Book Shopper!</h1>)}
      <Books />
    </div>
  );
};

export default Home;