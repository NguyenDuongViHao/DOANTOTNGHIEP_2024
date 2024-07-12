import React, { useState, useEffect } from "react";
//import RevenueChart from "./RevenueChart"; // Component để hiển thị biểu đồ doanh thu
import AxiosClient from "../../Axios/AxiosClient";
import RevenueHome from "./RevenueHome";

const Chart = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthlyRevenueData, setMonthlyRevenueData] = useState([]);
  const [monthlyOrderData, setMonthlyOrderData] = useState([]);
  const [revenueCategoryData, setRevenueCategoryData] = useState([
    { categoryName: 'Quần', productCount: 100 },
    { categoryName: 'Áo', productCount: 150 },
    { categoryName: 'Váy', productCount: 70 },
    { categoryName: 'Vest', productCount: 220 },
    { categoryName: 'Nón', productCount: 90 },
  ])
  const [invoices, setInvoices] = useState([]);
  const [availableYears, setAvailableYears] = useState([2023, 2024]);

  useEffect(() => {
    fetchLatestInvoices();
    fetchAvailableYears();
  }, []);

  const fetchLatestInvoices = async () => {
        try {
          const response = await AxiosClient.get('Invoices/latest');
          setInvoices(response.data);
        } catch (error) {
          console.error('Error fetching latest invoices:', error);
     }
  };

  const fetchAvailableYears = async () => {
    try {
      const response = await AxiosClient.get("/Invoices/AvailableYears");
      setAvailableYears(response.data);
    } catch (error) {
      console.error("Error fetching available years:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          totalRevenueResponse,
          totalCountResponse,
          pendingCountResponse,
          memberCountResponse,
        ] = await Promise.all([
          AxiosClient.get("/Invoices/totalrevenue"),
          AxiosClient.get("/Invoices/totalcount"),
          AxiosClient.get("/Invoices/pendingcount"),
          AxiosClient.get("/Invoices/membercount"),
        ]);

        setTotalRevenue(totalRevenueResponse.data);
        setTotalCount(totalCountResponse.data);
        setPendingCount(pendingCountResponse.data);
        setMemberCount(memberCountResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchMonthlyStatistics = async () => {
      try {
        const response = await AxiosClient.get("/Invoices/MonthlyRevenue");
        setMonthlyRevenueData(response.data);
      } catch (error) {
        console.error("Error fetching monthly statistics:", error);
      }
    };

    fetchMonthlyStatistics();
  }, []);

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      try {
        if (year !== null) {
          const response = await AxiosClient.get(
            `/Invoices/MonthlyRevenue?year=${year}`
          );
          setMonthlyRevenueData(response.data);
        }
      } catch (error) {
        console.error("Error fetching monthly revenue:", error);
      }
    };

    fetchMonthlyRevenue();
  }, [year]);

  const handleYearChange = (e) => {
    const selectedYear = parseInt(e.target.value);
    setYear(selectedYear);
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
                    <div className="icon-big text-center icon-primary bubble-shadow-small">
                      <i className="fas fa-dollar-sign" />
                    </div>
                  </div>
                  <div className="col col-stats ms-3 ms-sm-0">
                    <div className="numbers">
                      <p className="card-category">Tổng doanh thu</p>
                      <h4 className="card-title">
                        {totalRevenue.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </h4>
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
                      <p className="card-category">Tổng đơn hàng</p>
                      <h4 className="card-title">{totalCount}</h4>
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
                      <h4 className="card-title">{memberCount}</h4>
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
                      <h4 className="card-title">{pendingCount}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor="yearSelect">Chọn năm:</label>
            <select
              id="yearSelect"
              className="form-control"
              style={{width: '30%'}}
              onChange={handleYearChange}
              value={year ?? ""}
            >
              <option value="" disabled>Select year</option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
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
                <RevenueHome data={monthlyRevenueData} /> 
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
                          <td className="text-end">
                            <span style={{color: 'white'}}
                              className={`badge badge-${
                                invoice.status ? "success" : "danger"
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
