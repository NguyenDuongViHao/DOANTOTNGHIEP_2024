import { Nav, Tab, TabContainer } from "react-bootstrap";
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
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading

  const handleNavSelect = async (selectedKey) => {
    setLoading(true); // Đặt trạng thái loading
    try {
      const response = await AxiosClient.get(`Invoices/ListOfOrder/${selectedKey}`);
      setListOfInvoice(response.data);
      console.log("ListOfInvoice sau khi fetch:", response.data); // Debugging
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    } finally {
      setLoading(false); // Xóa trạng thái loading
      setSearchTerm(''); // Xóa từ khóa tìm kiếm khi chuyển tab
    }
  };

  useEffect(() => {
    try {
      handleNavSelect('default');
    } catch {
      console.log("Lỗi");
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let url = `/Invoices/searchOrder?`;
        if (searchTerm.trim() !== '') {
          url += `searchTerm=${searchTerm}&`;
        }
        if (url.endsWith('&')) {
          url = url.substring(0, url.length - 1);
        }

        const response = await AxiosClient.get(url);
        setListOfInvoice(response.data);
        console.log("ListOfInvoice đã lọc:", response.data); // Debugging
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      }
    };

    fetchOrders();
  }, [searchTerm]);

  const filteredOrders = ListOfInvoice.filter((order) => {
    if (!order.Code) return false; // Kiểm tra nếu không có order.Code thì không lọc
    if (searchTerm === '') {
      return true;
    } else if (order.Code.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
    return false;
  });

  console.log("Danh sách đã lọc:", filteredOrders); // Debugging

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
              <input type="text" placeholder="Tìm kiếm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <Tab.Content>
              <Tab.Pane eventKey="default">
                <DefaultOrder ListOfInvoice={ListOfInvoice} loading={loading} />
              </Tab.Pane>

              <Tab.Pane eventKey="approveOrder">
                <ApproveOrder ListOfInvoice={ListOfInvoice} loading={loading} />
              </Tab.Pane>

              <Tab.Pane eventKey="confirmed">
                <ConfirmOrder ListOfInvoice={ListOfInvoice} loading={loading} />
              </Tab.Pane>

              <Tab.Pane eventKey="delivered">
                <DeliverOrder ListOfInvoice={ListOfInvoice} loading={loading} />
              </Tab.Pane>

              <Tab.Pane eventKey="canceled">
                <CancelOrder ListOfInvoice={ListOfInvoice} loading={loading} />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </TabContainer>
    </>
  );
};

export default OrderList;
