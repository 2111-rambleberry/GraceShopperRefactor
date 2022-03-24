import React from "react";

import {Navbar,  Nav } from 'react-bootstrap'

const GenreNav = () => (
  <div className="darkPurpleNav">
    <Navbar className="justify-content-center" variant = "dark" >
     <Nav aria-controls="basic-navbar-nav" >
      <Nav.Link href = "/genre/Fiction" >Fiction</Nav.Link>
      <Nav.Link href = "/genre/Fantasy" >Fantasy</Nav.Link>
      <Nav.Link href = "/genre/Romance" >Romance</Nav.Link>
      <Nav.Link href = "/genre/Classics" >Classics</Nav.Link>
      <Nav.Link href = "/genre/Childrens" >Childrens</Nav.Link>
     </Nav>
    </Navbar>
  </div>
);

export default GenreNav;
