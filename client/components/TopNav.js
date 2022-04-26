import React from "react";
import { connect } from "react-redux";
import { logout } from "../store";
import { BsFillBasket3Fill, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal"
import {
  Image,
  Navbar,
  FormControl,
  Form,
  Container,
  Nav,
  NavDropdown,
  Stack,
  Button
} from "react-bootstrap";

//This Navbar should have the login, Logo, dropdown for admin and cart icon
const TopNav = ({ handleClick, isLoggedIn, isUserAdmin, username }) => (

  <div>
    {/* <Stack direction="horizontal" gap={2}> */}
    <Navbar collapseOnSelect sticky="top" expand="lg" bg="light">
      {/* <Container> */}  
      
      <Navbar.Brand href="/homepage" className="logo">
        <Stack direction="horizontal" gap={1} >
          {/* <Image fluid = {true} src = 'cassetteLogo.png' height = '100px' width = '100px'/>        */}
          <img src = 'lampLogo.png' height = '70px' width = '70px'/> 
          {/* <img src = 'shelfLogo.png' height = '100px' width = '100px'/>  */}
          <h1 className="logo">BookShopper</h1>
        </Stack>
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
        <Button variant="outline-primary">
          <BsSearch />
        </Button>
      </Nav> 
      <Nav className="ms-auto">
        {isLoggedIn ? (
          <>  
            <Nav.Link disabled>Hello {username}!</Nav.Link>         
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
            )}
          </>
        ) : (
          <>
            {/* The navbar will show these links before you log in */}
            <Nav.Link href = '/login'>Login</Nav.Link>
            <Nav.Link href="/cart">
              <BsFillBasket3Fill />
            </Nav.Link>
          </>
        )}
      </Nav>
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
    username: state.auth.username
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    handleModal() {
      
    }
  };
};

export default connect(mapState, mapDispatch)(TopNav);
