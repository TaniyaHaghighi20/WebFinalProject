import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Row} from "react-bootstrap";
import MovieInfo from "./MovieInfo";
import {FaEdit, FaTrash} from "react-icons/fa";
import axios from "axios";
import EditMovieModal from "./EditMovieModal";
import "./ItemCss.css";
import {useNavigate} from 'react-router-dom';

export default function ListItem(props){
    const navigate = useNavigate();
    function navigatePath() {
        navigate('/movie',{state:props.movie})
    }


    const [editModalShow, setEditModalShow] = useState(false);
    const toggleEditModal = () => {
        setEditModalShow(!editModalShow);
    };
    const handleEdit= (e) => {
        e.stopPropagation();
        toggleEditModal();

    }


    function handleDelete(e) {
        e.stopPropagation();
        axios.delete(`http://localhost:8000/src/index.php/${props.movie.id}`)
            .then(res => {
            props.reload();

            })

    }

    return(
       <>
           <div className={"bg-dark listItem text-light"} onClick={navigatePath}>
               <Container>
                   <Row className={"d-flex align-items-center justify-content-center list-row"}>
                       <Col >
                           <img src={props.movie.poster} alt="poster" className={"py-2  w-25"}  />
                       </Col>
                       <Col>
                           <div className={"py-2 "}>{props.movie.name}</div>
                       </Col>
                       <Col>
                           <div className={"py-2 "}>{props.movie.yearOfCreation}</div>
                       </Col>
                       <Col>
                           <Button className={"bg-dark border-0 iconbtn"} onClick={handleEdit}> <FaEdit /> </Button>
                           <Button className={"bg-dark border-0 iconbtn"} onClick={handleDelete}> <FaTrash/> </Button>
                       </Col>
                   </Row>
                   <hr />
               </Container>
           </div>
           <EditMovieModal
               show={editModalShow}
               onHide={toggleEditModal}
               name={props.movie.name}
               year={props.movie.yearOfCreation}
               desc={props.movie.description}
               poster={props.movie.poster}
               id={props.movie.id}
               reload={props.reload}
           />
       </>
    )
}