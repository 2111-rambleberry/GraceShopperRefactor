import React from "react"
import { connect } from "react-redux"
import { fetchStockItem } from "../store/stockItem";
import { updateStock } from "../store/stock";


export class FormStockItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.stockId,
      title: '',
      price: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.stockItem.stockId !== this.props.stockItem.stockId) {
  //     this.setState({
  //       title: this.props.stockItem.title || '',
  //       price: this.props.stockItem.price || ''
  //     });
  //   }
  // }

  componentDidMount() {
    console.log(this.props)
    this.props.fetchStockItem(this.props.match.params.stockId);
    console.log(this.props.stockItem)
    // this.setState({
    //   title: this.props.stockItem.title || '',
    //   price: this.props.stockItem.price || ''
    // });
  }

  // componentWillUnmount() {
  //   this.props.clearStockItem();
  // }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateStock( { ...this.props.stockItem, ...this.state } )
  }
    
  render() {
    const { title, price } = this.state
    
    const { handleSubmit, handleChange } = this;
    console.log('>>>>PROPS', this.props)
    console.log('>>>>STATE', this.state)
    return (
      <div>
        <h2>Edit a Book</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Edit Book Title</label>
          <input type="text" name="title" onChange={handleChange} value={title} />

          <label htmlFor="price">Edit Price</label>
          <input type="text" name="price" onChange={handleChange} value={price} />

          <button type='submit'>Update Book</button>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = ({ stockItemReducer }) => ({
//   stockItemReducer
// })

const mapDispatch = (dispatch, { history}) => ({
  fetchStockItem: (id) => dispatch(fetchStockItem(id)),
  updateStock: (stockItem) => dispatch(updateStock(stockItem, history)),
  clearStockItem: () => dispatch(fetchStockItem({}))
})

export default connect(null, mapDispatch)(FormStockItem);
