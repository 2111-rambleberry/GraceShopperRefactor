///This will be as dynamic as possible

//This will get a genre input, then based off the genre will go to 
//-->Thunk-->API-->Data-->Component
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import genreReducer, { fetchGenre } from "../store/genre";
import { Carousel, CarouselItem, Row, Col } from "react-bootstrap";

//For this element the genre would get passed through 
const GenreCarousel = (props) => {
    const dispatch = useDispatch();
    //const [genre, setGenre] = useState('');

    const books = useSelector((state) => state.genreReducer);


    useEffect(() => {
        setGenre(props.genre);
        dispatch(fetchGenre(genreProp));
    }, [])

    const carouselGroup = (books, n) => books.slice(0, 12)
        .reduce((acc, book, i) => {
        const idx = Math.floor(i / n);
        acc[idx] = [...(acc[idx] || []), book.coverimg];
        return acc;
    }, []);

    //const genre = props.genre;

    const groups = carouselGroup(books, 4)
    //console.log("genre", genreProp)

    return(
        <div className="carouselGenre">
            <Carousel> 
                {groups.map((group) => {
                    return (
                        <CarouselItem key={group}>
                            <Row>
                                <div className="genreCenter">
                                {group.map((book) => {
                                    return ( <div key={book}>
                                        <img
                                        className="book-cover carousel-books"
                                        src={book}
                                        alt="First slide"
                                        />
                                    </div>
                                )})}
                                </div>
                            </Row>
                        </CarouselItem>
                )})}
            </Carousel>     
        </div>
    )
}

export default GenreCarousel;