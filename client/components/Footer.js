import React from "react";
import { Link } from "react-router-dom";
import About from "./About";

export default function Footer() {
  return (
    <div className="container justify-content-end mt-3" align="center">
      <div className="row justify-content-center mb-3" style={{ fontSize: 13 }}>
        <div>
        <a
          data-bs-toggle="offcanvas"
          href="#sources"
          aria-controls="offcanvasExample"
          style={{ display: "inline" }}
        >
          Data Sources & Credits{" "}
        </a>

        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="sources"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h5 id="offcanvasRightLabel">Meet the Team</h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body"><About /></div>
        </div>
            </div>
          </div>
        </div>
  );
}
