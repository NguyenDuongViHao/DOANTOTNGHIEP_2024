import { faBan, faCheck, faPlus, faTimes, faToggleOn, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";

const AccountList = () => {
    const [users, setUser] = useState([]);
    var id = 1;
    const [show, setShow] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState({});
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setSelectedUsers(users.find(u => u.id === id));
        setShow(true);
    }

    const handleShowDelete = (id) => {
        setSelectedUsers(users.find(u => u.id === id));
        setShowDelete(true);

    };

    // const handleDelete = async (e) => {
    //     e.preventDefault();
    //     if (!selectedUsers || !selectedUsers.id) {
    //         console.error('No user selected for deletion');
    //         return;
    //     }
    //     try {
    //         const id = selectedUsers.id; // Lấy ID của người dùng được chọn
    //         await AxiosClient.delete(`Users/${id}`);

    //         // Tạo một bản sao mới của mảng users, loại bỏ user đã bị xóa
    //         const updatedUsers = users.filter(u => u.id !== id);
    //         setUser(updatedUsers);
    //         setShowDelete(false);
    //     } catch (error) {
    //         console.error('Error deleting user:', error);
    //     }
    // }

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!selectedUsers || !selectedUsers.id) {
            console.error('No user selected for deletion');
            return;
        }

        try {
            const id = selectedUsers.id; // Lấy ID của người dùng được chọn
            await AxiosClient.delete(`Users/${id}`);

            // Cập nhật trạng thái của người dùng trong mảng users
            const updatedUsers = users.map(user =>
                user.id === id ? { ...user, status: false } : user
            );
            setUser(updatedUsers);
            setShowDelete(false);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }



    useEffect(() => {
        AxiosClient.get(`/Users`)
            .then((res) => {
                setUser(res.data)
                console.log(users);
                console.log(res.data);
            });
    }, [])
    return (
        <>
            <div>
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-12 d-flex no-block align-items-center">
                            <h4 className="page-title"style={{fontSize:"30px"}}>Danh sách loại tài khoản</h4>
                            <div className="ml-auto text-right">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        {/* <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Library</li> */}
                                    </ol>
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
                                    <Link to={"/admin/accounts/add"} className="btn btn-success mb-2"><FontAwesomeIcon icon={faPlus} /> Tạo  tài khoản</Link>
                                    <div className="table-responsive">
                                        <table id="myTable" className="table table-striped table-bordered display nowrap" style={{ width: "100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Tên</th>
                                                    <th>Email</th>
                                                    <th>Trạng thái</th>
                                                    <th>Chức năng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    users.map(item => {
                                                        return (
                                                            <tr key={item.id}>
                                                                <td>{id++}</td>
                                                                <td>{item.userName}</td>
                                                                <td>{item.email}</td>
                                                                <td style={{ color: item.status ? 'green' : 'red' }}>
                                                                    {item.status ? 'Hoạt động' : 'Đã chặn'}
                                                                </td>

                                                                <td>
                                                                    <Button variant="info" onClick={() => handleShow(item.id)}>
                                                                        <FontAwesomeIcon icon={faUser} />
                                                                    </Button>
                                                                    <Button variant="warning ml-2" style={{marginLeft: '5px'}} onClick={() => handleShowDelete(item.id)}>
                                                                        <FontAwesomeIcon icon={faBan} />
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
                                                    <th>Email</th>
                                                    <th>Trạng thái</th>
                                                    <th>Chức năng</th>
                                                </tr>
                                            </tfoot>
                                        </table>

                                        <Modal show={show} size="lg" onHide={handleClose} centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Thông tin tài khoản</Modal.Title>
                                            </Modal.Header>

                                            <Modal.Body>
                                                <Row>
                                                    <Col md={4}>
                                                        <dl>
                                                            <dt>Tên đăng nhập:</dt>
                                                            <dd>{selectedUsers.userName}</dd>

                                                            <dt>Email:</dt>
                                                            <dd>{selectedUsers.email}</dd>

                                                            <dt>Trạng thái:</dt>
                                                            <dd style={{ color: selectedUsers.status ? 'green' : 'red' }}>{selectedUsers.status ? 'Hoạt động' : 'Đã chặn'}</dd>
                                                        </dl>
                                                    </Col>
                                                </Row>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

                                        <Modal show={showDelete} onHide={handleCloseDelete} centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Xác nhận chặn tài khoản</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Bạn có chắc muốn chặn loại tài khoản  <span style={{ fontWeight: "bold" }}>{selectedUsers.name}</span> ?</Modal.Body>
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
        </>
    );
}
export default AccountList;