import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import AxiosClient from "../../Axios/AxiosClient";
import { Link, useNavigate } from "react-router-dom";

const AccountAdd = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState({
        userName: "",
        password: "",
        email: "",
        fullName: "",
        status: true
    });
    const handleChange = (e) => {
        setUsers(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        AxiosClient.post(`/Users/register`,users)
            .then(() => {
                navigate("/admin/accounts");
            });
    }
    return (
        <>
            <div className="card">
                <Form className="col-md-4" onSubmit={handleSubmit}>
                    <div className="card-body">
                        <h4 class="card-title">Tạo tài khoản</h4>              

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className="text-right control-label col-form-label">Tên</Form.Label>
                            <Col sm={9}>
                                <Form.Control placeholder="UserName" type="text" name="userName" value={users.userName} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className="text-right control-label col-form-label">Mật khẩu</Form.Label>
                            <Col sm={9}>
                                <Form.Control placeholder="Password" type="password" name="password"value={users.password} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className="text-right control-label col-form-label">Email</Form.Label>
                            <Col sm={9}>
                                <Form.Control placeholder="Email" type="email" name="email" value={users.email} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className="text-right control-label col-form-label">Họ tên</Form.Label>
                            <Col sm={9}>
                                <Form.Control placeholder="FullName" type="fullName" name="fullName" value={users.fullName} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className="text-right control-label col-form-label"></Form.Label>
                            <Col sm={9}>
                                <Form.Control placeholder="status" type="hidden" name="status" value={users.status} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                    </div>
                    <div class="border-top">
                        <div className="mt-2 card-body">
                            <Button type="submit" variant="success mb-2" onClick={handleSubmit}>
                                <FontAwesomeIcon icon={faPlus} />Thêm tài khoản
                            </Button>
                            <Link to='/admin/accounts' className="btn btn-primary mb-2" style={{marginLeft:"10px"}}>Quay lại</Link> 
                        </div>
                    </div>

                </Form>
            </div>
        </>
    );
}
export default AccountAdd;