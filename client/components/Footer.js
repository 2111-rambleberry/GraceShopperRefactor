import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas'

export default function Footer() {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <footer className = "footer">
      <Image  src="../logo-updated.png" height = '80%'/>
      <Link onClick = {handleShow} > 
        <p>Meet the Team</p> 
      </Link>

      <Offcanvas show={show} onHide={handleClose} placement = 'end'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Hello there!</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <div className="China">
          <Offcanvas.Title>China Hoffman</Offcanvas.Title>
          <p><a href="https://www.linkedin.com/in/montensia/" target="_blank">LinkedIn</a> | <a href="https://github.com/cph2134" target="_blank">GitHub</a></p>
        </div>

        <div className="Keranie">
        <Offcanvas.Title>Keranie</Offcanvas.Title>
          <p><a href="https://www.linkedin.com/in/chua-kimberly/" target="_blank">LinkedIn</a> | <a href="https://github.com/kez-theo" target="_blank">GitHub</a></p>
        </div>

        <div className="Gal">
        <Offcanvas.Title>Gal</Offcanvas.Title>
          <p><a href="https://www.linkedin.com/in/gal-l-gir/" target="_blank">LinkedIn</a> | <a href="https://github.com/Galilior" target="_blank">GitHub</a></p>
        </div>

        <div className="Amanda">
        <Offcanvas.Title>Amanda Henneberry</Offcanvas.Title>
          <p><a href="https://www.linkedin.com/in/sandra-magnusdottir/" target="_blank">LinkedIn</a> | <a href="https://github.com/amandahenneberry" target="_blank">GitHub</a></p>
        </div>

        </Offcanvas.Body>

      </Offcanvas>
    </footer>

    
  );
}
