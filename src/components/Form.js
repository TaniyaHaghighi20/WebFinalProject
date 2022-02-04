import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormCss.css';
import {Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import MoviesContainer from "./MoviesContainer";

export default function Form(props){

    const [movies, setMovies] = useState([]);
    const [warning,setWarning] = useState("");

    const loadMovies= async ()=>{
        const res=await axios.get("http://localhost:8000/src/index.php");
        setMovies(res.data.phpResult);
    }

    useEffect(() => {
        loadMovies();
    }, []);


    const [movieName,setmovieName]=useState("");
    const [movieYear,setmovieYear]=useState("");
    const [movieDesc,setmovieDesc]=useState("");
    const [moviePoster,setmoviePoster]=useState("");
    function handleChangeName(e){
        setmovieName(e.target.value);
    }
    function handleChangeDesc(e){
        setmovieDesc(e.target.value);
    }
    function handleChangeYear(e){
        setmovieYear(e.target.value);
    }
    function handleChangePoster(e){
        setmoviePoster(e.target.value);
    }
    // const [movie,setMovie] = useState({name:"name",yearOfCreation:"0",description:"desc",poster:"poster"});
    // function handleChange(e){
    //     setMovie({...movie,[e.target.name]:e.target.value});
    // }


    const AddMovie= async (e)=>{
        e.preventDefault();
       let movie={name:movieName,year:movieYear,desc:movieDesc,poster:moviePoster};
        await axios.post("http://localhost:8000/src/index.php", {
            movie
        })
        .then(res => {
            loadMovies();
            setWarning("");
            resetFields();
        }).catch(err => {
                setWarning("WARNING: movie was not added because" +
                   " description and/or poster is too long or entered year is not a number");
        })
    }
    function resetFields(){
        setmovieDesc("");
        setmovieName("");
        setmoviePoster("");
        setmovieYear("");
    }


    return(
            <>
                <form className={"black text-light"} onSubmit={AddMovie} >
                    <Container>
                        <h6 className={"py-1"}>Add new Movie</h6>

                        <Row>
                            <Col >
                                <label htmlFor="name" className={"label"}> movie name:</label><br/>
                                <input type="text" placeholder={"name "} name={"name"} value={movieName} className={"p-1  input "} required={true} onChange={handleChangeName}/><br/>
                                <label htmlFor="year" className={"label"}> movie year(number):</label><br/>
                                <input type="text" placeholder={"year "}  name={"year"} value={movieYear} className={"p-1  input"} required={true} onChange={handleChangeYear}/><br/>
                                <label htmlFor="poster" className={"label"}> movie poster:</label><br/>
                                <input type="text" placeholder={"poster "}  name={"poster"} value={moviePoster} className={"p-1  input"} required={true} onChange={handleChangePoster}/><br/>
                            </Col>
                            <Col>
                                <label htmlFor="desc" className={"label"}> movie description:</label><br/>
                                <textarea name="desc" id="desc" placeholder={"description"}  value={movieDesc} cols="60" rows="6"  className={"p-1  input"} required={true} onChange={handleChangeDesc}/>

                                <button type="submit" className={"px-5 py-2 bg-dark text-light submitBtn"} >Add</button>
                            </Col>
                            <p>{warning}</p>
                        </Row>
                    </Container>
                </form>
                <MoviesContainer
                    list={props.list}
                    grid={props.grid}
                    movies = {movies}
                    reload={loadMovies}
                />
            </>
    )
}