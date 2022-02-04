import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import Form from "./Form";
import './FormCss.css';
import {FaSearch} from "react-icons/fa";
import axios from "axios";
import FoundItem from "./FoundItem";

export default function Header(){
    const [list,setList] = useState(true);
    const [grid,setGrid] = useState(false);
    const [search,setSearch] = useState("");
    const [movies, setMovies] = useState([]);

    const searchMovie= async (e)=>{
        e.preventDefault();

        const res=await axios.get("http://localhost:8000/src/index.php?search="+search)
          .then(res => {
              setMovies(res.data.phpResult);
              setSearch("");
        }).catch(err => {
            alert("server is not accessible");
        })
    }

    const [modalShow, setModalShow] = useState(false);
    const toggleModal = () => {
        setModalShow(!modalShow)
    };

    function handleChange(e){
        setSearch(e.target.value);
    }

    function showList() {
        setList(true);
        setGrid(false);
    }

    function showGrid() {
        setGrid(true);
        setList(false);
    }

    return(
           <>
               <Navbar bg="dark" variant="dark">
                   <Container>
                       <Navbar.Brand href="#home">MOVIE</Navbar.Brand>
                       <Nav className="me-auto">
                           <Nav.Link onClick={showGrid}>GRID</Nav.Link>
                           <Nav.Link onClick={showList}>LIST</Nav.Link>
                           <form className={"position-absolute end-0"} onSubmit={searchMovie}>
                               <input type="text" placeholder={"name or year of movie"} value={search} name={"search"} className={"p-1 me-2 search"} onChange={handleChange}/>
                               <button type="submit" className={"p-1 bg-light searchBtn"}  onClick={toggleModal}>Search <FaSearch /></button>
                           </form>
                       </Nav>
                   </Container>
               </Navbar>
               <FoundItem
                   movies={movies}
                   show={modalShow}
                   onHide={toggleModal}
               />
               <Form
                   list={list}
                   grid={grid}
               />
           </>
    )
}