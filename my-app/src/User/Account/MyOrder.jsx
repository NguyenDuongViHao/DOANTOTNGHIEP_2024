import { Card, Col, Nav, Tab, TabContainer } from "react-bootstrap";
import "./MyOrder.css";
import { useEffect, useState } from "react";
import AxiosClient from "../../Axios/AxiosClient";
import MyOrderInfo from "./MyOrderInfo";

const MyOrder = () => {
  const [ListOfOrders, setListOfOrders] = useState([]);
  const [activeKey, setActiveKey] = useState('default');
  const UserId = localStorage.getItem("userId");
  // nếu muốn test hãy nhập ID của user vào biến userId, chưa phan quyen
  //${userId}
  const handleNavSelect = (selectedKey) => {
    setActiveKey(selectedKey);
    AxiosClient.get(`/Invoices/UserListOfOrder/${selectedKey}/${UserId}`).then(
      (res) => {
        setListOfOrders(res.data);
      }
    );
  };

  useEffect(() => {
    handleNavSelect('default');
  }, []);
  console.log(ListOfOrders);

  return (
    <>
      <TabContainer defaultActiveKey="default">
        <div className="backgroundInfo1" style={{backgroundColor:"#efefef", borderRadius:"unset"}}>
          <Nav className="navbarMyorder1" onSelect={handleNavSelect}>
            <Nav.Item className={`itemnavbarMyorder1 ${activeKey === 'default' ? 'active' : ''}`} > 
              <Nav.Link eventKey="default">Tất cả đơn</Nav.Link>
            </Nav.Item>

            <Nav.Item className={`itemnavbarMyorder1 ${activeKey === 'ordered' ? 'active' : ''}`}>
              <Nav.Link eventKey="ordered">Chờ xử lý</Nav.Link>
            </Nav.Item>

            <Nav.Item className={`itemnavbarMyorder1 ${activeKey === 'confirmed' ? 'active' : ''}`}>
              <Nav.Link eventKey="confirmed">Đã xác nhận</Nav.Link>
            </Nav.Item>

            <Nav.Item className={`itemnavbarMyorder1 ${activeKey === 'delivered' ? 'active' : ''}`}>
              <Nav.Link eventKey="delivered">Đã giao</Nav.Link>
            </Nav.Item>

            <Nav.Item className={`itemnavbarMyorder1 ${activeKey === 'canceled' ? 'active' : ''}`}>
              <Nav.Link eventKey="canceled">Đã hủy</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        {/* <div style={{ backgroundColor:"#efefef", borderRadius:"unset", height:"20px"}}></div> */}
        <Tab.Content>
          <Tab.Pane eventKey="default">
            <MyOrderInfo ListOfOrder={ListOfOrders} />
          </Tab.Pane>

          <Tab.Pane eventKey="ordered">
            <MyOrderInfo ListOfOrder={ListOfOrders} />
          </Tab.Pane>

          <Tab.Pane eventKey="confirmed">
            <MyOrderInfo ListOfOrder={ListOfOrders} />
          </Tab.Pane>

          <Tab.Pane eventKey="delivered">
            <MyOrderInfo ListOfOrder={ListOfOrders} />
          </Tab.Pane>

          <Tab.Pane eventKey="canceled">
            <MyOrderInfo ListOfOrder={ListOfOrders} />
          </Tab.Pane>
        </Tab.Content>
      </TabContainer>
    </>
  );
};
export default MyOrder;
