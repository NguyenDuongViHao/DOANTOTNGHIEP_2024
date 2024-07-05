import { Button, Card, Modal } from "react-bootstrap";
import "./MyOrder.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AxiosClient from "../../Axios/AxiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
const InvoiceDetails = () => {
  var { id } = useParams();
  var { approve } = useParams();
  const navigate = useNavigate();
  const [Orderer, setOrderer] = useState({});
  const [InvoiceDetails, setInvoiceDetails] = useState([]);
  const [ShowCancel, setShowCancel] = useState(false);
  const handleCloseCancel = () => setShowCancel(false);

  var TotalInvoice = 0;
  var Subtotal = 0;
  var Discount = 0;

  useEffect(() => {
    AxiosClient.get(`InvoiceDetails/infoOrder/${id}`).then((res) => {
      setOrderer(res.data);
    });
  }, []);

  useEffect(() => {
    AxiosClient.get(`InvoiceDetails/detailsOfAnOrder/${id}`).then((res) => {
      setInvoiceDetails(res.data);
    });
  }, []);

  const handleShowCancel = () => {
    setShowCancel(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    AxiosClient.delete(`Invoices/Canceled/${id}`).then(() => {
      navigate("/order");
    });
  };

  const handleGoBack = () => {
    navigate("/order");
  };

  return (
    <>
      <Card className="card-body parentInvoice" style={{ width: "100%" }}>
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
          <div className="hhOLsC, displayFLEX" style={{width:"75%"}}>
            <div className="itemI">
              <div>Địa chỉ người nhận</div>
            </div>
            {/* <div className="itemI">
              <div>Hình thức giao hàng</div>
            </div> */}
            <div className="itemI">
              <div>Hình thức thanh toán</div>
            </div>
          </div>
        </div>

        <div className="item2, displayFLEX" style={{width:"50%"}}>
          <Card className="card-body itemI" style={{marginRight:"1rem"}}>
            <div>
              <b>{Orderer.userName}</b>
            </div>
            <div>Địa chỉ: {Orderer.shippingAddress}</div>
            <div></div>
            <div>Điện thoại: {Orderer.shippingPhone}</div>
          </Card>
          {/* <Card className="card-body itemI">
            <div>
              Vận chuyển tiết kiểm (dự kiến sản phẩm giao hàng vào thứ năm)
            </div>
            <div>Miễn phí vận chuyển</div>
          </Card> */}
          <Card className="card-body itemI" style={{marginRight:"1rem"}}>
            <div>{Orderer.cod ?  "Thanh toán khi nhận hàng" : "COD"}</div>
            <div>{Orderer.momo  ?  "Đã thanh toán" : "MoMo"}</div>

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
                          {item.subtotalProduct.toLocaleString("en-US").replace(
                            /,/g,
                            "."
                          )}{" "}
                          ₫
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
                    <p>Tạm tính:</p>
                    <p>Giảm giá:</p>
                    <p>Tổng tiền:</p>
                  </div>
                  <div>
                    <p style={{ textAlign: "end" }}>
                      {" "}
                      {Subtotal.toLocaleString("en-US").replace(/,/g, ".")} ₫
                    </p>
                    <p style={{ textAlign: "end" }}>
                      {Discount.toLocaleString("en-US").replace(/,/g, ".")} ₫
                    </p>
                    <p style={{ textAlign: "end" }}>
                      {TotalInvoice.toLocaleString("en-US").replace(/,/g, ".")}{" "}
                      ₫
                    </p>
                  </div>
                </div>
                {approve === "Đã đặt" || approve === "Đã xác nhận" ? (
                  <div>
                    <button
                      type="submit"
                      onClick={handleShowCancel}
                      className="btn btn-warning"
                    >
                      Hủy đơn hàng
                    </button>
                    <button
                      className="btn btn-warning"
                      style={{ marginRight: "1rem" }}
                      onClick={handleGoBack}
                    >
                      quay lại
                    </button>
                  </div>
                ) : (
                  <div>
                    <div>
                      <label
                        style={{
                          color: "red",
                          float: "right",
                          fontSize: "1.2rem",
                          marginTop: "1rem",
                        }}
                      >
                        Đơn không thể hủy
                      </label>
                    </div>
                    <button className="btn btn-warning" onClick={handleGoBack}>
                      quay lại
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </Card>

      <Modal show={ShowCancel} onHide={handleCloseCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận hủy đơn</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn hủy đơn hàng này</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCancel}>
            <FontAwesomeIcon icon={faCheck} /> Đồng ý
          </Button>
          <Button variant="secondary" onClick={handleCloseCancel}>
            <FontAwesomeIcon icon={faTimes} /> Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InvoiceDetails;
