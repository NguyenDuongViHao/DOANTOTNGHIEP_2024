import { Button, Card, Form, Modal } from "react-bootstrap";
import "./MyOrder.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AxiosClient from "../../Axios/AxiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import StarRating from "./StarRating";
import { toast, ToastContainer } from "react-toastify";
const InvoiceDetails = () => {
  var { id } = useParams();
  const UserId = localStorage.getItem("userId");
  var { approve } = useParams();
  const navigate = useNavigate();
  const [Orderer, setOrderer] = useState({});
  const [InvoiceDetails, setInvoiceDetails] = useState([]);
  const [ShowCancel, setShowCancel] = useState(false);
  const [ShowRating, setShowRating] = useState(false);
  const handleCloseCancel = () => setShowCancel(false);
  const handleCloseRating = () => setShowRating(false);
  const [ShowRatingId, setShowRatingId] = useState();
  const [User, setUser] = useState({});
  const [changeshowsubmit, setchangeshowsubmit] = useState(false);

  var TotalInvoice = 0;
  var Subtotal = 0;
  var Discount = 0;

  useEffect(() => {
    AxiosClient.get(`InvoiceDetails/infoOrder/${id}`).then((res) => {
      setOrderer(res.data);
    });
  }, [changeshowsubmit]);
console.log(Orderer)

  useEffect(() => {
    AxiosClient.get(`InvoiceDetails/detailsOfAnOrder/${id}`).then((res) => {
      setInvoiceDetails(res.data);
    });
  }, [changeshowsubmit]);

  const handleShowCancel = () => {
    setShowCancel(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    AxiosClient.delete(`Invoices/Canceled/${id}`).then(() => {   
      toast.success(()=> (<div>Đơn hàng đã hủy!</div>))
      setchangeshowsubmit(true)
      setShowCancel(false)
    });
  };

  const handleGoBack = () => {
    navigate("/order");
  };

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleConfirmRating = async () => {
    await AxiosClient.post(`Reviews/${UserId}`, {
      productId: ShowRatingId,
      content: review,
      starNumber: rating,
    })
      .then((res) => {
        console.log("Create evaluation:", res.data);
        toast.info(() => <div>Đánh giá thành công</div>);
      })
      .catch((error) => {
        console.error("There was an error createing evaluation", error);
        toast.warning(() => <div>Đánh giá thất bại</div>);
      });
    setShowRating(false);
  };

  const handleShowRating = (id) => {
    setShowRating(true);
    setShowRatingId(id);
  };
  return (
    <>
      <Card className="card-body parentInvoice">
        <div style={{ width: "80%", margin: "0 auto", marginBottom:"14rem" }}>
          <div className="item1">
            <div className="detailInvoiceNavbar displayFLEX">
              <div className="detailInvoiceNavbarItem1">
                <span className="fontSize20  ">Chi tiết đơn hàng: #</span>
                <span className="fontSize20 ">{Orderer.code}</span>
              </div>
              <div className="detailInvoiceNavbarItem3">
                Ngày đặt hàng: {Orderer.issueDate}
              </div>
            </div>
            <div className="hhOLsC, displayFLEX" style={{ width: "75%" }}>
              <div className="itemI">
                <div>Địa chỉ người nhận</div>
              </div>
             
              <div className="itemI">
                <div>Hình thức thanh toán</div>
              </div>

              <div className="itemI">
              <div>Trạng thái đơn hàng</div>
            </div>
            </div>        
          </div>

           

          <div className="item2, displayFLEX" style={{ width: "74%" }}>
            <Card className="card-body itemI" style={{ marginRight: "1rem" }}>
              <div>
                <b>{Orderer.userName}</b>
              </div>
              <div>Địa chỉ: {Orderer.shippingAddress}</div>
              <div></div>
              <div>Điện thoại: {Orderer.shippingPhone}</div>
            </Card>
            
            <Card className="card-body itemI" style={{ marginRight: "1rem" }}>
              <div>
                {Orderer.cod ? "Chưa thanh toán, thanh toán khi nhận hàng" : ""}
              </div>
              <div>
                {Orderer.vnpay ? "Đã thanh toán, thanh toán online" : ""}
              </div>
            </Card>

            <Card className="card-body itemI">
            <div>
            
            </div>
            <i style={{textDecoration:"underline", textDecorationColor:"blue"}}>{Orderer.approveOrder}</i>
          </Card>
          </div>

          <div>
            <Card className="card-body" style={{ padding: 0 }}>
              <table className="table" style={{ borderTop: "none" }}>
                <thead style={{ paddingBottom: "1rem" }}>
                  <tr>
                    <th style={{ padding: "1rem 0", paddingLeft: "1rem" }}>
                      Sản phẩm
                    </th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    {/* <th>Giảm giá</th> */}
                    <th style={{ textAlign: "end", padding: "0.5rem 2rem" }}>
                      Tạm tính
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {InvoiceDetails.map((item) => {
                    Subtotal = Subtotal + item.quantity * item.price;
                    // Discount = Discount + item.promotionPercentage;
                    TotalInvoice = Subtotal - Discount;
                    approve = item.approveOrder;
                    return (
                      <>
                        {/* {totalAmount = totalAmount + item.unitPrice}  */}
                        <tr>
                          <td>
                            <div className="displayFLEX">
                              <div style={{ width: "8rem" }}>
                                <img
                                  src={`https://localhost:7073/Images/${item.image}`}
                                  alt="hinhanh"
                                />
                              </div>
                              <div style={{ width: "100%" }}>
                                <div>{item.productName}</div>
                                {/* <div>Cung cấp bởi: {item.publisher}</div> */}
                                <div>Kích thước {item.nameSize}</div> 
                                <div>Màu sắc: {item.nameColor}</div>

                              </div>
                            </div>
                          </td>
                          <td>
                            {item.price
                              .toLocaleString("en-US")
                              .replace(/,/g, ".")}{" "}
                            ₫
                          </td>
                          <td>{item.quantity}</td>
                          {/* <td>
                          {item.promotionPercentage
                            .toLocaleString("en-US")
                            .replace(/,/g, ".")}{" "}
                          ₫
                          vi hao
                        </td> */}
                          <td
                            style={{ textAlign: "end", padding: "0.5rem 2rem" }}
                          >
                            {item.subtotalProduct
                              .toLocaleString("en-US")
                              .replace(/,/g, ".")}{" "}
                            ₫
                            {approve == "Đã giao" ? (
                              <u
                                style={{ display: "flex", color: "blue" }}
                                onClick={() => {
                                  handleShowRating(item.productId);
                                }}
                              >
                                <i>
                                  <b>đánh giá ngay</b>
                                </i>
                              </u>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
              <div className="totalInvoice">
                <div className="floatRightInvoice">
                  <div className="totalResult" style={{ display: "flex" }}>
                    <div style={{ marginRight: "7rem" }}>
                      <div className="titleInvoivceR">Tạm tính:</div>
                      <div className="titleInvoivceR">Giảm giá:</div>
                      <div className="titleInvoivceR">Tổng tiền:</div>
                    </div>
                    <div>
                      <div
                        style={{ textAlign: "end" }}
                        className="titleInvoivceR"
                      >
                        {" "}
                        {Subtotal.toLocaleString("en-US").replace(/,/g, ".")} ₫
                      </div>
                      <div
                        style={{ textAlign: "end" }}
                        className="titleInvoivceR"
                      >
                        {Discount.toLocaleString("en-US").replace(/,/g, ".")} ₫
                      </div>
                      <div
                        style={{ textAlign: "end" }}
                        className="titleInvoivceR"
                      >
                        {TotalInvoice.toLocaleString("en-US").replace(
                          /,/g,
                          "."
                        )}{" "}
                        ₫
                      </div>
                    </div>
                  </div>
                  {approve == "Chờ xử lý" ? (
                    <div>
                      <button
                        className="btn btn-warning"
                        style={{ marginLeft: "1rem" }}
                        onClick={handleGoBack}
                      >
                        quay lại
                      </button>
                      <button
                        type="submit"
                        onClick={handleShowCancel}
                        className="btn btn-warning"
                      >
                        Hủy đơn hàng
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="btn btn-warning"
                        onClick={handleGoBack}
                        style={{ marginLeft: "2rem" }}
                      >
                        quay lại
                      </button>
                      <div>
                        <span
                          style={{
                            color: "red",
                            float: "right",
                            fontSize: "1.2rem",
                            marginTop: "1rem",
                          }}
                        >
                          Đơn không thể hủy
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>

      <Modal show={ShowCancel} onHide={handleCloseCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận hủy đơn</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn hủy đơn hàng này</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCancel}>
            <FontAwesomeIcon icon={faCheck} /> Xác nhận
          </Button>
          <Button variant="secondary" onClick={handleCloseCancel}>
            <FontAwesomeIcon icon={faTimes} /> Thoát
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={ShowRating} onHide={handleCloseRating}>
        <Modal.Header closeButton>
          <Modal.Title>Đánh giá sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Nhập nội dung đánh giá"
                onChange={(e) => setReview(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sao</Form.Label>
              <StarRating rating={rating} setRating={setRating} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRating}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleConfirmRating}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default InvoiceDetails;
