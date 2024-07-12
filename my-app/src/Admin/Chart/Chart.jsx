import React, { useState, useEffect } from "react";
import OrdersChart from "./OrdersChart"; // Component để hiển thị biểu đồ doanh thu
import AxiosClient from "../../Axios/AxiosClient";

const Chart = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [months, setMonths] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [highestMonthCount, setHighestMonthCount] = useState(null);
  const [revenueByMonth, setRevenueByMonth] = useState([]);
  const [monthlyOrderData, setMonthlyOrderData] = useState([]);
  const [invoices, setInvoices] = useState([]);

  // const [monthlyRevenueData, setMonthlyRevenueData] = useState([]);

  const [availableMonths, setAvailableMonths] = useState([2023, 2024]);

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      try {
        const response = await AxiosClient.get(`/Invoices/monthly?year=${year}`);
        console.log('API Response:', response.data); // Thêm dòng này để kiểm tra dữ liệu trả về
        setMonthlyRevenue(response.data);
      } catch (error) {
        console.error('Failed to fetch monthly revenue:', error);
      }
    };

    fetchMonthlyRevenue();
  }, []);

  useEffect(() => {
    const fetchHighestMonthCount = async () => {
      try {
        const response = await AxiosClient.get(`/Invoices/highestmonthcount?year=${year}`);
        setHighestMonthCount(response.data);
      } catch (error) {
        console.error('Failed to fetch highest month count:', error);
      }
    };

    fetchHighestMonthCount();
  }, []); // Gọi API chỉ khi component được tải lần đầu

  useEffect(() => {
    const fetchPendingInvoices = async () => {
      try {
        const response = await AxiosClient.get('/Invoices/pending-invoices?year=2024'); // Thay đổi your-api-url thành URL thực tế của API
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching pending invoices:', error);
      }
    };

    const fetchPendingOrdersRevenue = async () => {
      try {
        const response = await AxiosClient.get('/Invoices/pending-orders-revenue?year=2024'); // Thay đổi your-api-url thành URL thực tế của API
        setRevenueByMonth(response.data);
      } catch (error) {
        console.error('Error fetching pending orders revenue:', error);
      }
    };

    fetchPendingInvoices();
    fetchPendingOrdersRevenue();
  }, []);

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      try {
        const response = await AxiosClient.get(
          `/Invoices/OrderMonthlyRevenue?year=${year}`
        );
        setMonthlyOrderData(response.data);
      } catch (error) {
        console.error("Error fetching monthly revenue:", error);
      }
    };

    fetchMonthlyRevenue();
  }, []);

  useEffect(() => {
    // fetchLatestInvoices();
    fetchAvailableMonths();
  }, []);
  const fetchAvailableMonths = async () => {
      try {
        const response = await AxiosClient.get("/Invoices/AvailableMonths");
        setAvailableMonths(response.data);
      } catch (error) {
        console.error("Error fetching available years:", error);
      }
    };
  return (
    <div className="container">
      <div className="page-inner">
        <div className="row">
          <div className="col-sm-6 col-md-3">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-icon">
                    <div className="icon-big text-center icon-danger bubble-shadow-small">
                      <i className="fas fa-dollar-sign" />
                    </div>
                  </div>
                  <div className="col col-stats ms-3 ms-sm-0">
                    <div className="row">
                      <div className="col col-stats ms-3 ms-sm-0">
                        <div className="numbers">
                          <p className="card-category">Doanh thu theo tháng</p>
                          <h4 className="card-title">
                            {monthlyRevenue}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-icon">
                    <div className="icon-big text-center icon-info bubble-shadow-small">
                      <i className="fas fa-shopping-cart" />
                    </div>
                  </div>
                  <div className="col col-stats ms-3 ms-sm-0">
                    <div className="numbers">
                      <p className="card-category">Đơn hàng theo tháng</p>
                      <h4 className="card-title">{highestMonthCount}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-icon">
                    <div className="icon-big text-center icon-success bubble-shadow-small">
                      <i className="fas fa-users" />
                    </div>
                  </div>
                  <div className="col col-stats ms-3 ms-sm-0">
                    <div className="numbers">
                      <p className="card-category">Thành viên mới</p>
                      {/* <h4 className="card-title">{memberCount}</h4> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-icon">
                    <div className="icon-big text-center icon-secondary bubble-shadow-small">
                      <i className="fas fa-hourglass-half" />
                    </div>
                  </div>
                  <div className="col col-stats ms-3 ms-sm-0">
                    <div className="numbers">
                      <p className="card-category">Đơn hàng chờ duyệt</p>
                      <h4 className="card-title">{revenueByMonth}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="card card-round">
              <div className="card-header">
                <div className="card-head-row">
                  <div className="card-title">
                    Báo cáo doanh thu theo tháng
                  </div>
                </div>
              </div>
              <div className="card-body">
                <OrdersChart data={monthlyOrderData} />
              </div>
            </div>
          </div>
          <div className="col-md-4 new-orders">
            <div className="card card-round">
              <div className="card-header">
                <div className="card-head-row">
                  <div className="card-title">Danh sách đơn hàng chờ duyệt</div>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table align-items-center mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" className="text-center">Mã đơn hàng</th>
                        <th scope="col" className="text-center">
                          Tên khách hàng
                        </th>
                        <th scope="col" className="text-center">
                          Trạng thái
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice, index) => (
                        <tr key={index}>
                          <th scope="row">
                            <button className="btn btn-icon btn-round btn-danger btn-sm me-2">
                              <i className="fa fa-times" />
                            </button>
                            {invoice.code}
                          </th>
                          <td>{invoice.user.fullName}</td>
                          <td className="text-center">
                            <span
                              className={`badge badge-${invoice.status ? "success" : "danger"
                                }`}
                            >
                              {invoice.status ? "Hoàn thành" : "Chưa hoàn thành"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
