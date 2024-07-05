import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";

const ProductAdd = () => {
  const [Products, setProducts] = useState({
    category: {},
    status: true
  });
  const Navigate = useNavigate();
  const [Categories, setCategories] = useState([]);
  const[ProductDetails, setProductDetails] = useState([]);
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setProducts((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheck = (e) => {
    let name = e.target.name;
    let checked = e.target.checked;
    setProducts((prev) => ({ ...prev, [name]: checked }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Product:", Products); // Log Products state before submitting
    AxiosClient.post(`/Products`, Products)
      .then(() => {
        Navigate("/admin/products");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  useEffect(() => {
    AxiosClient.get(`/Categories`)
      .then((res) => {
        setCategories(res.data);
        console.log(res.data);
      })
  }, []);
  useEffect(() => {
    AxiosClient.get(`/ProductDetails`)
      .then((res) => {
        setProductDetails(res.data);
        console.log(res.data);
      })
  }, []);

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
                  <h3 className="card-title">Thêm Sản Phẩm</h3>
                  <Link to='/admin/products' className="btn btn-primary mb-2" style={{ marginLeft: "6rem" }}>Quay lại</Link>
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
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Số lượng:</Form.Label>
                        <Form.Control
                          type="number"
                          name="quantity"
                          onChange={handleChange}
                          style={widthInput}
                          placeholder="Nhập số lượng"
                          value={ProductDetails.quantity}

                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Loại sản phẩm</Form.Label>
                        <Form.Select
                          onChange={handleChange}
                          name="categoryId"
                          style={widthInput}
                        >
                          <option value={Products.categoryId}>-- Chọn --</option>
                          {Categories.map((item) => {
                            return <option value={item.id}>{item.name}</option>;
                          })}
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
                      <Form.Group>
                        <Form.Label>Thương hiệu:</Form.Label>
                        <Form.Control
                          type="text"
                          name="brand"
                          onChange={handleChange}
                          style={widthInput}
                          placeholder="Nhập tên thương hiệu"
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
                  <div className="card-footer">
                    <Button type="submit" variant="btn btn-success" style={{ width: "10rem" }}>
                      <FontAwesomeIcon icon={faPlus} />Thêm sản phẩm
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default ProductAdd;