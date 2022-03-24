import React from "react";
import { connect } from "react-redux";
import { logout } from "../store";
import { BsFillBasket3Fill, BsSearch } from "react-icons/bs";
import {
  Navbar,
  FormControl,
  Form,
  Container,
  Nav,
  NavDropdown,
<<<<<<< HEAD
  Stack
=======
  Button
>>>>>>> main
} from "react-bootstrap";

//This Navbar should have the login, Logo, dropdown for admin and cart icon
const TopNav = ({ handleClick, isLoggedIn, isUserAdmin }) => (
  <div>
    {/* <Stack direction="horizontal" gap={2}> */}
    <Navbar collapseOnSelect expand="lg" bg="light">
      {/* <Container> */}  
      
      <Navbar.Brand href="/homepage" className="logo">
<<<<<<< HEAD
        <h2>BookShopper</h2>
=======
        <h1 className="bold">BookShopper</h1>
>>>>>>> main
        {/* <img src = 'logo.png' height = '100px' width = '300px'/> */}
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className = "ms-auto"> 
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>
<<<<<<< HEAD
        <Nav>
        {isLoggedIn ? (
          <div>
           
              <Nav.Link href="/edit">Profile</Nav.Link>
              {/* The navbar will show these links after you log in */}
              <Nav.Link href="#" onClick={handleClick}>
                Logout
              </Nav.Link>
              <Nav.Link href="/cart">
                <BsFillBasket3Fill />
              </Nav.Link>
            {isUserAdmin && (

                 <div>
                   <NavDropdown
                     title="Market Place"
                     id="collasible-nav-dropdown"
                   >
                     <NavDropdown.Item href="/stock">Stock</NavDropdown.Item>
                     <NavDropdown.Item href="/users">Users</NavDropdown.Item>
                     <NavDropdown.Item href="/add-book">
                       Add Book
                     </NavDropdown.Item>
                   </NavDropdown>
               </div> 
=======
        <Button variant="outline-primary">
          <BsSearch />
        </Button>
      </Nav> 
      <Nav className="ms-auto">
        {isLoggedIn ? (
          <>            
            <Nav.Link href="/edit">Profile</Nav.Link>
            {/* The navbar will show these links after you log in */}
            <Nav.Link href="#" onClick={handleClick}>
              Logout
            </Nav.Link>
            <Nav.Link href="/cart">
              <BsFillBasket3Fill />
            </Nav.Link>
            {isUserAdmin && (
              <NavDropdown
                title="Admin Portal"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="/stock">Stock</NavDropdown.Item>
                <NavDropdown.Item href="/users">Users</NavDropdown.Item>
                <NavDropdown.Item href="/add-book">
                  Add Book
                </NavDropdown.Item>
              </NavDropdown>
>>>>>>> main
            )}
          </>
        ) : (
          <>
            {/* The navbar will show these links before you log in */}
<<<<<<< HEAD
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/cart">
                <BsFillBasket3Fill />
              </Nav.Link>
              
          </div>
        )}
        </Nav>
=======
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/cart">
              <BsFillBasket3Fill />
            </Nav.Link>
          </>
        )}
      </Nav>
>>>>>>> main
      </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
    {/* </Stack> */}
  </div>
);

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isUserAdmin: !!state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(TopNav);
