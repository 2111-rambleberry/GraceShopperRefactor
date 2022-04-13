import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
// import { loadCart, removeItemThunk} from '../store/cart'
import { loadCart, removeItemThunk  } from '../store/cart'
import { connect } from 'react-redux';
import { Button, Spinner } from 'react-bootstrap';
import { RiDeleteBin3Line } from "react-icons/ri";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer)

  useEffect(() => {
    dispatch(loadCart())
  }, []);

  const books = cart.books

  return (
    <>
      {!books ? (
        <Spinner animation="border" variant="secondary"  size = "md" />
      ) : (
        <>
        <div>
          <h2>My Cart</h2>
        </div>
        <div>
          {books.map((book) => (
            <div key={book.id}>
              <img src={book.coverimg} />
              <h2>{book.title}</h2>
              <h2>{book.author}</h2>
              <h2>${book.price
                  ? (book.price / 100).toFixed(2)
                  : (5.0).toFixed(2)}
              </h2>
              <div className="ms-auto">
                <Button
                  size="md"
                  type="button"
                  variant="primary"
                  onClick={() => dispatch(removeItemThunk(book.id))}
                >
                  <RiDeleteBin3Line color = "white"/>
                </Button>
              </div>
            </div>
          ))}
        </div>
        </>
      )}
    </>
  );
}

export default Cart;





// class Cart extends React.Component {
//   componentDidMount() {
//     this.props.loadCart();
//     this.props.removeItemThunk();
//   }

//   render() {
//     const cart = this.props.cart || {};
//     const books = this.props.cart.books || [];
//     return (
//       <>
//         <div>
//           <h2>My Cart</h2>
//         </div>
//         <div>
//           {books.map((book) => (
//             <div key={book.id}>
//               <img src={book.coverimg} />
//               <h2>{book.title}</h2>
//               <h2>{book.author}</h2>
//               <h2>${book.price
//                   ? (book.price / 100).toFixed(2)
//                   : (5.0).toFixed(2)}
//               </h2>
//               <div className="ms-auto">
//                 <Button
//                   size="md"
//                   type="button"
//                   variant="primary"
//                   onClick={(book) => removeItemThunk(book)}
//                 >
//                   <RiDeleteBin3Line color = "white"/>
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </>
//     );
//   }
// }

// const mapState = (state) => ({
//   cart: state.cartReducer,
// });

// const mapDispatch = (dispatch) => ({
//   loadCart: () => dispatch(loadCart()),
//   removeItemThunk: (book) => dispatch(removeItemThunk(book)),
// });












// export class Cart extends React.Component {
//   constructor(){
//     super()
//     this.handleDelete = this.handleDelete.bind(this)

//   }

//   componentDidMount(){
//     this.props.loadCart()
//   }
//   handleDelete (event) {
//     event.preventDefault();
//     const bookId=event.target.value
//     this.props.deleteItem(bookId) 
//   }

//   render() {
//     const cart = this.props.cart || {}
//     const books = this.props.cart.books || []
//     console.log(cart)
//     console.log(books)
//     return (
//       <>
//         <div>
//           <h2>My Cart</h2>
//         </div>
//         <div>
//           {books.length === 0 ? <span>No items in cart!!</span> :
//           books.map(book => (
//             <div key={book.id}>
//               <img src={book.coverimg} />
//               <h3>{book.title}</h3>
//               <h3>{book.author}</h3>
//               <h3>{book.price}</h3>
//               <button onClick={ () => this.props.deleteItem(this.handleDelete)}>Remove from Cart</button>
//             </div>
//           ))}
//           <div>
//           <Link to="/checkout"><button>Checkout</button></Link>
//           </div>

//         </div>
//       </>
//     )
//   }
// }

// const mapState = (state) => ({
//   cart: state.cartReducer
// })

// const mapDispatch = (dispatch) => ({
//   loadCart: (cartId) => dispatch(loadCart(cartId)),
// })

// export default connect(mapState, mapDispatch)(Cart); 