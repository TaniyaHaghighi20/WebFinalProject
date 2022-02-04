import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col,  Modal, Row} from "react-bootstrap";
import axios from "axios";
import "./EditModalCss.css";


export default function EditMovieModal(props) {
    const [mname,setmname]=useState(props.name);
    const [myear,setmyear]=useState(props.year);
    const [mdesc,setmdesc]=useState(props.desc);
    const [mposter,setmposter]=useState(props.poster);
    function handleChangeName(e){
        setmname(e.target.value);
    }
    function handleChangeDesc(e){
        setmdesc(e.target.value);
    }
    function handleChangeYear(e){
        setmyear(e.target.value);
    }
    function handleChangePoster(e){
        setmposter(e.target.value);
    }
    const [warning,setWarning] = useState("");
    const updateMovie= async ()=>{

        let movie={editId:props.id,editName:mname,editYear:myear,editDesc:mdesc,editPoster:mposter};
         await axios.put('http://localhost:8000/src/index.php', {movie})
            .then(res => {
                props.reload();
                setWarning("");
                props.onHide();
            })
            .catch(err => {
                setWarning("WARNING: movie was not updated because" +
                    " description and/or poster is too long or entered year is not a number");
            })
    }

    function handleHide() {
        props.onHide();
        setWarning("");
        setmdesc(props.desc);
        setmname(props.name);
        setmyear(props.year);
        setmposter(props.poster);
    }


    return (
        <Modal
            {...props}
            size="lg"

            centered className={"modal-bg"}
        >
            <Modal.Header  className={" bg-dark text-light"}>
                <Modal.Title id="contained-modal-title">
                   EDIT MOVIE
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form >
                    <Row>
                        <Col >
                            <label htmlFor="editName" className={"label"}> movie name:</label><br/>
                            <input type="text" placeholder={props.name} name={"editName"} value={mname} className={"p-1  input "} required={true} onChange={handleChangeName}/><br/>
                            <label htmlFor="editYear" className={"label"}> movie year:</label><br/>
                            <input type="text" placeholder={props.year} name={"editYear"} value={myear} className={"p-1  input"} required={true} onChange={handleChangeYear}/><br/>
                            <label htmlFor="editPoster" className={"label"}> movie poster:</label><br/>
                            <input type="text" placeholder={props.poster} name={"editPoster"} value={mposter} className={"p-1  input"} required={true} onChange={handleChangePoster}/><br/>
                        </Col>
                        <Col>

                            <label htmlFor="editDesc" className={"label"}> movie description:</label><br/>
                            <textarea name="editDesc" placeholder={props.desc} value={mdesc} id="desc" cols="60" rows="6"  className={"p-1  input"} required={true} onChange={handleChangeDesc}/>
                            <button type="button" className={"px-5 py-2 bg-dark text-light submitBtn"} onClick={updateMovie}>Edit</button>
                        </Col>
                        <p>{warning}</p>
                    </Row>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleHide} className={"modal-btn bg-dark text-light submitBtn"}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

