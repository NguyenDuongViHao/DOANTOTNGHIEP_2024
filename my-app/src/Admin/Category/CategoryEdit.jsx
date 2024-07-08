import { Link, useNavigate, useParams } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
const CategoryEdit = () => {
    const { id } = useParams();

    const [category, setCategory] = useState({
        name: "",
        status: 1
    });

    const navigate = useNavigate();

    useEffect(() => {
        AxiosClient.get(`/Categories/${id}`)
            .then(response => {
                setCategory(response.data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, [id]);

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        AxiosClient.put(`/Categories/${id}`, category)
            .then(() => {
                toast.success(() => (
                    <div>Sửa loại sản phẩm thành công</div>), {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    closeButton: false,
                    className: "custom-toast",
                    toastId: 'custom-toast'
                });
                setTimeout(() => {
                    navigate(`/admin/categories`);
                }, 2000);
                
            })
            .catch(error => {
                toast.error(() => (
                    <div>Sửa loại sản phẩm thất bại</div>), {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    closeButton: false,
                    className: "custom-toast",
                    toastId: 'custom-toast-error'
                });
                console.error("Error:", error);
            });
    }

    return ( 
        <>
            <div className="card">
                <Form className="col-md-4" onSubmit={handleSubmit}>
                    <div className="card-body">
                        <h4 class="card-title">Thông tin loại sản phẩm</h4>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className="text-right control-label col-form-label">Tên</Form.Label>
                            <Col sm={9}>
                                <Form.Control placeholder="Name" type="text" name="name" onChange={handleChange} value={category.name} />
                            </Col>
                        </Form.Group>
                    </div>
                    <div class="border-top">
                        <div className="mt-2 card-body">
                            <Button type="submit" variant="success mb-2" onClick={handleSubmit}>
                                <FontAwesomeIcon icon={faEdit} />Sửa loại sản phẩm
                            </Button>
                            <Link to='/admin/categories' className="btn btn-primary mb-2" style={{marginLeft:"10px"}}>Quay lại</Link> 
                        </div>
                    </div>

                </Form>
            </div>
            <ToastContainer/>
        </>
     );
}
 
export default CategoryEdit;