import React, { useEffect, useState } from "react";
import { Carousel, CarouselItem, Row} from "react-bootstrap";
import axios from "axios";

//For this element the genre would get passed through 
const GenreCarousel = (props) => {
    const [books, setBooks] = useState([]);

    const genre = props.genre;
    
    useEffect(() => {
        const fetchBooks = async () => {
            const { data: bookGenre } = await axios.get(`/api/genre/${genre}`)
            setBooks(bookGenre);
        };
        fetchBooks()
      }, 
      []);

    const carouselGroup = (books, n) => books.slice(0, 12)
        .reduce((acc, book, i) => {
        const idx = Math.floor(i / n);
        acc[idx] = [...(acc[idx] || []), book];
        return acc;
    }, []);

    const groups = carouselGroup(books, 4)

    return(
        <>
        <h2 className="boldCarousel">Browse Our {genre} Collection</h2>
        <div className="carouselGenre">
            <Carousel> 
                {groups.map((group, i) => {
                    return (
                        <CarouselItem key={group[i].id}>
                            <Row>
                                <div className="genreCenter">
                                    {group.map((book) => {
                                        return ( 
                                        <div key={book.id}>
                                            <a href = {`/books/${book.id}`}> 
                                                <img
                                                className="book-cover carousel-books"
                                                src={book.coverimg}
                                                alt="First slide"
                                                /> 
                                            </a>
                                        </div>
                                    )})}
                                </div>
                            </Row>
                        </CarouselItem>
                )})}
            </Carousel>     
        </div>
        </>
    )
}

export default GenreCarousel;