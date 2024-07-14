import React, { useEffect, useState } from "react";
import AxiosClient from "../../Axios/AxiosClient";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = ({ ListOfInvoice }) => {
  const [ListOfInvoiceConfirm, setListOfInvoiceConfirm] = useState([]);
  const [InvoiALLFirst, setInvoiALLFirst] = useState([]);
  const [showTransferAll, setshowTransferAll] = useState(false);
  const [showTransfer, setshowTransfer] = useState(false);
  const [selectedTransfer, setselectedTransfer] = useState(null);
  const navigate = useNavigate();

  // Function to handle checkbox change for bulk actions
  const handleCheckboxChangeAll = (id) => {
    const updatedInvoices = InvoiALLFirst.map((item) =>
      item.id == id ? { ...item, statusCheck: !item.statusCheck } : item
    );
    setInvoiALLFirst(updatedInvoices);
  };

  // Function to show the bulk transfer confirmation modal
  const handleShowTransferAll = () => {
    setshowTransferAll(true);
  };

  // Function to close the bulk transfer confirmation modal
  const handleCloseTransferAll = () => {
    setshowTransferAll(false);
  };

  // Function to handle bulk transfer of confirmed orders
  const handleTransferAll = (e) => {
    try {
      const confrimTransferAll = InvoiALLFirst.filter(
        (invoice) => invoice.statusCheck == true
      );
      confrimTransferAll.map((item) =>
        AxiosClient.delete(`Invoices/AdminTransport/${item.id}`)
      );
    } catch (error) {
      console.log("Validation error:", error);
    }
    setshowTransferAll(false);
    e.preventDefault();
  };

  // Function to show individual order transfer confirmation modal
  const handleShowTransfer = (id) => {
    const selectedInvoice = ListOfInvoiceConfirm.find((a) => a.id === id);
    setselectedTransfer(selectedInvoice);
    setshowTransfer(true);
  };

  // Function to close individual order transfer confirmation modal
  const handleCloseTransfer = () => {
    setshowTransfer(false);
  };

  // Function to confirm transfer of an individual order
  const handleTransfer = () => {
    AxiosClient.delete(`Invoices/AdminTransport/${selectedTransfer.id}`).then(
      () => {
        // After successful delete, update the list
        setListOfInvoiceConfirm((prevList) =>
          prevList.filter((invoice) => invoice.id !== selectedTransfer.id)
        );
        setshowTransfer(false);
      }
    );
  };

  // Fetch initial list of confirmed invoices when component mounts
  useEffect(() => {
    AxiosClient.get(`Invoices/ListOfOrder/confirmed`).then((res) => {
      setListOfInvoiceConfirm(res.data);
    });
  }, [ListOfInvoiceConfirm]);

  // Update InvoiALLFirst when ListOfInvoice changes
  useEffect(() => {
    setInvoiALLFirst(ListOfInvoice);
  }, [ListOfInvoice]);

  return (
    <div className="container mt-4">
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th style={{ width: "2%" }}></th>
            <th style={{ width: "20%" }}>Mã đơn hàng/ Ngày đặt hàng</th>
            <th style={{ width: "20%" }}>Số lượng</th>
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
                <div>{item.issueDate}</div>
              </td>
              <td>
                <p style={{ margin: 0 }}>x{item.totalQuantity}</p>
                <small>
                  {item.total?.toLocaleString("en-US").replace(/,/g, ".")} ₫
                </small>
              </td>
              <td className="text-center">
                <button
                  className="btn btn-primary"
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

      {/* Modal for bulk transfer confirmation */}
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

      {/* Modal for individual order transfer confirmation */}
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
