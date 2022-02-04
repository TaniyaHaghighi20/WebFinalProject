import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card} from "react-bootstrap";
import MovieInfo from "./MovieInfo";
import {FaEdit, FaTrash} from "react-icons/fa";
import axios from "axios";
import "./ItemCss.css";
import {useNavigate} from "react-router-dom";
import EditMovieModal from "./EditMovieModal";

export default function GridItem(props){
    function handleDelete(e) {
        e.stopPropagation();
        axios.delete(`http://localhost:8000/src/index.php/${props.movie.id}`)
            .then(res => {
                props.reload();
            })
    }

    const [editModalShow, setEditModalShow] = useState(false);
    const toggleEditModal = () => {
        setEditModalShow(!editModalShow);
        // console.log("edit:"+editModalShow)
    };
    const handleEdit= (e) => {
        e.stopPropagation();
        toggleEditModal();

    }

    const navigate = useNavigate();
    function navigatePath() {
        navigate('/movie',{state:props.movie})
    }

    return(
        <>
            <Card style={{ width: '14rem' }} className={"bg-dark text-light border-light"} onClick={navigatePath}>
                <div className={"img-size d-flex align-items-center justify-content-center"}>
                    <Card.Img variant="top" src={props.movie.poster}  className={"mx-auto d-block w-100"}/>
                </div>

                <Card.Body >
                    <Card.Title >{props.movie.name}</Card.Title>
                    <Card.Text>
                        {props.movie.yearOfCreation}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button className={"bg-dark border-0 iconbtn"} onClick={handleEdit}> <FaEdit /> </Button>
                    <Button className={"bg-dark border-0 iconbtn"} onClick={handleDelete}> <FaTrash/> </Button>
                </Card.Footer>
            </Card>
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