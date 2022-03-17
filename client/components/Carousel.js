///This will be as dynamic as possible

//This will get a genre input, then based off the genre will go to 
//-->Thunk-->API-->Data-->Component
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGenre } from "../store/genre";

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
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    {books.map((book) =>
                        <div className="carousel-item active" key={book.id}>
                                <img className="d-block w-30" src={book.coverimg} alt={book.title} />
                            <div className="carousel-caption d-none d-md-block">
                                <p>{book.format}</p>
                            </div>
                        </div>
                    )}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </>
    )
}

export default GenreCarousel;