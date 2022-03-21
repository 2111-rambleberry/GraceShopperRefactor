///This will be as dynamic as possible

//This will get a genre input, then based off the genre will go to 
//-->Thunk-->API-->Data-->Component
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGenre } from "../store/genre";
import { Carousel, CarouselItem } from "react-bootstrap";

//For this element the genre would get passed through 
const HomeCarousel = () => {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.genreReducer);

    useEffect(() => {
        dispatch(fetchGenre('Westerns'));
    }, [])

    // console.log(books)
    return(
        <>
        <Carousel indicators={false} controls={false} >                                  
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src ="https://images-production.bookshop.org/spree/promo_banner_slides/desktop_images/181/original/29354_ImNotScared_Bookshop1_22-DESKTOP.jpg?1647267788"
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src ="https://images-production.bookshop.org/spree/promo_banner_slides/desktop_images/180/original/AG_Bookshop_29146_2048x600.jpg?1647267716"
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src ="https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2022/03/01/Gateway_Billboard-B_OMP.jpg"
                    alt="First slide"
                    />
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default HomeCarousel;