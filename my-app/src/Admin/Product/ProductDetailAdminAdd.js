import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetailAdminAdd = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [ProductDetails, setProductDetails] = useState({
        sizeId: "",
        colorId: "",
        productId: "",
        quantity: "",
        status: true
    });
   

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setProductDetails((prev) => ({ ...prev, [name]: value }));
    };

    const [Sizes, setSizes] = useState([]);
    const [Colors, setColors] = useState([]);
    const [Products, setProducts] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        AxiosClient.post(`/ProductDetails/`, ProductDetails)
            .then(() => {
                toast.success(() => (
                    <div>Thêm chi tiết sản phẩm thành công</div>), {
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
                    navigate(`/admin/Productdetails/detail/${id}`);
                  }, 2000);
            })
            .catch((error) => {
                console.error("There was an error!", error);
                toast.error("Thêm chi tiết  sản phẩm thất bại", {
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
            });
    };

    useEffect(() => {
        AxiosClient.get(`/Sizes`)
            .then((res) => {
                setSizes(res.data);
            })
            .catch((error) => {
                console.error("Error fetching sizes:", error);
            });
    }, []);

    useEffect(() => {
        AxiosClient.get(`/Colors`)
            .then((res) => {
                setColors(res.data);
            })
            .catch((error) => {
                console.error("Error fetching colors:", error);
            });
    }, []);

    useEffect(() => {
        AxiosClient.get(`/Products`)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const widthInput = {
        width: "100%",
    };

    const content = {
        display: "flex",
    };

    return (
        <>
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header" style={{ display: "flex", justifyContent: "space-between" }}>
                                <h3 className="card-title">Thêm sản phẩm</h3>
                                <Link to={`/admin/productdetails/detail/${id}`} className="btn btn-primary mb-2" style={{ marginLeft: "6rem" }}>Quay lại</Link>
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <div className="card-body" style={content}>
                                    <div style={{ width: "30%" }}>
                                        <Form.Group>
                                            <Form.Label>Tên màu:</Form.Label>
                                            <Form.Select
                                                onChange={handleChange}
                                                name="colorId"
                                                style={widthInput}
                                            >
                                                <option value="">-- Chọn --</option>
                                                {Colors.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.nameColor}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Kích thước</Form.Label>
                                            <Form.Select
                                                onChange={handleChange}
                                                name="sizeId"
                                                style={widthInput}
                                            >
                                                <option value="">-- Chọn --</option>
                                                {Sizes.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.nameSize}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Tên sản phẩm</Form.Label>
                                            <Form.Select
                                                onChange={handleChange}
                                                name="productId"
                                                style={widthInput}
                                            >
                                                <option value="">-- Chọn --</option>
                                                {Products.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Số lượng sản phẩm:</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="quantity"
                                                onChange={handleChange}
                                                style={widthInput}
                                                placeholder="Nhập số lượng"
                                                value={ProductDetails.quantity}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <Button type="submit" variant="btn btn-success" style={{ width: "13rem" }}>
                                        <FontAwesomeIcon icon={faPlus} /> Thêm chi tiết sản phẩm
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <ToastContainer/>
        </>

    );
};

export default ProductDetailAdminAdd;
