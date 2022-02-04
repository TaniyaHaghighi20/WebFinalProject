import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row} from "react-bootstrap";
import ListItem from "./ListItem";

export default function List(props){
    return(
        <div className={"bg-dark text-light"}>
            <Container>
                <h4 className={"pt-3"}>List of movies</h4>
                <hr/>

                <hr/>

                <hr/>
                {props.movies.map((movie, index) =>
                    <Row key={movie.id}>
                    <ListItem movie={movie}  reload={props.reload}/>
                    </Row>
                )}
            </Container>
        </div>
    )
}