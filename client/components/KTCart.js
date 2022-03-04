import React from "react";
import { connect } from "react-redux";
import { loadCart } from "../store/cart";

class Cart extends React.Component {
  componentDidMount() {
    this.props.loadCart();
  }

  render() {
    const cart = this.props.cart || {};
    const books = this.props.cart.books || [];
    console.log(cart);
    console.log(books);
    return (
      <>
        <div>
          <h2>My Cart</h2>
        </div>
        <div>
          {books.map((book) => (
            <div key={book.id}>
              <img src={book.coverimg} />
              <h3>{book.title}</h3>
              <h3>{book.author}</h3>
              <h3>{book.price}</h3>
            </div>
          ))}
        </div>
      </>
    );
  }
}

const mapState = (state) => ({
  cart: state.cartReducer,
});

const mapDispatch = (dispatch) => ({
  loadCart: () => dispatch(loadCart()),
});

export default connect(mapState, mapDispatch)(Cart);
