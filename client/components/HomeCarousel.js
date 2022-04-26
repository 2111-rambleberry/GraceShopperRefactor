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
                        src = "tredyHome.png"
                        alt="Deets Slide"
                        />
                </Carousel.Item> 
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src = "HomePlants.png"
                    alt="Plants Slide"
                    />
                </Carousel.Item>                                
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src = "https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2022/04/19/Gateway_Billboard_C_Graduation_04-19.jpg"
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src ="https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2022/04/19/Gateway_Billboard_C_Graduation_04-19.jpg"
                    alt="Fourth slide"
                    />
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default HomeCarousel;