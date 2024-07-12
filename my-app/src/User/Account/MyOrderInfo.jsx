import { useState } from "react";
import { Link } from "react-router-dom";

const MyOrderInfo = ({ ListOfOrder }) => {
  return (
    <>
      <table className="table" style={{margin:0}}>
        <thead>
          <tr>
            <th className="fgsfgs" style={{ width: "17%", letterSpacing:"0px", textTransform:"none"}}>Mã đơn hàng</th>
            <th className="fgsfgs" style={{ width: "17%", letterSpacing:"0px", textTransform:"none"}}>Ngày mua</th>
            <th className="fgsfgs" style={{ width: "32%", letterSpacing:"0px", textTransform:"none" }} >Sản phẩm</th>
            <th className="fgsfgs" style={{ width: "17%", letterSpacing:"0px", textTransform:"none"}}>Tổng tiền</th>
            <th className="fgsfgs" style={{ width: "17%", letterSpacing:"0px", textTransform:"none"}}>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {ListOfOrder.map((item) => {
            return (
              <tr>
                <td>
                  <Link to={`invoice/detail/${item.id}`}>{item.code}</Link>
                </td>
                <td>{item.issueDate}</td>
                {/* <td><Link to={`/detail/${item.ProductID}`}>{ item.nameProduct }</Link></td> */}
                <td><Link to={`/detail/${item.productId}`}>{item.nameProduct}</Link></td>
                <td>
                  {item.total.toLocaleString("en-US").replace(/,/g, ".")} ₫
                </td>
                <td>{item.approveOrder}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default MyOrderInfo;
