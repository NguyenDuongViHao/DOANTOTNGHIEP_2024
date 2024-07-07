import {  Nav, Tab, TabContainer } from "react-bootstrap";
import "./OrderList.css";
import AxiosClient from "../../Axios/AxiosClient";
import { useEffect, useState } from "react";
import DefaultOrder from "./DefaultOrder";
import ApproveOrder from "./ApproveOrder";
import ConfirmOrder from "./ConfirmOrder";
import DeliverOrder from "./DeliverOrder";
import CancelOrder from "./CancelOrder";

const OrderList = () => {
  const [ListOfInvoice, setListOfInvoice] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleNavSelect = (selectedKey) => {
    AxiosClient.get(`Invoices/ListOfOrder/${selectedKey}`).then((res) => {
      setListOfInvoice(res.data);
    }).catch((error) => {
      console.error("Error fetching orders:", error);
    });
  };

  useEffect(() => {
    try {
      handleNavSelect('default');
    } catch {
      console.log("Error");
    }
  }, []);

  const filteredOrders = ListOfInvoice.filter((order) => {
    if (searchTerm === '') {
      return true;
    } else if (order.Code.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
    return false;
  });

  return (
    <>
      <TabContainer defaultActiveKey="default" onSelect={handleNavSelect}>
        <div className="backgroundInfo">
          <div>
            <div className="headernavbar">
              <h3>Danh sách đơn hàng</h3>
            </div>

            <div className="ishnWO ">
              <div className="dfCYMAa">
                <Nav className="krSXKE">
                  <Nav.Item className="itemavbarMyorder">
                    <Nav.Link eventKey="default">Tất cả đơn</Nav.Link>
                  </Nav.Item>

                  <Nav.Item className="itemavbarMyorder">
                    <Nav.Link eventKey="approveOrder">Chờ xác nhận</Nav.Link>
                  </Nav.Item>

                  <Nav.Item className="itemavbarMyorder">
                    <Nav.Link eventKey="confirmed">Đã xác nhận</Nav.Link>
                  </Nav.Item>

                  <Nav.Item className="itemavbarMyorder">
                    <Nav.Link eventKey="delivered">Đã giao</Nav.Link>
                  </Nav.Item>

                  <Nav.Item className="itemavbarMyorder">
                    <Nav.Link eventKey="canceled">Đơn hủy</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>

            <div className="search-bar">
              {/* <div className="filter">+ Thêm điều kiện lọc</div> */}
              <input type="text" placeholder="Tìm kiếm" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <Tab.Content>
              <Tab.Pane eventKey="default">
                <DefaultOrder ListOfInvoice={filteredOrders} />
              </Tab.Pane>

              <Tab.Pane eventKey="approveOrder">
                <ApproveOrder ListOfInvoice={filteredOrders} />
              </Tab.Pane>

              <Tab.Pane eventKey="confirmed">
                <ConfirmOrder ListOfInvoice={filteredOrders} />
              </Tab.Pane>

              <Tab.Pane eventKey="delivered">
                <DeliverOrder ListOfInvoice={filteredOrders} />
              </Tab.Pane>

              <Tab.Pane eventKey="canceled">
                <CancelOrder ListOfInvoice={filteredOrders} />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </TabContainer>
    </>
  );
};

export default OrderList;

