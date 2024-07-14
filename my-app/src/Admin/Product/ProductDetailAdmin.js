import { useEffect, useState } from "react";
import AxiosClient from "../../Axios/AxiosClient";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductDetailAdmin = () => {
  var { id } = useParams();
  var str = 0;
  console.log(id);
  const [Products, setProducts] = useState([]);
  function storeCurrentPageUrl() {
    const currentPageUrl = window.location.href;
    localStorage.setItem("previousPageUrl", currentPageUrl);
  }
  storeCurrentPageUrl();
  const fetchProducts = () => {
    AxiosClient.get(`/ProductDetails/listProductDetail/${id}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const [productName, setProductName] = useState('');

  useEffect(() => {
    const fetchProductName = async () => {
      try {
        const response = await AxiosClient.get(`/Products/${id}`);
        setProductName(response.data.name);
      } catch (error) {
        console.error('Error fetching the product name:', error);
      }
    };

    fetchProductName();
  }, [id]);
  
  return (
    <>
      <div className="container productadmin">
        <div className="header productadmin">
          <h2 style={{fontSize:"20px"}}>Chi tiết sản phẩm: {productName}</h2>
          <Link
            to="/admin/products"
            className="btn btn-primary mb-2"
            style={{ marginLeft: "289px" }}
          >
            Quay lại
          </Link>
          <Link
            to={`/admin/productdetails/add/${id}`}
            className="btn btn-primary mb-2"
            style={{}}
          >
            Thêm chi tiết sản phẩm
          </Link>
        </div>

        <div className="product-section">
          <h3>Danh sách chi tiết sản phẩm</h3>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên Màu</th>
                <th>Kích thước </th>
                <th>Số lượng</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {Products.map((item) => {
                return (
                  <tr>
                    {/* <td className="product-name">
                //     <img src="https://via.placeholder.com/50" alt="Product Image" />
                //     Thanh Selenite Thô - Raw Selenite Bar
                //     <br />2 biến thể
                //   </td> */}
                    <td>{(str += 1)}</td>
                    <td>{item.color.nameColor}</td>
                    <td>{item.size.nameSize}</td>
                    <td>{item.quantity}</td>
                    <td>
                      {" "}
                      <Link
                        to={`/admin/productdetails/variation/${item.id}`}
                        className="btn btn-warning m-2"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th>STT</th>
                <th>Tên Màu</th>
                <th>Kích thước </th>
                <th>Số lượng</th>
                <th>Chức năng</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};
export default ProductDetailAdmin;
