import React from "react";
import { connect } from "react-redux";
import { logout } from "../store";
import { BsFillBasket3Fill } from "react-icons/bs";
import {
  Navbar,
  FormControl,
  Form,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";

//This Navbar should have the login, Logo, dropdown for admin and cart icon
const TopNav = ({ handleClick, isLoggedIn, isUserAdmin }) => (
  <div>
    <Navbar collapseOnSelect expand="lg" bg="light">
      {/* <Container> */}
      <Navbar.Brand href="/homepage" className="logo">
        <h1>BookShopper</h1>
        {/* <img src = 'logo.png' height = '100px' width = '300px'/> */}
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Form className="d-flex">
          <FormControl
            className = "justify-content-center"
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>

        {isLoggedIn ? (
          <div>
            {/* Put this back in when other formatting thingies are figured out */}
            {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
            {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
            <Nav className="me-auto">
              <Nav.Link href="/edit">Profile</Nav.Link>
              {/* The navbar will show these links after you log in */}
              <Nav.Link href="#" onClick={handleClick}>
                Logout
              </Nav.Link>
              <Nav.Link href="/cart">
                <BsFillBasket3Fill />
              </Nav.Link>
            </Nav>
            {isUserAdmin && (
              <div>
                <Nav className="me-auto">
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
                </Nav>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/cart">
                <BsFillBasket3Fill />
              </Nav.Link>
            </Nav>
          </div>
        )}
      </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  </div>
);

/**
 * CONTAINER
 */
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
