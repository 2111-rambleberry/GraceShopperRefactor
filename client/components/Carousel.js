///This will be as dynamic as possible

//This will get a genre input, then based off the genre will go to 
//-->Thunk-->API-->Data-->Component
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGenre } from "../store/genre";
import { Carousel, CarouselItem, Row, Col } from "react-bootstrap";

//For this element the genre would get passed through 
const GenreCarousel = () => {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.genreReducer);

    useEffect(() => {
        dispatch(fetchGenre('Vampires'));
    }, [])

    const carouselGroup = (books, n) => books.reduce((acc, book, i) => {
        const idx = Math.floor(i / n);
        acc[idx] = [...(acc[idx] || []), book.coverimg];
        return acc;
    }, []);

    const groups = carouselGroup(books, 3)

    // const BookGroup = ({items}) => {
    //     items.map((item) => {
    //         return (
    //             <div>

    //             </div>
    //         )
    //     })
        
    // }


    return(
        <>
        <Carousel>
            {groups.map((group) => {
                return ( <CarouselItem key={group}>
                    <Row>
                        <Col>
                        <img
                        className="book-cover carousel-books"
                        src={group[0]}
                        alt="First slide"
                        />
                        </Col>
                        <Col>
                        <img
                        className="book-cover carousel-books"
                        src={group[1]}
                        alt="First slide"
                        />
                        </Col>
                        <Col>
                        <img
                        className="book-cover carousel-books"
                        src={group[2]}
                        alt="First slide"
                        />
                        </Col>
                    </Row>
                </CarouselItem>
            )})}
            {/* <CarouselSlide items={books}/> */}
        </Carousel>
            
        </>
    )
}

export default GenreCarousel;




{/* <>
<CarouselSlide items={books}></CarouselSlide>
<Carousel>
    
        <Carousel.Item>
                <CarouselSlide items={books}>
                    {books.map((book) => {
                        <img
                        className="d-block w-30"
                        src = {book.coverimg}
                        alt="First slide"
                        />
                    })}
                </CarouselSlide>
            <Col>
            <img
            className="d-block w-30"
            src = {book.coverimg}
            alt="First slide"
            />
            </Col>
            <Col>
            <img
            className="d-block w-30"
            src = {book.coverimg}
            alt="First slide"
            />
            </Col>
            <Col>
            <img
            className="d-block w-30"
            src = {book.coverimg}
            alt="First slide"
            />
            </Col>
        </Carousel.Item>
</Carousel>
</> */}