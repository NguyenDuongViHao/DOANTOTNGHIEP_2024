import { faCheck, faEdit, faInfoCircle, faPlus, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
import $ from 'jquery';

const CategoryList = () => {
    var stt = 0;
    const [Category, setCategory] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setselectedCategory] = useState({});
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);

    const handleShow = (id) => {
        setselectedCategory(Category.find(a => a.id == id));
        setShow(true);
    };

    const handleShowDelete = (id) => {
        setselectedCategory(Category.find(a => a.id == id));
        setShowDelete(true);
    }

    const handleDelete = () => {
        AxiosClient.delete(`/Categories/${selectedCategory.id}`);
        let list = Category;
        list.splice(Category.findIndex(a => a.id == selectedCategory.id), 1);
        setCategory(list);
        setShowDelete(false);
    }
    const fetchCategory = () => {
        AxiosClient.get('/Categories')
            .then((res) => {
                setCategory(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the products!", error);
            });
    };
    useEffect(() => {
        AxiosClient.get(`/Categories`)
            .then((res) => {
                setCategory(res.data);
                setDataLoaded(true);
            });
    }, []);
    useEffect(() => {
        fetchCategory()
    }, []);
    useEffect(() => {
        if (searchTerm.trim() !== '') {
            AxiosClient.get(`/Categories/searchCategories?name=${searchTerm}`)
                .then((res) => {
                    setCategory(res.data);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        } else {
            fetchCategory();
        }
    }, [searchTerm])
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (

        <div>
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title">Danh sách phân loại sản phẩm</h4>
                        <div className="ml-auto text-right">
                            <nav aria-label="breadcrumb">

                            </nav>

                        </div>

                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-2">
                                    <Link to={`add`} className="btn btn-success">
                                        <FontAwesomeIcon icon={faPlus} /> Tạo loại sản phẩm
                                    </Link>
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm"
                                        className="form-control w-25"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <div className="table-responsive">
                                    <table id="myTable" className="table table-striped table-bordered display nowrap" style={{ width: "100%" }}>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên</th>
                                                <th>Chức năng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                Category.map(item => {
                                                    return (
                                                        <tr key={item.id}>
                                                            <td>{stt += 1}</td>
                                                            <td>{item.name}</td>
                                                            <td>
                                                                <Button variant="primary" onClick={() => handleShow(item.id)}>
                                                                    <FontAwesomeIcon icon={faInfoCircle} />
                                                                </Button>
                                                                <Link to={`edit/${item.id}`} className="btn btn-secondary m-2">
                                                                    <FontAwesomeIcon icon={faEdit} />
                                                                </Link>
                                                                <Button variant="danger" onClick={() => handleShowDelete(item.id)}>
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên</th>
                                                <th>Chức năng</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <Modal show={show} size="ml" onHide={handleClose} centered>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Thông tin loại sản phẩm</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Row>
                                                <Col md="4">
                                                    <dl className="row">
                                                        <dt className="col-sm-3">Tên: </dt>
                                                        <dd className="col-sm-9">{selectedCategory.name}</dd>
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
                                        <Modal.Body>Bạn có chắc muốn xóa loại sản phẩm <span style={{ fontWeight: "bold" }}>{selectedCategory.name}</span> ?</Modal.Body>
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
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
export default CategoryList;