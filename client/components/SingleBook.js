import React from "react";
//import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { fetchSingleBook } from "../store/singleBook";
import { addItemThunk } from '../store/cart'

class SingleBook extends React.Component {
  constructor(){
		super()
		this.state = {
			clicked: false
		}
		this.handleClick = this.handleClick.bind(this)
	}
  componentDidMount() {
    this.props.fetchSingleBook(this.props.match.params.bookId);
  }

  handleClick(item){
    this.props.addToCart(item)
		this.setState({
			clicked: true
		})
	}

  render() {
    const book = this.props.book || {};
    const { title, coverimg } = book;
    console.log(this.props);
    //console.log(this.state)

    return(
      <div>
          <h1>{title}</h1>
          <p>{book.author}</p>
          <img src = {coverimg} style = {{width: "220px", height: "350px"}} />
          <p> Description: {book.description}</p>
          <h4>${book.price ? book.price/100 : 5}</h4>
          <button type="button" onClick={() => this.handleClick(book)}>Add To Cart</button>
      </div>
  )
  }
}

//book has a bought property that once it is bought it is true. (keep in mind for button)

const mapStateToProps = (state) => ({
  book: state.singleBookReducer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSingleBook: (bookId) => dispatch(fetchSingleBook(bookId)),
  addToCart: (item) => dispatch(addItemThunk(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook);
