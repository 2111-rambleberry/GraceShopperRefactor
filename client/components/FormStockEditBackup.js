import React from "react"
import { connect } from "react-redux"
import { fetchStockItem, updateStock } from "../store/stockItem";


class FormStockItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      series: '',
      author: '',
      description: '',
      language: '',
      isbn: '',
      genres: '',
      bookformat: '',
      pages: '',
      publisher: '',
      coverimg: '',
      price: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.stockId;
    this.props.fetchStockItem(id);
  }

  componentWillUnmount() {
    this.props.clearStockItem();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stockItem.id !== this.props.stockItem.id) {
      this.setState({
        title: this.props.stockItem.title || '',
        series: this.props.stockItem.series || '',
        author: this.props.stockItem.author || '',
        description: this.props.stockItem.description || '',
        language: this.props.stockItem.language || '',
        isbn: this.props.stockItem.isbn || '',
        genres: this.props.stockItem.genres || '',
        bookformat: this.props.stockItem.bookformat || '',
        pages: this.props.stockItem.pages || '',
        publisher: this.props.stockItem.publisher || '',
        coverimg: this.props.stockItem.coverimg || '',
        price: this.props.stockItem.price || ''
      });
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateStock({...this.props.stockItem, ...this.state})
  }
    
  render() {
    const { title, series, author, description, language, isbn, genres,
      bookformat, pages, publisher, coverimg, price } = this.state
    
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <h2>Edit a Book</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Edit Book Title</label>
          <input name="title" onChange={handleChange} value={title} />

          <label htmlFor="series">Edit Series</label>
          <input name="series" onChange={handleChange} value={series} />

          <label htmlFor="author">Edit Author</label>
          <input name="author" onChange={handleChange} value={author} />

          <label htmlFor="description">Edit Description</label>
          <input name="description" onChange={handleChange} value={description} />

          <label htmlFor="language">Edit Langauge</label>
          <input name="language" onChange={handleChange} value={language} />

          <label htmlFor="isbn">Edit Isbn</label>
          <input name="isbn" onChange={handleChange} value={isbn} />

          <label htmlFor="genres">Edit Genres</label>
          <input name="genres" onChange={handleChange} value={genres} />

          <label htmlFor="bookformat">Edit Book Format</label>
          <input name="bookformat" onChange={handleChange} value={bookformat} />

          <label htmlFor="pages">Edit Page Numbers</label>
          <input name="pages" onChange={handleChange} value={pages} />

          <label htmlFor="publisher">Edit Publisher</label>
          <input name="publisher" onChange={handleChange} value={publisher} />

          <label htmlFor="coverimg">Edit Cover Image</label>
          <input name="coverimg" onChange={handleChange} value={coverimg} />

          <label htmlFor="price">Edit Price</label>
          <input name="price" onChange={handleChange} value={price} />

          <button type='submit'>Update Book</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ stockItem }) => ({
  stockItem
})

const mapDispatch = (dispatch, { history}) => ({
  fetchStockItem: (stockId) => dispatch(fetchStockItem(stockId)),
  updateStock: (stockItem) => dispatch(updateStock(stockItem, history)),
  clearStockItem: () => dispatch(fetchStockItem({}))
})
export default connect(mapStateToProps, mapDispatch)(FormStockItem);
