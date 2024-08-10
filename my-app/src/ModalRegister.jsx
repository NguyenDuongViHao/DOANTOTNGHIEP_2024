import { Modal } from "react-bootstrap";
import Register from "./Login/Register";

const ModalRegister = ({ show, handleClose }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <button type="button" className="close" onClick={handleClose}>
            <i className="fas fa-times header_iconClose" />
          </button>
          <Register onSuccess={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalRegister;
