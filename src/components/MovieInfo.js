import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./MovieInfoCss.css";
import {useLocation} from "react-router-dom";

export default function MovieInfo(props) {
    const location = useLocation();
    return (
    <div className={"bg-dark text-light p-5 movieInfoSize"}>
        <h1>NAME: {location.state.name}</h1>
        <h4>YEAR: {location.state.yearOfCreation}</h4>

        <img variant="top" src={location.state.poster}  className={"mx-auto d-block w-25 my-4"}/>
        <p>
            {location.state.description}
        </p>
    </div>
    );
}

