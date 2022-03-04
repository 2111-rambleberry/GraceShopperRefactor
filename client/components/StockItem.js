import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { fetchStockItem } from "../store/stockItem";

const StockItem = () => {
    const dispatch = useDispatch();
    const match = useParams();
    const { book } = useSelector((state) => {
        return {
            book: state.stockItemReducer
        }
    })

    useEffect(() => {
        console.log(book)
        dispatch(fetchStockItem(match.stockId))
    }, [])

    return (
        <div>
          <h1>{book.title}</h1>
          <p>{book.author}</p>
          <img src={book.coverimg} style={{ width: "220px", height: "350px" }} />
          <p> Description: {book.description}</p>
          <h4>${book.price ? (book.price/100).toFixed(2) : 5.00}</h4>
          <Link to={ `/stock/edit/${book.id}` }>
            <button>Update Item</button>
          </Link>
        </div>
    );
}

export default StockItem;
