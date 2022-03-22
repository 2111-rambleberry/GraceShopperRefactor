import React from "react";

import {Navbar,  Nav } from 'react-bootstrap'

const GenreNav = () => (
  <div >
    <Navbar bg = "dark" className="justify-content-center" variant = "light" >
     <Nav.Link href = "/genre/Fiction" >Fiction</Nav.Link>
     <Nav.Link href = "genre/Fantasy" >Fantasy</Nav.Link>
     <Nav.Link href = "/genre/Romance" >Romance</Nav.Link>
     <Nav.Link href = "/genre/Classics" >Classics</Nav.Link>
     <Nav.Link href = "/genre/Childrens" >Childrens</Nav.Link>
    </Navbar>
  </div>
);

export default GenreNav;
