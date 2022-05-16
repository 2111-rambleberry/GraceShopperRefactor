import React from 'react';
import { setStock } from '../store/stock'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
        console.log(this.state)
        console.log(evt)
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
            <div id= 'add-book-form'>
                <form id = 'add-book' onSubmit = {handleSubmit}>
                    <h3>Add Book</h3>
                    <label htmlFor = "title">Title</label>
                    <input type = "text" id = "title" onChange = {handleChange} value = {title}/>

                    <label htmlFor = "series">Series</label>
                    <input type = "text" id = "series" onChange = {handleChange} value = {series}/>

                    <label htmlFor = "author">Author</label>
                    <input type = "text" id = "author" onChange = {handleChange} value = {author}/>

                    {/* <label htmlFor = "isbn">ISBN</label>
                    <input type = "number" id = "isbn" onChange = {handleChange} value = {isbn}/> */}

                    <label htmlFor = "description">Description</label>
                    <input type = "text" id = "description" onChange = {handleChange} value = {description}/>

                    <label htmlFor = "image">Cover Image</label>
                    <input type = "text" id = "coverimg" onChange = {handleChange} value = {coverimg}/>

                    <button type = "submit">Submit</button>
                    <Link to = "/stock">Cancel</Link>
                </form>
            </div>
        )
    }
    
}

const mapDispatchToProps = (dispatch, {history}) => ({
    setStock: (book) => dispatch(setStock(book, history))
})

export default connect(null, mapDispatchToProps)(AddBook)