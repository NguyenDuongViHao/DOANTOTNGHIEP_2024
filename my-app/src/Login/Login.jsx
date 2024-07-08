import { useEffect, useState } from "react";
import AxiosClient from "../Axios/AxiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import "../Login/Login.css";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
// import ModalRegister from "../User/ModalRegister";

const Login = ({ onSuccess }) => {
  const [account, setAccount] = useState({});
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [userRoles, setUserRoles] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const validRoles = ['Admin', 'User']
  const navigate = useNavigate();
  const handleChange = (e) => {
    setAccount(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!account.username || !account.password) {
      setErrors({
        general: 'Please enter username and password.',
      });
      return;
    }

    try {
      const response = await AxiosClient.post('/Users/login', account);
      console.log('Response from server:', response.data);
      const { token, userRoles, userId } = response.data;
      localStorage.setItem('jwt', token);
      localStorage.setItem('userRoles', userRoles);
      localStorage.setItem('userId', userId);

      setUserRoles(userRoles);
      setLoginSuccess(true);
      onSuccess();

      // if (token) {
      // localStorage.setItem('jwt', token);
      // setUserRoles(response.data.userRoles)
      // setLoginSuccess(true);
      // onSuccess();
      //window.location.reload()
      // } else {
      //   setErrors({
      //     general: 'Invalid username or password.',
      //   });
      // }

    } catch (error) {
      console.error('Error during login:', error);

      if (error.response && error.response.status === 401) {
        setErrors({
          general: 'Incorrect username or password. Please try again.',
        });
      } else {
        setErrors({
          general: 'An error occurred during login.',
        });
      }
    }
  };

  // if (loginSuccess) {
  //   const areRolesValid = userRoles.every(role => validRoles.includes(role));
  //   if (areRolesValid) {
  //     if (userRoles.includes('Admin')) {
  //       navigate('/admin')
  //     }
  //     if (userRoles.includes('User')) {
  //       navigate('/')
  //     }
  //   } else {
  //     navigate('/unauthorized')
  //   }
  // }

  if (loginSuccess) {
    const areRolesValid = userRoles.every(role => validRoles.includes(role));
    if (areRolesValid) {
      if (userRoles.includes('Admin')) {
        navigate('/admin')
      }
      else {
        navigate('/')
        window.location.reload()
      }
    }
  }

  return (
    <>
      <Row className='d-flex justify-content-center align-items-center h-100 login'>
        <Col col='12'>
          <Card.Body className='p-5 w-100 d-flex flex-column'>
            <h2 className="text-center fw-bold mb-5">Sign in</h2>

            <Form.Group className='mb-4 w-100'>
              <Form.Control
                placeholder='User name'
                type='username'
                size="lg"
                onChange={handleChange}
                name="username"
              />
            </Form.Group>

            <Form.Group className='mb-4 w-100'>
              <Form.Control
                placeholder='Password'
                type='password'
                size="lg"
                onChange={handleChange}
                name="password"
              />
            </Form.Group>

            {errors.general && <div className="text-danger mb-3">{errors.general}</div>}
            <Row style={{alignItems: 'center'}}>
              <Col md={7}>
                <Form.Check
                  type='checkbox'
                  id='flexCheckDefault'
                  label='Remember password'
                />
              </Col>
              <Col md={5}>
                <Link>
                  Forgot password?
                </Link>
              </Col>
            </Row>
            <Button size='lg' onClick={handleSubmit}>
              Login
            </Button>
            <div className="text-center mt-3">
              <p>Not a member? <Link onClick={() => setShow(true)}>Register</Link></p>
              <p>Or sign up with: </p>
            </div>
            <Button className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }}>
              <FontAwesomeIcon icon={faGoogle} className="mx-2" />
              Sign in with Google
            </Button>
          </Card.Body>
        </Col>
      </Row>

      {/* <ModalRegister show={show}
        onHide={() => setShow(false)} /> */}
    </>
  );
}

export default Login