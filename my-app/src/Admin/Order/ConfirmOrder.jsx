import { useEffect, useState } from "react";
import AxiosClient from "../../Axios/AxiosClient";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const ConfirmOrder = ({ ListOfInvoice }) => {
  const [ListOfInvoiceConfirm, setListOfInvoiceConfirm] = useState([]);
  const [InvoiALLFirst, setInvoiALLFirst] = useState([]);
  const [showTransferAll, setshowTransferAll] = useState(false);
  const [showTransfer, setshowTransfer] = useState();
  const [selectedTransfer, setselectedTransfer] = useState(false);

  const handleCheckboxChangeAll = (Id) => {
    const markTheInvoice = InvoiALLFirst.map((item) =>
      item.id === Id ? { ...item, statusCheck: !item.statusCheck } : item
    );
    console.log(markTheInvoice);
    setInvoiALLFirst(markTheInvoice);
  };
  const handleShowTransferAll = () => {
    setshowTransferAll(true);
  };
  const handleCloseTransferAll = () => setshowTransferAll(false);
  const handleTransferAll = (e) => {
    e.preventDefault();
    try {
      const confrimTransferAll = InvoiALLFirst.filter(
        (invoice) => invoice.statusCheck === true
      );
      confrimTransferAll.map((item) =>
        AxiosClient.delete(`Invoices/AdminTransport/${item.id}`)
      );
    } catch (error) {
      console.log("Validation error:", error);
    }
    setshowTransferAll(false);
  };

  const handleShowTransfer = (id) => {
    setselectedTransfer(ListOfInvoiceConfirm.find((a) => a.id === id));
    setshowTransfer(true);
  };
  const handleCloseTransfer = () => setshowTransfer(false);
  const handleTransfer = () => {
    AxiosClient.delete(`Invoices/AdminTransport/${selectedTransfer.id}`);
    setshowTransfer(false);
  };

  useEffect(() => {
    setInvoiALLFirst(ListOfInvoice);
  }, [ListOfInvoice]);

  useEffect(() => {
    AxiosClient.get(`Invoices/ListOfOrder/confirmed`).then((res) => {
      setListOfInvoiceConfirm(res.data);
    });
  }, [ListOfInvoiceConfirm]);


  return (
    <div className="container mt-4">
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th style={{ width: "2%" }}></th>
            <th style={{ width: "20%" }}>Mã đơn hàng/ Ngày đặt hàng</th>
            {/* <th style={{ width: "20%" }}>Trạng thái</th> */}
            <th style={{ width: "20%" }}>Số lượng/ GTĐH</th>
            <th style={{ width: "20%" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {ListOfInvoiceConfirm.map((item, index) => (
            <tr key={index}>
              <td className="text-center">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChangeAll(item.id)}
                />
              </td>
              <td>
                <p style={{ color: "#2962FF", margin: 0 }}>{item.code}</p>
                <small>{item.issuedDate}</small>
              </td>
              {/* <td className="text-center">
                <span
                  className="badge badge-success"
                  style={{
                    backgroundColor: "rgb(197, 255, 217)",
                    borderRadius: "4px",
                    padding: "5px",
                  }}
                >
                  {item.approveOrder}
                </span>
              </td> */}
              <td>
                <p style={{ margin: 0 }}>x{item.totalQuantity}</p>
                <small>{item.total?.toLocaleString("en-US").replace(/,/g, ".")} ₫</small>
              </td>
              <td className="text-center">
                <button
                  className="btn btn-primary" style={{display:"flex"}}
                  onClick={() => handleShowTransfer(item.id)}
                >
                  Xác nhận
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-warning" onClick={handleShowTransferAll}>
        Xác nhận hàng loạt
      </button>

      <Modal show={showTransferAll} onHide={handleCloseTransferAll} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận hàng loạt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tất cả đơn hàng sẽ chuyển sang trạng thái <b>đã giao</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleTransferAll}>
            <FontAwesomeIcon icon={faCheck} /> Đồng ý
          </Button>
          <Button variant="secondary" onClick={handleCloseTransferAll}>
            <FontAwesomeIcon icon={faTimes} /> Hủy
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showTransfer} onHide={handleCloseTransfer} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Đơn hàng sẽ chuyển sang trạng thái <b>đã giao</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleTransfer}>
            <FontAwesomeIcon icon={faCheck} /> Đồng ý
          </Button>
          <Button variant="secondary" onClick={handleCloseTransfer}>
            <FontAwesomeIcon icon={faTimes} /> Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ConfirmOrder;
