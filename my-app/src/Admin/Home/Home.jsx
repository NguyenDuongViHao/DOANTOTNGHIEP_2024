import React, { useState, useEffect } from "react";
//import RevenueChart from "./RevenueChart"; // Component để hiển thị biểu đồ doanh thu
import AxiosClient from "../../Axios/AxiosClient";
// import RevenueHome from "./RevenueHome";
import OrdersHome from "./OrdersHome";

const Home = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [memberCount, setMemberCount] = useState(0);
    const [monthlyOrderData, setMonthlyOrderData] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [monthlyPendingOrder, setMonthlyPendingOrder] = useState([]);
    const [statistics, setStatistics] = useState({
      currentMonth: '',
      numberOfInvoices: 0,
      totalRevenue: 0
  });
  const [monthlyStatistics, setMonthlyStatistics] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);
    useEffect(() => {
      const fetchStatistics = async () => {
          try {
              const response = await AxiosClient.get('/Invoices/statistics');
              setStatistics(response.data);
          } catch (error) {
              console.error('Error fetching statistics:', error);
          }
      };
  
      fetchStatistics();
  }, []); //fix rồi
  
  useEffect(() => {
    const fetchMonthlyInvoices = async () => {
      try {
        const response = await AxiosClient.get('/Invoices/monthlyCount'); // Replace with your actual API endpoint
        if (response.data.length > 0) {
          setMonthlyStatistics(response.data[0]);
        } else {
          setMonthlyStatistics(0);
        }
      } catch (err) {
        //setError(err.message);
      }
    };

    fetchMonthlyInvoices();
  }, []);
      useEffect(() => {
        const fetchMemberCount = async () => {
            try {
                const response = await AxiosClient.get(`Invoices/monthlyNewMembers?month=${month}&year=${year}`); // Thay thế URL này bằng URL API thực tế của bạn
                setMemberCount(response.data); // Giả sử API trả về một đối tượng có thuộc tính 'count'
            } catch (error) {
                console.error('Error fetching member count:', error);
            }
        };

        fetchMemberCount();
    }, []);
   
    useEffect(() => {
      const fetchPendingOrderByMonth = async () => {
        try {
          const response = await AxiosClient.get('/Invoices/PendingOrderByMonth');
          console.log('API response data:', response.data); // Log the API response
          setMonthlyPendingOrder(response.data);
        } catch (error) {
          console.error('Error fetching monthly revenue:', error);
        }
      };
  
      fetchPendingOrderByMonth();
    }, []);

      const fetchAvailableMonths = async () => {
        try {
          const response = await AxiosClient.get("/Invoices/AvailableMonths");
          setAvailableMonths(response.data);
        } catch (error) {
          console.error("Error fetching available years:", error);
        }
      };
      useEffect(() => {
        const fetchPendingInvoices = async () => {
          try {
            const response = await AxiosClient.get(`/Invoices/pending-invoices?year=${year}`); 
            setInvoices(response.data);
          } catch (error) {
            console.error('Error fetching pending invoices:', error);
          }
        };
    
        // const fetchPendingOrdersRevenue = async () => {
        //   try {
        //     const response = await AxiosClient.get(`/Invoices/pending-orders-revenue?year=${year}`);
        //     setRevenueByMonth(response.data);
        //   } catch (error) {
        //     console.error('Error fetching pending orders revenue:', error);
        //   }
        // };
        fetchAvailableMonths();
        fetchPendingInvoices();
        // fetchPendingOrdersRevenue();
      }, []);
      
      useEffect(() => {
        const fetchOrderCountByMonth = async () => {
          try {
            const response = await AxiosClient.get(
              `/Invoices/OrderCountByMonth?year=${year}`
            );
            setMonthlyOrderData(response.data);
          } catch (error) {
            console.error("Error fetching monthly revenue:", error);
          }
        };
    
        fetchOrderCountByMonth();
      }, []);


      


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
                          <h4> {statistics.totalRevenue}</h4>

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
                      <h4 className="card-title"> {monthlyStatistics.totalInvoices}</h4>

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
                      <h4 className="card-title">{memberCount.totalNewMembers}</h4>
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
                      <h4 className="card-title">{monthlyPendingOrder[0]?.pendingOrderCount}</h4>
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
                    Báo cáo số lượng đơn hàng theo tháng
                  </div>
                </div>
              </div>
              <div className="card-body">
                <OrdersHome data={monthlyOrderData} />
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

export default Home;
