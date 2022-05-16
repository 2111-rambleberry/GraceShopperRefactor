import React from 'react';
import { setStock } from '../store/stock'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button, Stack, Card } from 'react-bootstrap'

class AddBook extends React.Component{
    constructor(){
        super()
        this.state = {
            title: '',
            series: '',
            author: '',
            description: '',
            coverimg: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'
        }        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({
          [evt.target.id]: evt.target.value
        });
      }

      handleSubmit(evt){
        evt.preventDefault(); 
        this.props.setStock({...this.state })
        this.setState({             
            title: '',
            series: '',
            author: '',
            description: '',
            coverimg: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'})
    }

    render(){
        const { handleSubmit, handleChange } = this;
        const { title, series, author, description, isbn, coverimg } = this.state


        return(
            <div id="add-book-form">
            <center>
              <Card
                style={{ width: "40%", padding: "2%" }}
                className="loginCard shadow-lg"
              >
                <Card.Body>
                  <center>
                    <Form id="add-book" onSubmit={handleSubmit}>
                      <Card.Title>
                        <h3>Add Book</h3>
                      </Card.Title>
    
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="title">Title</Form.Label>
                        <Form.Control
                          type="text"
                          id="title"
                          onChange={handleChange}
                          value={title}
                        />
                      </Form.Group>
    
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="series">Series</Form.Label>
                        <Form.Control
                          type="text"
                          id="series"
                          onChange={handleChange}
                          value={series}
                        />
                      </Form.Group>
    
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="author">Author</Form.Label>
                        <Form.Control
                          type="text"
                          id="author"
                          onChange={handleChange}
                          value={author}
                        />
                      </Form.Group>
    
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="description">Description</Form.Label>
                        <Form.Control
                          type="text"
                          id="description"
                          onChange={handleChange}
                          value={description}
                        />
                      </Form.Group>
    
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="image">Cover Image</Form.Label>
                        <Form.Control
                          type="text"
                          id="coverimg"
                          onChange={handleChange}
                          value={coverimg}
                        />
                      </Form.Group>
    
                      <Button type="submit">Submit</Button>

                      <Link to="/stock">Cancel</Link>
                    </Form>
                  </center>
                </Card.Body>
              </Card>
            </center>
          </div>
        )
    }
    
}

const mapDispatchToProps = (dispatch, {history}) => ({
    setStock: (book) => dispatch(setStock(book, history))
})

export default connect(null, mapDispatchToProps)(AddBook)