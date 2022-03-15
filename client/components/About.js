import React from "react";
import { Link } from "react-router-dom";

export default function About(){
    return(
        <div className="container mt-3" align="left" style={{ fontSize: 13 }}>
        <div className="row mb-3">
          <h5>China Hoffman</h5>
          <p><a href="https://www.linkedin.com/in/montensia/" target="_blank">LinkedIn</a> | <a href="https://github.com/monteecode" target="_blank">GitHub</a></p>
        </div>

        <div className="row mb-3">
          <h5>Keranie T</h5>
          <p><a href="https://www.linkedin.com/in/chua-kimberly/" target="_blank">LinkedIn</a> | <a href="https://github.com/kchua123" target="_blank">GitHub</a></p>
        </div>

        <div className="row mb-3">
          <h5>Gal </h5>
          <p><a href="https://www.linkedin.com/in/gal-l-gir/" target="_blank">LinkedIn</a> | <a href="https://github.com/Galilior" target="_blank">GitHub</a></p>
        </div>

        <div className="row mb-3">
          <h5>Amanda H</h5>
          <p><a href="https://www.linkedin.com/in/sandra-magnusdottir/" target="_blank">LinkedIn</a> | <a href="https://github.com/sandrakristrun" target="_blank">GitHub</a></p>
        </div>
      </div>
    )
}