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

    return(
        <>
        <Carousel indicators={false} controls={false} >                                  
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src ="https://images-production.bookshop.org/spree/promo_banner_slides/desktop_images/183/original/ALA-Award-Winners--Bookshop-Desktop.jpg?1647863141"
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src ="https://images-production.bookshop.org/spree/promo_banner_slides/desktop_images/180/original/AG_Bookshop_29146_2048x600.jpg?1647267716"
                    alt="Second"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src ="https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2022/03/01/Gateway_Billboard-B_OMP.jpg"
                    alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default HomeCarousel;