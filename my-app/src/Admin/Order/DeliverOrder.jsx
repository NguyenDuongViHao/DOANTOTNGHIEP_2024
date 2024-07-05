import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faLocationDot, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";

const DeliverOrder = ({ ListOfInvoice }) => {
  const [ListOfInvoiceApprove, setListOfInvoiceApprove] = useState([]);
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const [OrderDetails, setOrderDetails] = useState([]);
  const [Orderer, setOrderer] = useState({});

  const handleLinkClick = (rowIndex) => {
    setOpenRowIndex((prevIndex) => (prevIndex === rowIndex ? null : rowIndex));
  };

  const handleLinkClick1 = (idinvoice) => {
    AxiosClient.get(`InvoiceDetails/detailsOfAnOrder/${idinvoice}`).then(
      (res) => {
        setOrderDetails(res.data);
      }
    );
  };

  useEffect(() => {
    AxiosClient.get(`Invoices/ListOfOrder/delivered`).then((res) => {
      setListOfInvoiceApprove(res.data);
    });
  }, [ListOfInvoiceApprove]);

  const handleLinkClickOrderer = (idinvoice) => {
    AxiosClient.get(`InvoiceDetails/orderer/${idinvoice}`).then((res) => {
      setOrderer(res.data);
    });
  };
  return (
    <>
      <div class="container mt-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={{ width: "20%", background: "rgb(230 229 229)" }}>
                Mã đơn hàng/ Ngày đặt hàng
              </th>
              <th style={{ width: "20%", background: "rgb(230 229 229)" }}>
                Trạng thái
              </th>
              <th style={{ width: "20%", background: "rgb(230 229 229)" }}>
                Số lượng/ GTĐH
              </th>
              <th style={{ width: "20%", background: "rgb(230 229 229)" }}>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {ListOfInvoiceApprove.map((item, index) => {
              return (
                <>
                  <tr key={index}>
                    {/* <td style={{width: "2%", textAlign:"center", paddingTop:"1.5rem"}} >v</td> */}
                    <td>
                      <div>
                        <p style={{ color: "#2962FF" }}>{item.code}</p>
                      </div>
                      <div>{item.issuedDate}</div>
                    </td>
                    <td>
                    <div style={{backgroundColor:"rgb(197 255 217)", width:"35%", border:"1px solid #ccc", borderRadius:"4px", textAlign:"center"}}>{item.approveOrder}</div>
                    </td>
                    <td>
                      <p>x{item.totalQuantity}</p>
                      <div>{item.total?.toLocaleString("en-US").replace(/,/g, ".")} ₫</div>
                    </td>
                    <td>
                      <Link
                        onClick={() => {
                          handleLinkClick(index);
                          handleLinkClick1(`${item.id}`);
                          handleLinkClickOrderer(item.id);
                        }}
                      >
                        <p>Xem chi tiết và xác nhận</p>
                      </Link>
                    </td>
                  </tr>

                  {openRowIndex === index && (
                    <tr>
                      <td
                        colSpan="5"
                        style={{
                          padding: "2rem",
                          background: "rgb(248 248 248)",
                        }}
                      >
                        {/* Nội dung của hàng xác nhận */}

                        <div style={{ marginBottom: "1rem" }}>
                          <FontAwesomeIcon icon={faUser} />{" "}
                          <label style={{ margin: "0 1rem" }}>
                            {Orderer.orderersName}({Orderer.shippingPhone})
                          </label>
                          / <FontAwesomeIcon icon={faLocationDot} />{" "}
                          <label>{Orderer.shippingAddress}</label>
                        </div>
                        <div>
                          <thead>
                            <tr style={{ background: "rgb(230 229 229)" }}>
                              <th style={{ width: "10%" }}>Sản phẩm</th>
                              <th style={{ width: "10%" }}>Số lượng</th>
                            </tr>
                          </thead>
                          <tbody>
                            {OrderDetails.map((orderdetail, index1) => {
                              return (
                                <>
                                  <tr key={index1}>
                                    <td style={{ background: "#fff", width: "75%"}}>
                                      <div style={{ display: "flex" }}>
                                        <div
                                          style={{
                                            marginRight: "0.5rem",
                                            width: "10%",
                                          }}
                                        >
                                          <img
                                            src={`https://localhost:7106/Images/${orderdetail.images}`}
                                            alt="hinh anh"
                                          />
                                        </div>
                                        <div style={{ width: "85%" }}>
                                          <div>{orderdetail.name}</div>
                                          <div>
                                            Mã sản phẩm:{" "}
                                            {orderdetail.id}
                                          </div>
                                          <div>
                                            Giá: {orderdetail.price?.toLocaleString("en-US").replace(/,/g, ".")} ₫
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td style={{ background: "#fff", width: "25%"}}>
                                      <div
                                        style={{
                                          display: "flex",
                                          marginTop: "1.5rem",
                                        }}
                                      >
                                        <p>{orderdetail.quantity}</p>
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                          </tbody>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DeliverOrder;
