import { Modal } from "react-bootstrap";
import Login from "./Login/Login";
// import Login from "./Login/login";


const ModalLogin = ({ show, handleClose }) => {

    return ( 
        <>
                <Modal show={show} onHide={handleClose} >
                    <Modal.Body>
                        <button type="button" className="close" onClick={handleClose}>
                            <i className="fas fa-times header_iconClose" />
                        </button>
                    <Login onSuccess={handleClose}  />
                    </Modal.Body>
                </Modal>
        </>
     );
}
 
export default ModalLogin;