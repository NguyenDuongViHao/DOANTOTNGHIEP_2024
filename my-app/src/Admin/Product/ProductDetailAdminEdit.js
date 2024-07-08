import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form } from "react-bootstrap";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";

const ProductDetailAdminEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Lấy đường dẫn của trang trước đó từ localStorage
    function getPreviousPageUrl() {
        return localStorage.getItem('previousPageUrl') || '';
    }
    // Sử dụng hàm lấy đường dẫn của trang trước đó khi cần
    const previousPageUrl = getPreviousPageUrl();

    const urlObj = new URL(previousPageUrl);
        // Lấy đường dẫn từ URL (pathname)
    const pathname = urlObj.pathname;

    // Tách các phần của đường dẫn bằng dấu '/'
    const pathSegments = pathname.split('/');

    // Lấy phần tử cuối cùng từ các phần của đường dẫn
    const idOfProductDetail = pathSegments[pathSegments.length - 1];

    console.log(idOfProductDetail, "idd"); 
    console.log('Previous page URL:', previousPageUrl);
    
    const [ProductDetails, setProductDetails] = useState({
        size:{},
        color:{},
        product:{},
    });
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setProductDetails((prev) => ({ ...prev, [name]: value }));
    };
    const [Sizes, setSizes] = useState([])
    const [Colors,setColors] = useState([])
    const [Product, setProduct] = useState([])
    const handleSubmit = (e) => {
        e.preventDefault();
        AxiosClient.put(`/ProductDetails/${id}`, ProductDetails)
            .then(() => {
                toast.success(() => (
                    <div>Sửa chi tiết sản phẩm thành công</div>), {
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
                    navigate(`/admin/Productdetails/detail/${idOfProductDetail}`);
                  }, 2000);
                
            })
            .catch((error) => {
                toast.error(() => (
                    <div>Sửa chi tiết sản phẩm thất bại</div>), {
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
                console.error("There was an error!", error);
            });
    };
    useEffect(() => {
        AxiosClient.get(`/Sizes`)
            .then((res) => {
                setSizes(res.data);
            })
    }, [])
    useEffect(() => {
        AxiosClient.get(`/Colors`)
            .then((res) => {
                setColors(res.data);
            })
    }, [])
    useEffect(() => {
        AxiosClient.get(`/Products`)
            .then((res) => {
                setProduct(res.data);
            })
    }, [])
    useEffect(() => {
        AxiosClient.get(`/ProductDetails/${id}`)
            .then((res) => {
                setProductDetails(res.data);
            })
    }, [])

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
                                <h3 className="card-title">Sửa Sản Phẩm</h3>
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <div className="card-body" style={content}>
                                    <div style={{ width: "30%" }}>
                                        <Form.Group>
                                        <Form.Group>
                                                <Form.Label>Tên màu:</Form.Label>
                                                <Form.Select
                                                    onChange={handleChange}
                                                    name="colorId"
                                                    style={widthInput}
                                                    // value={ProductDetails.color.nameColor || ''}
                                                >
                                                    <option value={ProductDetails.colorId}>{ProductDetails.color.nameColor}</option>
                                                    {Colors.map((item) => {
                                                        return <option value={item.id}>{item.nameColor }</option>;
                                                    })}
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Kích thước</Form.Label>
                                                <Form.Select
                                                    onChange={handleChange}
                                                    name="sizeId"
                                                    style={widthInput}
                                                    // value={ProductDetails.size.nameSize || ''}
                                                >
                                                    <option value={ProductDetails.sizeId}>{ProductDetails.size.nameSize}</option>
                                                    {Sizes.map((item) => {
                                                        return <option value={item.id}>{item.nameSize}</option>;
                                                    })}
                                                </Form.Select>
                                            </Form.Group>

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
                                    <Button type="submit" variant="btn btn-success" style={{ width: "10rem" }}>
                                        <FontAwesomeIcon icon={faEdit} /> Sửa sản phẩm
                                    </Button>
                                    <Link to={`/admin/productdetails/detail/${idOfProductDetail}`} className="btn btn-primary" style={{ marginLeft: "10px" }}>Quay lại</Link>
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

export default ProductDetailAdminEdit;
