import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row} from "react-bootstrap";


export default function FoundMovies(props){
    if (!props.movies.length){
        return (<h5>no matches found</h5>)
    }
    return(
        <>
                    {props.movies.map((movie, index) =>
                        <Row key={movie.id}>
                            <Card className={" p-3 border-dark"}>
                                <Card.Img variant="top" src={movie.poster}  className={"mx-auto d-block w-50"}/>
                                <Card.Body>
                                    <Card.Title>{movie.name}</Card.Title>
                                    <Card.Text>
                                        {movie.yearOfCreation}
                                        <br/>
                                        {movie.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                    )}
        </>
    )
}