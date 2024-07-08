import { Modal } from "react-bootstrap";
import LoginDetail from "./LoginDetail";
// import Login from "./Login/login";

const ModalLoginDetail = ({ show, handleClose }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <button type="button" className="close" onClick={handleClose}>
            <i className="fas fa-times header_iconClose" />
          </button>
          <LoginDetail onSuccess={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalLoginDetail;
