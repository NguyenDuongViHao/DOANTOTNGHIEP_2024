import { useEffect, useState } from "react";
import "./Pay.css";
import AxiosClient from "../../Axios/AxiosClient";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Pay = ({ user, phoneValue, addressValue, onChildOpenPay }) => {
  const navigate = useNavigate();
  const UserId = localStorage.getItem("userId");

  // const Address = localStorage.getItem("Address");
  // const Phone = localStorage.getItem("Phone");
  const [ShowPay, setShowPay] = useState(false);

  const [User, setUser] = useState({});
  const [PaymentList, setPaymentList] = useState([]);

  const [selectedOption, setSelectedOption] = useState("COD");
  const [vnpay, setVnpay] = useState(false);
  const [cod, setCod] = useState(true);

  const [paymentUrl, setPaymentUrl] = useState("");

  var Discount = 0;
  var totalInvoice = 0;
  var Subtotal = 0;
  var quantityProduct = 0;

  const handleClosePay = () => setShowPay(false);

  const handleShowPay = () => setShowPay(true);

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (value == "Vnpay") {
      setVnpay(true);
      setCod(false);
    } else if (value == "COD") {
      setVnpay(false);
      setCod(true);
    }
  };

  useEffect(() => {
    AxiosClient.get(`/Carts/listPayment/${UserId}`).then((res) => {
      setPaymentList(res.data);
    });
  }, []);

  const handlePayment = async () => {
    function totalPaymentOnline() {
      localStorage.setItem("TotalPaymentOnline", totalInvoice);
      localStorage.setItem("DiscountOnline", Discount);
    }
    totalPaymentOnline();
    const invoiceData = {
      // UserId: UserId,
      ShippingAddress: User.address,
      ShippingPhone: User.phoneNumber,
      Total: totalInvoice,
      Discount: Discount,
      COD: cod,
      Vnpay: vnpay,
    };
    const listnameproduct = PaymentList.map((payment) => payment.productName);
    const productNamesString = listnameproduct.join(", ");

    const model = {
      orderType: productNamesString,
      amount: totalInvoice,
      orderDescription: "Thanh toán VNPAY",
      name: User.fullName,
    };

    if (cod) {
      AxiosClient.post(`/Carts/pay/${UserId}`, invoiceData)
        .then(() => {
          navigate("/order");
          toast.info(() => <div>Đặt hàng thành công</div>);
        })
        .catch((error) => {
          
          console.error("Error while posting COD payment:", error);
        });
    }

    if (vnpay) {
      try {
        const response = await AxiosClient.post(
          "/Payment/CreatePaymentUrl",
          model
        );
        setPaymentUrl(response.data);
        // Redirect to paymentUrl
        window.location.href = response.data;
      } catch (error) {
        console.error("Error creating payment URL:", error);
      }
    }
  };

  useEffect(() => {
    AxiosClient.get(`/Users/${UserId}`).then((res) => {
      setUser(res.data);
    });
  }, [UserId]);

  return (
    <>
      <div style={{ background: "#efefef", padding: "2rem 0" }}>
        <div style={{ borderRadius: "4px" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom:"11rem" }}>
            <div style={{ width: "55%" }}>
              <div className="bVA-DDf">
                <h3 className="dMMxLl">Chọn hình thức giao hàng</h3>
                {PaymentList.map((item) => {
                  Subtotal = Subtotal + item.price * item.quantity;
                  Discount = Discount + item.promotionPercentage;
                  totalInvoice = Subtotal - Discount;
                  quantityProduct += 1;
                  return (
                    <>
                      <div className="fyhLrw" key={item.id}>
                        <div style={{ width: "10%" }}>
                          <div>
                            <img
                              src={`https://localhost:7073/Images/${item.imageURL}`}
                              alt=""
                            />
                          </div>
                        </div>
                        <div style={{ width: "70%" }}>
                          <div
                            style={{ marginTop: "1.5rem", marginLeft: "2rem" }}
                          >
                            <div className="item-info__product-name ">
                              {item.productName}
                            </div>
                            <div>SL: x{item.quantity}</div>
                          </div>
                        </div>
                        <div>
                          {/* <div>
                          {item.PromotionPercentage}
                          ₫
                        </div> */}
                          <div>Đơn giá</div>
                          <div style={{ marginTop: "1.5rem" }}>
                            {item.price
                              .toLocaleString("en-US")
                              .replace(/,/g, ".")}{" "}
                            ₫
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="bVA-DDf">
                <h3 className=" dMMxLl eqwnfr">Chọn hình thức thanh toán</h3>
                <div className="kPqUSk">
                  <div>
                    <label htmlFor="" className="gsXQMn">
                      <input
                        type="radio"
                        name=""
                        id=""
                        value="COD"
                        checked={selectedOption === "COD"}
                        onChange={handleRadioChange}
                      />
                      <span className="radio-fake"></span>
                      <span className="labelcontent">
                        <div className="gsYpJq">
                          <div className="eydcWx">
                            <img
                              className="method-icon"
                              src="https://salt.tikicdn.com/ts/upload/92/b2/78/1b3b9cda5208b323eb9ec56b84c7eb87.png"
                              width="32"
                              height="32"
                              alt="icon"
                            />
                            <div className="method-content">
                              <div className="method-content__title ">
                                <span>Thanh toán tiền mặt</span>
                              </div>
                              <div className="method-content__sub-title"></div>
                            </div>
                          </div>
                        </div>
                      </span>
                    </label>
                  </div>

                  <div>
                    <label htmlFor="" className="gsXQMn">
                      <input
                        type="radio"
                        name=""
                        id=""
                        value="Vnpay"
                        checked={selectedOption === "Vnpay"}
                        onChange={handleRadioChange}
                      />
                      <span className="radio-fake"></span>
                      <span className="labelcontent">
                        <div className="gsYpJq">
                          <div className="eydcWx">
                            <img
                              class="method-icon"
                              src="https://salt.tikicdn.com/ts/upload/77/6a/df/a35cb9c62b9215dbc6d334a77cda4327.png"
                              width="32"
                              height="32"
                              alt="icon"
                            />{" "}
                            <div className="method-content">
                              <div className="method-content__title ">
                                <span>VnPay</span>
                              </div>
                              <div className="method-content__sub-title"></div>
                            </div>
                          </div>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bVA-DDf1" style={{ background: "#efefef" }}>
              <div className="bVA-DDf1-item">
                <div className="bVA-DDf1-item-1">
                  <div className="block-header">
                    <h3 className="block-header__title">Giao tới</h3>
                    <Link to="/payment/shipping">Thay đổi</Link>
                  </div>
                  <div className="customer_info">
                    <p
                      className="customer_info__name"
                      style={{ color: "rgb(56, 56, 61)" }}
                    >
                      {User.fullName}
                    </p>
                    <i></i>
                    <div
                      className="customer_info__phone"
                      style={{ color: "rgb(56, 56, 61)" }}
                    >
                      {User.phoneNumber}
                    </div>
                  </div>
                  <div className="address">
                    <span className="address__type address__type--home">
                      Địa chỉ
                    </span>
                    {User.address}
                  </div>
                </div>
              </div>

              <div className="jMrZxT bVA-DDf2">
                <div className="block-header">
                  <div className="block-header__title ">Khuyến mãi</div>
                  <div className="block-header__usage">
                    <span>Có thể chọn 2</span>
                  </div>
                </div>
                <div className="coupon-list"></div>
                <div className="show-more">
                  <span>Chọn hoặc nhập Khuyến mãi khác</span>
                </div>
              </div>

              <div className="bVA-DDf1-item">
                <div className="bVA-DDf1-item-1">
                  <h4>Đơn hàng</h4>
                  <div>{quantityProduct} sản phẩm</div>
                </div>
                <hr style={{ margin: "0" }} />
                <div className="bVA-DDf1-item-1">
                  <div className="subtotal">
                    <div>
                      Tạm tính:{" "}
                      {Subtotal.toLocaleString("en-US").replace(/,/g, ".")} ₫
                    </div>
                  </div>
                  <div className="discount">
                    <div>
                      Khuyến mãi:{" "}
                      {Discount.toLocaleString("en-US").replace(/,/g, ".")} ₫
                    </div>
                  </div>
                  <hr />
                  <div className="order-total" style={{ marginBottom: "2rem" }}>
                    <div>
                      Tổng tiền:{" "}
                      {totalInvoice.toLocaleString("en-US").replace(/,/g, ".")}{" "}
                      ₫
                    </div>
                  </div>
                  <div className="bSkntM">
                    <button className="hHWBHK hksmFU" onClick={handleShowPay}>
                      Đặt hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal show={ShowPay} onHide={handleClosePay}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận đặt hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn đặt đơn hàng này</Modal.Body>
        <Modal.Footer>
          <Button variant="danger">
            <FontAwesomeIcon icon={faCheck} onClick={handlePayment} /> Đồng ý
          </Button>
          <Button variant="secondary" onClick={handleClosePay}>
            <FontAwesomeIcon icon={faTimes} /> Hủy
          </Button>
        </Modal.Footer>
      </Modal> */}

      <Modal
        show={ShowPay}
        onHide={handleClosePay}
        backdrop="static"
        keyboard={false}
        size="sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận đặt hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn đặt đơn hàng này</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePayment}>
            Xác nhận
          </Button>
          <Button variant="danger" onClick={handleClosePay}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Pay;
