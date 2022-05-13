import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { loadCart } from "../store/cart";
import { BsFillBasket3Fill, BsSearch } from "react-icons/bs";
import {
  Image,
  Navbar,
  FormControl,
  Form,
  Badge,
  Nav,
  NavDropdown,
  Stack,
  Button
} from "react-bootstrap";

const TopNav = () => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer)
  const auth = useSelector((state) => state.auth)

  const isLoggedIn = !!auth.id
  const isUserAdmin = !!auth.isAdmin

  useEffect(() => {
    dispatch(loadCart())
  }, []);

  const handleClick = () => {
    dispatch(logout());
    dispatch(loadCart())
  }

  return (
    <div>
      {/* <Stack direction="horizontal" gap={2}> */}
      <Navbar collapseOnSelect sticky="top" expand="lg" bg="light">
        {/* <Container> */}          
        <Navbar.Brand href="/" className="logo">
          <Stack direction="horizontal" gap={1} >
            <Image  src="../logo-updated.png" height = '100px'/>       
            {/* <img src = 'lampLogo.png' height = '70px' width = '70px'/>  */}
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
              <Nav.Link disabled>Hello {auth.username}!</Nav.Link>         
              <Nav.Link href="/profile">Profile</Nav.Link>
              {/* <Nav.Link href="/profile/edit">Profile</Nav.Link> */}
              {/* The navbar will show these links after you log in */}
              <Nav.Link href="#" onClick={handleClick}>
                Logout
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
            </>
          )}
        </Nav>
        <Nav style={{marginRight:"5%"}}>
          <Nav.Link href="/cart">
              <BsFillBasket3Fill/>
            </Nav.Link>
            <Badge pill className="cart-badge">
              {!cart.books ? 0 : cart.books.length }
            </Badge>
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
      {/* </Stack> */}
    </div>
  );
}

export default TopNav;
