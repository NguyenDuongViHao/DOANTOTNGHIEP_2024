import { useEffect, useState } from 'react';
import './ProductList.css'
import AxiosClient from '../../Axios/AxiosClient';
import $ from 'jquery';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faEllipsisVertical, faInfoCircle, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Modal, Pagination, Row } from 'react-bootstrap';
import { SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Swiper from 'swiper';
const ProductList = () => {
  var id = 0;
  const [Products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState({ price: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedProducts(Products.find(u => u.id == id));
    setShow(true);
  }

  const handleButtonClick = () => {
    navigate('/admin/products/add');
  };
  const fetchProducts = () => {
    AxiosClient.get('/Products/listProduct')
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
    fetchProducts()
  }, []);
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      AxiosClient.get(`/Products/searchProduct?name=${searchTerm}`)
        .then((res) => {
          setProducts(res.data);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    } else {
      fetchProducts();
    }
  }, [searchTerm]);


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="container productadmin">
      <div className="header productadmin">
        <h2>Danh sách sản phẩm</h2>
        <div>
          <button onClick={handleButtonClick}>
            <span style={{marginRight: '5px'}}><FontAwesomeIcon icon={faPlus} /></span>Tạo sản phẩm
          </button>
        </div>
      </div>
      <div className="filter-search">
        <button>Thêm điều kiện lọc</button>
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
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Mô tả sản phẩm</th>
              <th>Giá bán</th>
              <th>Ngày tạo sản phẩm</th>
              <th>Nguồn gốc</th>
              <th>Thương hiệu</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
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
                  <td>{item.description}</td>
                  <td>{item.price.toLocaleString("en-US").replace(/,/g, ".")} ₫</td>
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

                {Products.map(item => {
                  return (
                    <>
                      <div className="product_body" style={{ marginLeft: "0", marginRight: "0" }} key={item.id}>
                        <div className="product_main">
                          <Row className="">
                            {/* <Col className="product_image_main" style={{width:"96%"}}>
                                                <div className="product_header_image">
                                                    <div className="product_image_body">
                                                        <div className="" style={{ width: "368px", height: "368px" }}>
                                                            <div style={{ position: "relative", cursor: "pointer" }}>
                                                                <img
                                                                    src={hoveredImage || selectedImage}
                                                                    alt=""
                                                                    className="product_image"
                                                                    style={{ width: "368px", height: "368px", zIndex: "2", opacity: "1" }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="image_badges"></div>
                                                    <div className="product_image_list_body">
                                                        <div className="product_image_list_main">
                                                            <Swiper
                                                                slidesPerView={7}
                                                                navigation={true}
                                                                modules={[Pagination, Navigation]}
                                                                className="mySwiper"
                                                                initialSlide={0}
                                                            >
                                                                {item.images.map((img, index) => (
                                                                    <SwiperSlide key={index}>
                                                                        <a
                                                                            className={`image_active ${selectedImage === `https://localhost:7106/images/${img.fileName}` ? 'active' : ''}`}
                                                                            onClick={() => handleImageClick(`https://localhost:7106/images/${img.fileName}`)}
                                                                            onMouseOver={() => handleImageHover(`https://localhost:7106/images/${img.fileName}`)}
                                                                            onMouseLeave={handleImageLeave}
                                                                        >
                                                                            <img
                                                                                src={`https://localhost:7106/images/${img.fileName}`}
                                                                                alt={`Image ${index + 1}`}
                                                                                className="product_image_list"
                                                                            />
                                                                        </a>
                                                                    </SwiperSlide>
                                                                ))}
                                                            </Swiper>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col> */}
                          </Row>
                        </div>
                      </div>
                      <div>

                      </div>
                    </>
                  )
                })
                }

              </Col>
              <Col style={{ paddingTop: "5rem" }}>
                <dl className="row">
                  <dt>Tên sản phẩm:</dt>
                  <dd>{selectedProducts.name}</dd>
                  <dt>Giá sản phẩm </dt>
                  <td>{selectedProducts.price.toLocaleString("en-US").replace(/,/g, ".")} ₫</td>

                  <dt>Ngày tạo sản phẩm</dt>
                  <dd>{selectedProducts.createTime}</dd>
                  <dt>Nguồn gốc sản phẩm</dt>
                  <dd>{selectedProducts.brand}</dd>
                  <dt>Thương hiệu sản phẩm</dt>
                  <dd>{selectedProducts.origin}</dd>
                </dl>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <dl className="row">
                  <dt>Mô tả </dt>
                  <dd className="text-justify">{selectedProducts.description}</dd>
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
        <Modal
          show={showDelete}
          onHide={handleCloseDelete}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận xóa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có chắc muốn sản phẩm{" "}
            <span style={{ fontWeight: "bold" }}>
              {selectedProducts.name}
            </span>
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
}
export default ProductList;