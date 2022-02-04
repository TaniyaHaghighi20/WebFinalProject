import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row} from "react-bootstrap";
import GridItem from "./GridItem";

export default function Grid(props){
    const elements = props.movies.map((movie, index) =>{
        return(<div className={"py-3 d-flex justify-content-around col-md-3"}  key={movie.id}>  <GridItem movie={movie}  reload={props.reload}/> </div>);
    })
    return(
        <Container fluid={true} className={"bg-dark text-light"}>
            <h4 className={"pt-3"}>List of movies</h4>
            <hr/>

            <hr/>

            <hr/>
            <Row >
                {elements}
            </Row>
        </Container>

    )

}