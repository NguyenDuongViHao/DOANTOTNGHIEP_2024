import { useState, React } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import AxiosClient from '../Axios/AxiosClient';
import { useNavigate } from 'react-router-dom';
//import Header from '../User/Header';
//import ModalLogin from '../User/ModalLogin';
import "../Login/Login.css";


const Register = ({ onSuccess }) => {
    const [account, setAccount] = useState({
        userName: "",
        email: "",
        passWord: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setAccount(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AxiosClient.post('/Users/register', account);
            onSuccess();
            navigate('/login');
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <>

        <Row className='d-flex justify-content-center align-items-center h-100'>
            <Col col='12'>
                <Card.Body className='p-5 w-100 d-flex flex-column'>
                    <h2 className="text-center fw-bold mb-5">Register</h2>
                    <Form.Group className='mb-4 w-100'>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control size='lg' type='text' name="userName" onChange={handleChange} value={account.userName} />
                    </Form.Group>

                    <Form.Group className='mb-4 w-100'>
                        <Form.Label>Your Email</Form.Label>
                        <Form.Control size='lg' type='email' name="email" onChange={handleChange} value={account.email} />
                    </Form.Group>

                    <Form.Group className='mb-4 w-100'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control size='lg' type='password' name="passWord" onChange={handleChange} value={account.passWord} />
                    </Form.Group>
                    <Button className='mb-4 w-100 gradient-custom-4' size="lg" type='submit' onClick={handleSubmit}>Register</Button>
                </Card.Body>
            </Col>
        </Row>

        </>

    )
}

export default Register