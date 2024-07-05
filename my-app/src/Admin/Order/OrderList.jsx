// import React, { useState, useEffect } from 'react';
// import './OrderList.css';
// import AxiosClient from '../../Axios/AxiosClient';

// const OrderList = () => {
//   const [orders, setOrders] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeTab, setActiveTab] = useState('all'); // State for active tab

//   const fetchOrders = (str = 'default') => {
//     AxiosClient.get(`Invoices/ListOfOrder/${str}`).then((res) => {
//       setOrders(res.data);
//     }).catch((error) => {
//       console.error("Error fetching orders:", error);
//     });
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const handleTabClick = (str) => {
//     setActiveTab(str);
//     fetchOrders(str === 'all' ? 'default' : str); // Map tab status to API endpoint parameter
//   };

//   const handleExport = () => {
//     // Placeholder function for export functionality
//     console.log('Exporting data...');
//   };

//   const handleCreateOrder = () => {
//     // Placeholder function for create order functionality
//     console.log('Creating order...');
//   };

//   const handleConfirmOrder = (id) => {
//     AxiosClient.post(`Invoices/AdminConfirmOrder/${id}`)
//       .then((res) => {
//         console.log('Order confirmed:', res.data);
//         fetchOrders(activeTab);
//       })
//       .catch((error) => {
//         console.error('Error confirming order:', error);
//       });
//   };
//   return (
//     <div className="containerorderadmin">
//       <div className="headerorderadmin">
//         <h1>Danh sách đơn hàng</h1>
//         <div className="buttons">
//           {/* <button className="export" onClick={handleExport}>Xuất dữ liệu</button> */}
//           {/* <button className="create" onClick={handleCreateOrder}>Tạo đơn hàng</button> */}
//         </div>
//       </div>
//       <div className="tabs">
//         <button className={activeTab === 'all' ? 'active' : ''} onClick={() => handleTabClick('all')}>Tất cả đơn hàng</button>
//         <button className={activeTab === 'approveOrder' ? 'active' : ''} onClick={() => handleTabClick('approveOrder')}>Chờ xử lý</button>
//         <button className={activeTab === 'confirmed' ? 'active' : ''} onClick={() => handleTabClick('confirmed')}>Đã xác nhận</button>
//         <button className={activeTab === 'delivered' ? 'active' : ''} onClick={() => handleTabClick('delivered')}>Đã giao </button>
//       </div>
//       <div className="search-bar">
//         <div className="filter">+ Thêm điều kiện lọc</div>
//         <input type="text" placeholder="Tìm kiếm" onChange={(e) => setSearchTerm(e.target.value)} />
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Id đơn hàng</th>
//             <th>Ngày tạo</th>
//             <th>Địa chỉ giao hàng</th>
//             <th>Số điện thoại</th>
//             <th>Giảm giá</th>
//             <th>Tổng tiền</th>
//             <th>Đơn hàng mới</th>
//             <th>Thao tác</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.filter((order) => {
//             if (searchTerm === '') {
//               return true;
//             } else if (order.Code.toLowerCase().includes(searchTerm.toLowerCase())) {
//               return true;
//             }
//             return false;
//           }).map((order) => (
//             <tr key={order.Id}>
//               <td>{order.code}</td>
//               <td>{order.issueDate}</td>
//               <td>{order.shippingAddress}</td>
//               <td>{order.shippingPhone}</td>
//               <td>{order.discount}</td>
//               <td>{order.total}</td>
//               <td>{order.approveOrder}</td>
//               <td>
//                 {order.approveOrder !== 'Đã xác nhận' ? (
//                   <button onClick={() => handleConfirmOrder(order.id)}>Xác nhận</button>
//                 ) : (
//                   <span>Đã xác nhận</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

import {  Nav, Tab, TabContainer } from "react-bootstrap";
import "./OrderList.css";
import AxiosClient from "../../Axios/AxiosClient";
import { useEffect, useState } from "react";
//import ConfirmOrder from "./ConfirmOrder";
// import TransferOrder from "./TranferOrder";
// import ApproveOrder from "./ApproveOrder";
import DefaultOrder from "./DefaultOrder";
import ApproveOrder from "./ApproveOrder";
import ConfirmOrder from "./ConfirmOrder";
import TransferOrder from "./TransferOrder";
import DeliverOrder from "./DeliverOrder";
import CancelOrder from "./CancelOrder";
//import CancelOrder from "./CancelOrder";
//import DeliverOrder from "./DeliverOrder";

const OrderList = () => {
  const [ListOfInvoice, setListOfInvoice] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleNavSelect = (selectedKey) => {
    AxiosClient.get(`Invoices/ListOfOrder/${selectedKey || 'default'}`).then((res) => {
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

