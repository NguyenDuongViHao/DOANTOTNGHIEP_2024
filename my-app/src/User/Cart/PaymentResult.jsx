import React, { useEffect, useState } from 'react';
import AxiosClient from '../../Axios/AxiosClient';
import { Link, useLocation } from 'react-router-dom';
import "./PaymentResult.css"
import { Button } from 'react-bootstrap';
const PaymentResult = () => {
        const location = useLocation();
        const [status, setStatus] = useState(null);
        const UserId = localStorage.getItem("userId");
        const totalPaymentOnline = localStorage.getItem("TotalPaymentOnline");
        const discountOnline = localStorage.getItem("DiscountOnline");
        const [codeOrders, setCodeOrders] = useState({});

        const [User, setUser] = useState({});
        //nếu thành công thì lưu , và ngược lại

        useEffect(() => {
          const fetchPaymentStatus = async () => {
            try {
                await AxiosClient.get(`/Payment/PaymentCallback/${location.search}`).then((res)=>{ //${location.search} tham số querystring
                setStatus(res.data);
                const invoiceData = {
                    // UserId: UserId,
                    ShippingAddress: User.shippingAddress,
                    ShippingPhone: User.shippingPhone,
                    Total: totalPaymentOnline,
                    Discount: discountOnline,
                    COD: false,
                    Vnpay: true,
                  };
                if (res.data.vnPayResponseCode === '00'){
                    AxiosClient.post(`/Carts/pay/${UserId}`, invoiceData)
                    .then((res) => {
                        setCodeOrders(res.data);
                        console.log("Create Invoice Success", res.data);
                    })
                    .catch((error) => {
                      console.error("Error while posting COD payment:", error);
                    });
                }
              });     
            } catch (error) {
              console.error('Error fetching payment status:', error);
            }
          };
      
          fetchPaymentStatus();
        }, [location.search]);

        useEffect(() => {
            AxiosClient.get(`/Users/${UserId}`).then((res) => {
              setUser(res.data);
            });
          }, [UserId]);

        const rendermessage = ()=>{
            switch (status.vnPayResponseCode) {
                case '00':
                  return <h2>Giao dịch thành công.</h2>;
                case '10':
                  return <h2>Xác thực quá 3 lần</h2>;
                case '11':
                  return <h2>Đã hết hạn chờ thanh toán</h2>;
                case '12':
                  return <h2>Thẻ/Tài khoản bị khóa.</h2>;
                case '13':
                  return <h2>Nhậh2 mã xác thực giao dịch (OTh2).</h2>;
                case '24':
                  return <h2>Hủy giao dịch</h2>;
                case '51':
                  return <h2>Tài khoản không đủ số dư để thực hiện giao dịch</h2>;
                case '65':
                    return <h2>Tài khoản đã vượt quá hạn mức giao dịch trong ngày</h2>;
                case '75':
                    return <h2>Ngân hàng thanh toán đang bảo trì</h2>;
                case '79':
                    return <h2>Nhậh2 sai mật khẩu thanh toán quá số lần quy định</h2>;
                case '99':
                    return <h2>Tài khoản không đủ số dư để thực hiện giao dịch.</h2>;
                default:
                  return <h2>Giao dịch thất bại</h2>;
        }
    }
      
        return (         
          <div>           
            {status ? (
              <div className="payment-success-container">
              <div className="payment-success-card">
               {status.vnPayResponseCode == '00'
                ?  <div className="success-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" width="48px" height="48px">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm-1 17.93l-5.93-5.93L7.5 10.5 11 14l6.5-6.5 1.43 1.43L11 17.93z"/>
                    </svg>
                </div>
                : <div className="failure-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="48px" height="48px">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.65 16.34L16.34 17.65 12 13.31 7.66 17.65 6.34 16.34 10.69 12 6.34 7.66 7.66 6.34 12 10.69 16.34 6.34 17.65 7.66 13.31 12 17.65 16.34z"/>
                </svg>
                </div>}
                {rendermessage()}
                <p>Mã số đơn hàng của bạn {codeOrders ? <span className="order-id">{codeOrders.codeOnline}</span> : <span className="order-id">chưa tạo</span>}.</p>
                <p>Bạn có thể xem chi tiết trong <Link to="/order" className="order-link">đơn hàng của tôi</Link>.</p>
                <p>{status.orderDescription}</p>
                <button className="continue-shopping-button" onClick={() => window.location.href = '/'}>Tiếp tục mua hàng</button>
              </div>
            </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        );
};

export default PaymentResult;