

// import React, { useState, useEffect } from "react";
// import AxiosClient from "../../Axios/AxiosClient";
// import { Link } from "react-router-dom";
// import { Button, Modal } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck, faLocationDot, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";

// const ApproveOrder = ({ ListOfInvoice }) => {
//   const [ListOfInvoiceApprove, setListOfInvoiceApprove] = useState([]);

//   const [openRowIndex, setOpenRowIndex] = useState(null);
//   const [OrderDetails, setOrderDetails] = useState([]);
//   const [showConfirm, setshowConfirm] = useState(false);
//   const [selectedIdInvoice, setselectedIdInvoice] = useState({});
//   const [Orderer, setOrderer] = useState({});

//   const handleCloseConfirm = () => setshowConfirm(false);


//   const handleLinkClick = (rowIndex) => {
//     setOpenRowIndex((prevIndex) => (prevIndex === rowIndex ? null : rowIndex));
//   };

//   const handleConfirmClick = () => {
//     setOpenRowIndex(null)
//   };

//   const handleLinkClick1 = (idinvoice) => {
//     AxiosClient.get(`InvoiceDetails/detailsOfAnOrder/${idinvoice}`).then(
//       (res) => {
//         setOrderDetails(res.data);
//       }
//     );
//   };

//   const handleShowConfirm = (invoiceId) => {
//     setselectedIdInvoice(ListOfInvoiceApprove.find(a=> a.id == invoiceId))
//     setshowConfirm(true);
//   };

//   const handleConfirm =()=> {
//     // e.preventDefault();
//     AxiosClient.delete(`Invoices/AdminConfirm/${selectedIdInvoice.id}`)
//     setshowConfirm(false)
//   }

//   const [isDisableConfirm, setisDisableConfirm] = useState(true);

//   const [productStatus, setProductStatus] = useState({});
  
//   const handleProductStatusChange = (productId, status) => {
//     setisDisableConfirm(false)
//     setProductStatus({
//       ...productStatus, //tạo một bản sao và thêm thuộc tính mới
//       [productId]: status,
//     });
//   };

//   useEffect(() => {
//     AxiosClient.get(`Invoices/ListOfOrder/approveOrder`).then((res) => {
//       setListOfInvoiceApprove(res.data);
//     });
//   }, [ListOfInvoiceApprove]);

//   const handleLinkClickOrderer = (idinvoice) => {
//     AxiosClient.get(`InvoiceDetails/orderer/${idinvoice}`).then((res) => {
//       setOrderer(res.data);
//     });
//   };
//   return (
//     <>
//       <div className="container mt-4">
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th style={{ width: "20%", background: "rgb(230 229 229)" }}>Mã đơn hàng</th>
//               <th style={{ width: "20%", background: "rgb(230 229 229)" }}>Ngày đặt hàng</th>
//               <th style={{ width: "20%", background: "rgb(230 229 229)" }}>Trạng thái</th>
//               <th style={{ width: "20%", background: "rgb(230 229 229)" }}>Số lượng/ GTĐH</th>
//               <th style={{ width: "20%", background: "rgb(230 229 229)" }}>Thao tác</th>
//             </tr>
//           </thead>
//           <tbody>
//             {ListOfInvoiceApprove.map((item, index) => (
//               <React.Fragment key={index}>
//                 <tr>
//                   <td>
//                     <div>
//                       <p style={{ color: "#2962FF" }}>{item.code}</p>
//                     </div>
                    
//                   </td>
//                   <td>
//                   <div>{item.issueDate}</div>
//                   </td>
//                   <td>
//                     <div
//                       style={{
//                         backgroundColor: "#fcfca1",
//                         width: "35%",
//                         border: "1px solid #ccc",
//                         borderRadius: "4px",
//                         textAlign: "center",
//                       }}
//                     >
//                       {item.approveOrder}
//                     </div>
//                   </td>
//                   <td>
//                     <p>x{item.totalQuantity}</p>
//                     <div>{item.total.toLocaleString("en-US").replace(/,/g, ".")} ₫</div>
//                   </td>
//                   <td>
//                   <Link 
//                         onClick={() => {
//                           handleLinkClick(index);
//                           handleLinkClick1(`${item.id}`);
//                           handleLinkClickOrderer(item.id);

//                         }}
//                       >
//                         <p>Xem chi tiết và xác nhận</p>
//                       </Link>

//                   </td>
//                 </tr>
//                 {openRowIndex === index && (
//                   <tr>
//                     <td colSpan="5" style={{ padding: "2rem", background: "rgb(248 248 248)" }}>
//                       <div style={{ marginBottom: "1rem" }}>
//                         <FontAwesomeIcon icon={faUser} />{" "}
//                         <label style={{ margin: "0 1rem" }}>
//                           {Orderer.orderersName}({Orderer.shippingPhone})
//                         </label>{" "}
//                         / <FontAwesomeIcon icon={faLocationDot} />{" "}
//                         <label>{Orderer.shippingAddress}</label>
//                       </div>
//                       <table className="table table-bordered">
//                         <thead>
//                           <tr style={{ background: "rgb(230 229 229)" }}>
//                             <th style={{ width: "10%" }}>Sản phẩm</th>
//                             <th style={{ width: "10%" }}>Tình trạng hàng</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {OrderDetails.map((orderdetail, index1) => (
//                             <tr key={index1}>
//                               <td style={{ background: "#fff" }}>
//                                 <div style={{ display: "flex" }}>
//                                   <div style={{ marginRight: "0.5rem", width: "10%" }}>
//                                     {/* <img
//                                       src={`https://localhost:7106/Images/${orderdetail.images}`}
//                                       alt="hinh anh"
//                                     /> */}
//                                   </div>
//                                   <div style={{ width: "85%" }}>
//                                     <div>{orderdetail.name}</div>
//                                     <div>Mã sản phẩm: {orderdetail.code}</div>
//                                     <div>
//                                       Giá:{" "}
//                                       {orderdetail.price.toLocaleString("en-US").replace(/,/g, ".")}{" "}
//                                       ₫
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div>
//                                   <div>x{orderdetail.quantity}</div>
//                                 </div>
//                               </td>
//                               <td style={{ background: "#fff" }}>
//                                 <div style={{ display: "flex", marginTop: "1.5rem" }}>
//                                   <div
//                                     style={{
//                                       border: "1px #e5e5e5 solid",
//                                       paddingRight: "2rem",
//                                     }}
//                                   >
//                                     <input
//                                       type="radio"
//                                       checked={productStatus[index1] === "instock"}
//                                       onChange={() => handleProductStatusChange(index1, "instock")}
//                                     />{" "}
//                                     <span style={{ color: "#87de00" }}>Còn hàng</span>
//                                   </div>
//                                   <div
//                                     style={{
//                                       border: "1px #e5e5e5 solid",
//                                       paddingRight: "2rem",
//                                     }}
//                                   >
//                                     <input
//                                       type="radio"
//                                       checked={productStatus[index1] === "outofstock"}
//                                       onChange={() => handleProductStatusChange(index1, "outofstock")}
//                                     />{" "}
//                                     <span style={{ color: "red" }}>Hết hàng</span>
//                                   </div>
//                                 </div>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                       <div
//                         style={{
//                           background: "#fff",
//                           border: "1px #e5e5e5 solid",
//                           borderTop: "none",
//                           height: "4rem",
//                         }}
//                       >
//                         <Button
//                           onClick={handleConfirmClick}
//                           disabled={isDisableConfirm}
//                           className="btn btn-primary"
//                           style={{
//                             width: "20%",
//                             margin: "1rem 1rem 0 0",
//                             float: "right",
//                           }}
//                         >
//                           Xác nhận
//                         </Button>
//                         <Button
//                           onClick={() => setOpenRowIndex(null)}
//                           className="btn btn-primary"
//                           style={{
//                             width: "10%",
//                             margin: "1rem 1rem 0 0",
//                             float: "right",
//                           }}
//                         >
//                           Quay lại
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Modal show={showConfirm} onHide={handleCloseConfirm} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Xác nhận đơn hàng</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Đơn hàng sẽ được xác nhận và không thể hoàn tác. Bạn có chắc chắn muốn xác nhận đơn hàng này?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseConfirm}>
//             Hủy
//           </Button>
//           <Button variant="primary" onClick={handleConfirm}>
//             Xác nhận
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default ApproveOrder;

import React, { useState, useEffect } from "react";
import AxiosClient from "../../Axios/AxiosClient";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faLocationDot, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";

const ApproveOrder = ({ ListOfInvoice }) => {
  const [ListOfInvoiceApprove, setListOfInvoiceApprove] = useState([]);
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const [OrderDetails, setOrderDetails] = useState([]);
  const [showConfirm, setshowConfirm] = useState(false);
  const [selectedIdInvoice, setselectedIdInvoice] = useState({});
  const [Orderer, setOrderer] = useState({});

  const handleCloseConfirm = () => setshowConfirm(false);

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

  const handleShowConfirm = (invoiceId) => {
    setselectedIdInvoice(ListOfInvoiceApprove.find(a=> a.id == invoiceId))
    setshowConfirm(true);
  };

  const handleConfirm = () => {
    AxiosClient.delete(`Invoices/AdminConfirmOrder/${selectedIdInvoice.id}`).then(() => {
      setListOfInvoiceApprove(prevState => prevState.filter(invoice => invoice.id !== selectedIdInvoice.id));
      setshowConfirm(false);
    });
  };

  useEffect(() => {
    AxiosClient.get(`Invoices/ListOfOrder/approveOrder`).then((res) => {
      setListOfInvoiceApprove(res.data);
    });
  }, []);

  const handleLinkClickOrderer = (idinvoice) => {
    AxiosClient.get(`InvoiceDetails/orderer/${idinvoice}`).then((res) => {
      setOrderer(res.data);
    });
  };

  return (
    <>
      <div className="container mt-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={{ width: "20%", background: "rgb(230 229 229)" }}>Mã đơn hàng</th>
              <th style={{ width: "20%", background: "rgb(230 229 229)" }}>Ngày đặt hàng</th>
              <th style={{ width: "20%", background: "rgb(230 229 229)" }}>Số lượng/ GTĐH</th>
              <th style={{ width: "20%", background: "rgb(230 229 229)" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {ListOfInvoiceApprove.map((item, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>
                    <div>
                      <p style={{ color: "#2962FF" }}>{item.code}</p>
                    </div>
                  </td>
                  <td>
                    <div>{item.issueDate}</div>
                  </td>
    
                  <td>
                    <p>x{item.totalQuantity}</p>
                    <div>{item.total?.toLocaleString("en-US").replace(/,/g, ".")} ₫</div>
                    <div>{item.total} ₫</div>
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
                    <td colSpan="5" style={{ padding: "2rem", background: "rgb(248 248 248)" }}>
                      <div style={{ marginBottom: "1rem" }}>
                        <FontAwesomeIcon icon={faUser} />{" "}
                        <label style={{ margin: "0 1rem" }}>
                          {Orderer.orderersName}({Orderer.shippingPhone})
                        </label>{" "}
                        / <FontAwesomeIcon icon={faLocationDot} />{" "}
                        <label>{Orderer.shippingAddress}</label>
                      </div>
                      <table className="table table-bordered">
                        <thead>
                          <tr style={{ background: "rgb(230 229 229)" }}>
                            <th style={{ width: "10%" }}>Sản phẩm</th>
                            <th style={{ width: "10%" }}>Số lượng</th>
                            <th style={{ width: "10%" }}>Giá</th>
                          </tr>
                        </thead>
                        <tbody>
                          {OrderDetails.map((orderdetail, index1) => (
                            <tr key={index1}>
                              <td style={{ background: "#fff" }}>
                                <div style={{ display: "flex" }}>
                                  <div style={{ width: "85%" }}>
                                    <div>{orderdetail.name}</div>
                                    <div>{orderdetail.id}</div>
                                  </div>
                                </div>
                              </td>
                              <td style={{ background: "#fff" }}>
                                <div>x{orderdetail.quantity}</div>
                              </td>
                              <td style={{ background: "#fff" }}>
                                <div>
                                  {orderdetail.price?.toLocaleString("en-US").replace(/,/g, ".")} ₫
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div
                        style={{
                          background: "#fff",
                          border: "1px #e5e5e5 solid",
                          borderTop: "none",
                          height: "4rem",
                        }}
                      >
                        <Button
                          onClick={() => handleShowConfirm(item.id)}
                          className="btn btn-primary"
                          style={{
                            width: "20%",
                            margin: "1rem 1rem 0 0",
                            float: "right",
                          }}
                        >
                          Xác nhận
                        </Button>
                        <Button
                          onClick={() => setOpenRowIndex(null)}
                          className="btn btn-primary"
                          style={{
                            width: "10%",
                            margin: "1rem 1rem 0 0",
                            float: "right",
                          }}
                        >
                          Quay lại
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showConfirm} onHide={handleCloseConfirm} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Đơn hàng sẽ được xác nhận và không thể hoàn tác. Bạn có chắc chắn muốn xác nhận đơn hàng này?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirm}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ApproveOrder;
