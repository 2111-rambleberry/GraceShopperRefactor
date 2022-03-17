///This will be as dynamic as possible

//This will get a genre input, then based off the genre will go to 
//-->Thunk-->API-->Data-->Component
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGenre } from "../store/genre";
import { Carousel, CarouselItem } from "react-bootstrap";

//For this element the genre would get passed through 
const GenreCarousel = () => {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.genreReducer);

    useEffect(() => {
        dispatch(fetchGenre('Westerns'));
    }, [])

    console.log(books)
    return(
        <>
        {/* <Carousel>
                {books.map((book) =>                                       
                    <Carousel.Item key = {book.id}>
                    <div className = 'col-6 col-md-2'>
                        <img
                        className="d-block w-30"
                        src = {book.coverimg}
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>{book.title}</h3>
                        <p>{book.format}</p>
                        </Carousel.Caption> 
                    </div>
                    </Carousel.Item>    
                )}
            </Carousel> */}
        </>
    )
}

export default GenreCarousel;