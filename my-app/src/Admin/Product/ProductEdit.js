import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
import { toast, ToastContainer } from "react-toastify";

const ProductEdit = () => {
    const {id} = useParams();
    const [Products, setProducts] = useState({
        price:0,
        category:{},
        status: true
    });
    const Navigate = useNavigate();
    const [Categories, setCategories] = useState([]);
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setProducts((prev) => ({ ...prev, [name]: value }));
        
    };
    const handleSubmit = (e) => {
            e.preventDefault();
            console.log("Submitting Product:", Products); // Log Products state before submitting
            AxiosClient.put(`/Products/${id}`, Products)
              .then(() => {
                toast.success(() => (
                    <div>Sửa sản phẩm thành công</div>), {
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
                    Navigate("/admin/products");
                  }, 2000);
               
              })
              .catch((error) => {
                toast.error(() => (
                    <div>Sửa sản phẩm thất bại</div>), {
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
        useEffect(()=>{
            AxiosClient.get(`/Products/${id}`)
                .then((res)=>{
                    setProducts(res.data);
                    console.log(res.data);
                });
        },[]);
        useEffect(() => {
            AxiosClient.get(`/Categories`)
              .then((res) => {
                setCategories(res.data);
                console.log(res.data);
              })
          },[]);
        
        var widthInput = {
            width: "100%",
        };

        var content = {
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
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <Form onSubmit={handleSubmit}>
                                        <div className="card-body" style={content}>
                                            <div style={{ width: "30%" }}>
                                                <Form.Group>
                                                    <Form.Label>Tên sản phẩm:</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="name"
                                                        onChange={handleChange}
                                                        style={widthInput}
                                                        placeholder="Nhập tên sản phẩm"
                                                        value={Products?.name || ""}
                                                    />
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Label>Giá sản phẩm:</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        name="price"
                                                        onChange={handleChange}
                                                        style={widthInput}
                                                        placeholder="Nhập giá"
                                                        value={Products?.price || ""}
                                                    />
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Label>Loại sản phẩm</Form.Label>
                                                    <Form.Select
                                                        onChange={handleChange}
                                                        name="categoryId"
                                                        style={widthInput}
                                                        value={Products.categoryId}
                                                    >
                                                        <option value="">{Products.category.name}</option>
                                                        {Categories.map((item) => {
                                                            return <option value={item.id}>{item.name}</option>;
                                                        })}
                                                    </Form.Select>
                                                </Form.Group>
                                                
                                                <Form.Group>
                                                    <Form.Label>Thương hiệu:</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="brand"
                                                        onChange={handleChange}
                                                        style={widthInput}
                                                        placeholder="Nhập tên thương hiệu"
                                                        value={Products?.brand || ""}
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Nguồn gốc sản phẩm:</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="origin"
                                                        onChange={handleChange}
                                                        style={widthInput}
                                                        placeholder="Nhập tên nguồn gốc"
                                                        value={Products?.origin||""}
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Mô tả:</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={4}
                                                        name="description"
                                                        onChange={handleChange}
                                                        style={widthInput}
                                                        placeholder="Mô tả"
                                                        value={Products?.description||""}
                                                    />
                                                </Form.Group>
                                            </div>
                                            {/* <div style={{ width: "70%" }}>          
                      <div style={{ width: "60%", margin:"0 auto", paddingTop:"7rem" }}>
                        <img style={{width:"60%"}}
                        src="https://localhost:7106/Images/TrenDuongBang.png"
                        
                      /></div>
                    </div> */}
                                        </div>
                                        {/* /.card-body */}
                                        <div className="card-footer" style={{display: "flex", gap: "10px"}}>
                                            <Button type="submit" variant="btn btn-success" style={{ width: "10rem" }}>
                                                <FontAwesomeIcon icon={faEdit} />Sửa sản phẩm
                                            </Button>
                                            <Link to='/admin/products' className="btn btn-primary">Quay lại</Link>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <ToastContainer/>
            </>
        )
    }
export default ProductEdit;