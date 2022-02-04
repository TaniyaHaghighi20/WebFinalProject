import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal} from "react-bootstrap";
import FoundMovies from "./FoundMovies";
import "./EditModalCss.css";


export default function FoundItem(props){
    return(
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered className={"modal-bg"}
            >
                <Modal.Header closeButton className={"bg-dark text-light"}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        MOVIES FOUND
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FoundMovies   movies={props.movies}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                         onClick={props.onHide}
                        className={"modal-btn submitBtn bg-dark text-light"}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}