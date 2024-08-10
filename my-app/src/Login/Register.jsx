import { useState, React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import AxiosClient from "../Axios/AxiosClient";
import { useNavigate } from "react-router-dom";
//import Header from '../User/Header';
//import ModalLogin from '../User/ModalLogin';
import "../Login/Login.css";
import { toast, ToastContainer } from "react-toastify";
import Login from "./Login";
import ModalLogin from "../ModalLogin";
import ModalRegister from "../ModalRegister";

const Register = ({ onSuccess }) => {
  const [account, setAccount] = useState({
    userName: "",
    email: "",
    passWord: "",
  });
  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    passWord: "",
  });
  const navigate = useNavigate();
  const [LoginShow, setLoginShow] = useState(false);
  const handleChange = (e) => {
    setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const userNamePattern = /^[a-zA-Z0-9]+$/;

    let valid = true;
    const newErrors = { userName: "", email: "", passWord: "" };

    if (!emailPattern.test(account.email)) {
      newErrors.email = "Email phải thuộc miền @gmail.com!";
      valid = false;
    }
    if (!passwordPattern.test(account.passWord)) {
      newErrors.passWord =
        "Chữ cái viết hoa, có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt!";
      valid = false;
    }
    if (!userNamePattern.test(account.userName)) {
      newErrors.userName = "Tên tài khoản không được chứa ký tự đặc biệt!";
      valid = false;
    }

    setErrors(newErrors);
    if (valid) {
      try {
        await AxiosClient.post("/Users/register", account);
        toast.success("Đăng ký thành công!")
       onSuccess()
       
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  return (
    <>
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col col="12">
          <Card.Body className="p-5 w-100 d-flex flex-column">
            <Form>
              <h2 className="text-center fw-bold mb-5">Đăng ký</h2>
              <Form.Group className="mb-4 w-100">
                <Form.Label>Tên tài khoản</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  name="userName"
                  onChange={handleChange}
                  value={account.userName}
                />
                {errors.userName && (
                  <div style={{ color: "red" }}>{errors.userName}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-4 w-100">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  size="lg"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={account.email}
                />
                {errors.email && (
                  <div style={{ color: "red" }}>{errors.email}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-4 w-100">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  size="lg"
                  type="password"
                  name="passWord"
                  onChange={handleChange}
                  value={account.passWord}
                />
                {errors.passWord && (
                  <div style={{ color: "red" }}>{errors.passWord}</div>
                )}
              </Form.Group>
              <Button
                className="mb-4 w-100 gradient-custom-4"
                size="lg"
                type="submit"
                onClick={handleSubmit}
              >
                Đăng ký
              </Button>
            </Form>
          </Card.Body>
        </Col>
      </Row>
      <ToastContainer />

      {/* {LoginShow 
      ? <>
       <ModalLogin show={LoginShow}/>
       
       <ModalRegister show={false}/></>
       : null} */}

    </>
  );
};

export default Register;
