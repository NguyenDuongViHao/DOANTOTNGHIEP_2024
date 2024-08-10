import { useEffect, useState } from "react";
import "./ProductList.css";
import AxiosClient from "../../Axios/AxiosClient";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faEllipsisVertical,
  faInfoCircle,
  faPlus,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Modal, Pagination, Row } from "react-bootstrap";
import { SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Swiper from "swiper";
const ProductList = () => {
  var id = 0;
  const [Products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState({ price: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [showSubnmit, setshowSubnmit] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedProducts(Products.find((u) => u.id == id));
    AxiosClient.get(`/Products/productDetail/${id}`)
      .then((res) => {
        setProductDetail([res.data]);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
    setShow(true);
    setshowSubnmit(true);
  };

  const [ProductDetail, setProductDetail] = useState([]);
  const [MainImageUrl, setMainImageUrl] = useState("");

  const handleButtonClick = () => {
    navigate("/admin/products/add");
  };
  const fetchProducts = () => {
    AxiosClient.get("/Products/listProductAdmin")
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };
  const handleDelete = () => {
    AxiosClient.delete(`/Products/${selectedProducts.id}`);
    let list = Products;
    list.splice(
      Products.findIndex((a) => a.id === selectedProducts.id),
      1
    );
    setProducts(list);
    setShowDelete(false);
  };
  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete = (id) => {
    setSelectedProducts(Products.find((a) => a.id === id));
    setShowDelete(true);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      AxiosClient.get(`/Products/searchProduct?name=${searchTerm}`)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      fetchProducts();
    }
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const splitDesc = (desc) => {
    const newDesc = desc.split("-").filter((item) => item);
    return newDesc;
  };

  const handleClickImage = (url) => {
    setMainImageUrl(url);
  };

  useEffect(() => {
    if (showSubnmit) {
      setMainImageUrl(
        `https://localhost:7073/Images/${ProductDetail[0].images[0].fileName}`
      );
    }
    setshowSubnmit(false);
  }, [ProductDetail]);

  return (
    <div className="container productadmin">
      <div className="header productadmin">
        <h2>Danh sách sản phẩm</h2>
        <div>
          <button onClick={handleButtonClick}>
            <span style={{ marginRight: "5px" }}>
              <FontAwesomeIcon icon={faPlus} />
            </span>
            Tạo sản phẩm
          </button>
        </div>
      </div>
      <div className="filter-search">
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={searchTerm}
          onChange={handleSearchChange} // Update searchTerm as user types
        />
      </div>
      <div className="product-section">
        <h3>Tất cả sản phẩm</h3>
        <table>
          <thead style={{ verticalAlign: "baseline" }}>
            <tr>
              <th>STT</th>
              <th style={{ width: "15%" }}>Tên sản phẩm</th>
              <th style={{ width: "15%" }}>Hình ảnh</th>
              <th>Mô tả sản phẩm</th>
              <th style={{ width: "10%" }}>Giá bán</th>
              <th>Ngày tạo sản phẩm</th>
              <th>Nguồn gốc</th>
              <th>Thương hiệu</th>
              <th style={{ width: "15%" }}>Chức năng</th>
            </tr>
          </thead>
          <tbody style={{ verticalAlign: "baseline" }}>
            {Products.map((item) => {
              return (
                <tr key={item.id}>
                  {/* <td className="product-name">
                //     <img src="https://via.placeholder.com/50" alt="Product Image" />
                //     Thanh Selenite Thô - Raw Selenite Bar
                //     <br />2 biến thể
                //   </td> */}
                  <td>{(id += 1)}</td>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={`https://localhost:7073/Images/${item.imageName}`}
                    />
                  </td>

                  <td>
                    {splitDesc(item.description).map((item, index) => (
                      <p key={index}>- {item}</p>
                    ))}
                  </td>
                  <td>
                    {item.price.toLocaleString("en-US").replace(/,/g, ".")} ₫
                  </td>
                  <td>{item.createTime}</td>
                  <td>{item.brand}</td>
                  <td>{item.origin}</td>

                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleShow(item.id)}
                      className="m-2"
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </Button>
                    <Link
                      to={`edit/${item.id}`}
                      className="btn btn-secondary m-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => handleShowDelete(item.id)}
                      className="m-2"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Link
                      to={`/admin/productdetails/detail/${item.id}`}
                      className="btn btn-secondary m-2"
                    >
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Hình ảnh</th>
              <th>Mô tả sản phẩm</th>
              <th>Giá bán</th>
              <th>Ngày tạo sản phẩm</th>
              <th>Nguồn góc</th>
              <th>Thương hiệu</th>
              <th>Chức năng</th>
            </tr>
          </tfoot>
        </table>
        {/* <Modal show={show} size="lg" onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Thông tin tài khoản</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col md={4}>
                <dl>
                  <dt>Tên sản phẩm:</dt>
                  <dd>{selectedProducts.name}</dd>

                  <dt>Mô tả sản phẩm:</dt>
                  <dd>{selectedProducts.description}</dd>

                  <dt>Giá tiền sản phẩm:</dt>
                  <dd>{selectedProducts.price}</dd>

                </dl>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal> */}
        <Modal show={show} size="lg" onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Thông tin sản phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={7}>
                {/* <img
                              src={`https://localhost:7106/Images/${selectedImage.fileName}`}
                              style={{ width: "400px" }}
                            /> */}
                {ProductDetail.map((item) => {
                  return (
                    <>
                      <div className="kXwtNH">
                        <div className="image-frame">
                          <div className="img-pro">
                            <div className="position-pointer">
                              <img
                                src={MainImageUrl == null ? "" : MainImageUrl}
                                alt=""
                                className="hbqSye"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="eKNqTX thumbnail-list">
                          <div className="bCOUwr children-slider">
                            <div className="content">
                              {/* <span className="icon-prev"></span> */}
                              <span className="slider">
                                {item.images.map((itemImg) => {
                                  return (
                                    <>
                                      <a
                                        href=""
                                        className="jWvPKd"
                                        key={itemImg.id}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleClickImage(
                                            `https://localhost:7073/Images/${itemImg.fileName}`
                                          );
                                        }}
                                      >
                                        <img
                                          src={`https://localhost:7073/Images/${itemImg.fileName}`}
                                          alt=""
                                        />
                                      </a>
                                    </>
                                  );
                                })}
                              </span>
                              {/* <span className="icon-next"></span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </Col>
              <Col style={{ paddingTop: "5rem" }}>
                <dl className="row">
                  <dt>Tên sản phẩm:</dt>
                  <dd>{selectedProducts.name}</dd>

                  {/* <dt>Hình ảnh:</dt>
                  <dd>{selectedProducts.imageName}</dd> */}

                  <dt>Giá sản phẩm </dt>
                  <td>
                    {selectedProducts.price
                      .toLocaleString("en-US")
                      .replace(/,/g, ".")}{" "}
                    ₫
                  </td>

                  <dt>Ngày tạo sản phẩm</dt>
                  <dd>{selectedProducts.createTime}</dd>
                  <dt>Nguồn gốc sản phẩm</dt>
                  <dd>{selectedProducts.brand}</dd>
                  <dt>Thương hiệu sản phẩm</dt>
                  <dd>{selectedProducts.origin}</dd>
                </dl>
              </Col>
            </Row>
            <Row style={{marginTop:"2rem"}}>
              <Col md={12}>
                <dl className="row">
                  <dt>Mô tả </dt>
                  <dd className="text-justify">
                    {selectedProducts.description}
                  </dd>
                </dl>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showDelete} onHide={handleCloseDelete} centered>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận xóa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có chắc muốn sản phẩm{" "}
            <span style={{ fontWeight: "bold" }}>{selectedProducts.name}</span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleDelete}>
              <FontAwesomeIcon icon={faCheck} /> Đồng ý
            </Button>
            <Button variant="secondary" onClick={handleCloseDelete}>
              <FontAwesomeIcon icon={faTimes} /> Hủy bỏ
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default ProductList;
