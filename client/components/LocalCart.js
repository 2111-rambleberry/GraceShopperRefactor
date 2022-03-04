import React from 'react';
import {connect} from 'react-redux';
import {removeGuestCartItem} from '../store/localcart'

export class LocalCart extends React.Component{
  constructor() {
    super()
    this.state = {
      contents: {}
    }

    this.removeItem = this.removeItem.bind(this)
    this.updateItem = this.updateItem.bind(this)
  }

  componentDidMount() {
    const BookObj = JSON.parse(localStorage.getItem('cart'))
    this.setState({
      contents: BookObj
    })
  }

  removeItem(BookName) {
    removeGuestCartItem(BookName)
    const BookObj = JSON.parse(localStorage.getItem('cart'))
    this.setState({
      contents: BookObj
    })
  }

  render() {
    const cart = this.state.items || []
    const cartArr = Object.values(cart)
    return (
      <div>
        <h3>Guest's Cart</h3>
        <Cart
          cart={cartArr}
          handleRemove={this.removeItem}
        />
      </div>
    )
  }
}
  
  export default LocalCart;