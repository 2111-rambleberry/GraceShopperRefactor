import React from "react"
import { connect } from "react-redux"
import { fetchStockItem } from "../store/stockItem";
import { updateStock } from "../store/stock";
import { Form, Button, Stack, Card } from 'react-bootstrap'

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

  componentDidMount() {
    this.props.fetchStockItem(this.props.match.params.stockId);
}

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

    return (
      <div>
        <center>
          <Card style={{ width: "40%", padding:"2%"}} className = "loginCard shadow-lg">
          <Card.Body> 
            <center>
              <Card.Title> <h2>Edit a Book</h2> </Card.Title>
              <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" >
                <Form.Label htmlFor="title">Edit Book Title</Form.Label>
                <Form.Control type="text" name="title" onChange={handleChange} value={title} />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label htmlFor="price">Edit Price</Form.Label>
                <Form.Control type="text" name="price" onChange={handleChange} value={price} />
              </Form.Group>

              <div>
                <Button type='submit'>Update Book</Button>
              </div>
              </Form>
          </center>
        </Card.Body>
        </Card>
        </center>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history}) => ({
  fetchStockItem: (id) => dispatch(fetchStockItem(id)),
  updateStock: (stockItem) => dispatch(updateStock(stockItem, history)),
  clearStockItem: () => dispatch(fetchStockItem({}))
})

export default connect(null, mapDispatch)(FormStockItem);
