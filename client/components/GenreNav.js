import React from "react";

import {Navbar,  Nav} from 'react-bootstrap'

const GenreNav = () => (
  <div className="darkPurpleNav">
    <Navbar className="py-0 justify-content-center" variant = "dark" >
     <Nav aria-controls="basic-navbar-nav" variant = "dark" className="justify-content-center">
      <Nav.Item><Nav.Link href = "/genre/Fiction" >Fiction</Nav.Link> </Nav.Item>
      <Nav.Item><Nav.Link href = "/genre/Fantasy" >Fantasy</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link href = "/genre/Romance" >Romance</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link href = "/genre/Classics" >Classics</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link href = "/genre/Childrens" >Childrens</Nav.Link></Nav.Item>
     </Nav>
    </Navbar>
  </div>
);

export default GenreNav;
