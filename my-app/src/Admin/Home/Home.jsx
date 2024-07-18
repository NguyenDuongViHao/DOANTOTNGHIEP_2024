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
  const [size, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [product, setProduct] = useState([]);
  const [listProductDetail, setListProductDetail] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [TotalQuantity, setTotalQuantity] = useState(0);
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

  useEffect(() => {
    // Gọi API để lấy tổng số lượng theo size
    const fetchSizes = async () => {
      try {
        const response = await AxiosClient.get('/Sizes');
        setSizes(response.data);
      } catch (error) {
        console.error('Error fetching sizes:', error);
      }
    };

    fetchSizes();
  }, []);

  const combinedDataFunc = (array1, array2) => {
    return array1.map(product => {
      const details = array2.filter(detail => detail.productId === product.id);
      const totalQuantity = details.reduce((acc, curr) => acc + curr.quantity, 0);
      return {
        productId: product.id,
        productName: product.name,
        quantity: totalQuantity
      };
    }).filter(product => product.quantity > 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const productResponse = await AxiosClient.get(`/Products`);
      const productDetailResponse = await AxiosClient.get(`/ProductDetails`);

      const productList = productResponse.data;
      const productDetailList = productDetailResponse.data;

      setProduct(productList);
      setCombinedData(combinedDataFunc(productList, productDetailList));
      const quantity = await AxiosClient.get(`/ProductDetails/sumquantity`);
      setTotalQuantity(quantity.data);
    }

    // Gọi API để lấy danh sách sản phẩm theo kích thước được chọn
    const fetchProductsBySize = async () => {
      try {
        const response = await AxiosClient.get(`/ProductDetails/totalsize/${selectedSize}`);

        setCombinedData(combinedDataFunc(product, response.data));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (selectedSize !== '') {
      fetchProductsBySize();
    } else {
      fetchData();
    }
  }, [selectedSize]);

  const handleSizeChange = async (e) => {
    setSelectedSize(e.target.value);
    let selectedSizeId = e.target.value;
    try {
      // Gọi API để lấy tổng số lượng sản phẩm cho size được chọn
      const totalQuantityResponse = await AxiosClient.get(`/ProductDetails/totalsizesum/${selectedSizeId}`);
      setTotalQuantity(totalQuantityResponse.data); // Cập nhật tổng số lượng vào state totalQuantity
    } catch (error) {
      console.error('Error fetching total quantity:', error);
    }
  }
  

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
                            <span style={{ color: 'white' }}
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
          <div className="col-md-12 inventory-management">
            <div className="card card-round">
              <div className="card-header">
                <div className="card-head-row">
                  <div className="card-title">Quản lý tồn kho</div>
                </div>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <div className="form-group">
                    <label htmlFor="size-select">Chọn kích thước:</label>
                    <select
                      id="size-select"
                      className="form-control"
                      value={selectedSize}
                      onChange={handleSizeChange}
                      style={{ width: "15%" }}
                    >
                      <option value="">Tất cả</option>
                      {size.map((size) => (
                        <option key={size.id} value={size.id}>
                          {size.nameSize}
                        </option>
                      ))}
                    </select>
                    <div className="mb-3 d-flex align-items-center">
                      <span style={{ marginRight: '10px' }}>Tổng số lượng:</span>
                      <strong style={{ fontSize: '1.2em' }}>{TotalQuantity}</strong>
                    </div>
                  </div>

                  <table className="table align-items-center mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" className="text-center" style={{ width: "15%" }}>Mã sản phẩm</th>
                        <th scope="col" className="text-center">Tên sản phẩm</th>
                        <th scope="col" className="text-center" style={{ width: "15%" }}>Số lượng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {combinedData.map((product, index) => (

                        <tr key={index}>
                          <th scope="row" className="text-center">{product.productId}</th>
                          <td>{product.productName}</td>
                          <td className="text-center">{product.quantity}</td>
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
