import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import List from "./List";
import Grid from "./Grid";

export default function MoviesContainer(props) {
    const isList = props.list;

    if (isList) {
        return <List movies={props.movies} reload={props.reload}/>;
    }
    return <Grid movies={props.movies} reload={props.reload}/>;
}

