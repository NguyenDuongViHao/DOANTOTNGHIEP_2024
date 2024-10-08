import { useEffect, useState } from "react";
import "./Main.css";
import { Container, Tab } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";

const SearchResultComponent = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  var mess;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [ProductList, setProductList] = useState([]);
  const [activeKey, setActiveKey] = useState("first");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  // pagination
  const [CurentProduct, setCurentProduct] = useState(1);
  const [ProductPerPage, setProductPerPage] = useState(20);
  const pageNumber = [];
  // pagination
  const indexOfLastProduct = CurentProduct * ProductPerPage;
  const indexOfFristProduct = indexOfLastProduct - ProductPerPage;
  const CurrentProducts = filteredProducts.slice(
    indexOfFristProduct,
    indexOfLastProduct
  ); //lấy từ vị trí phạm vi cụ thể
  for (
    let i = 1;
    i <= Math.ceil(filteredProducts.length / ProductPerPage);
    i++
  ) {
    //tạo số pagination
    pageNumber.push(i);
  }

  const handleFilter = () => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (!isNaN(min) && !isNaN(max)) {
      const filtered = ProductList.filter(
        (product) => product.price >= min && product.price <= max
      );
      setFilteredProducts(filtered);
    }
  };
  useEffect(() => {
    AxiosClient.get(`/Products/listProduct`)
      .then((res) => {
        const products = res.data;
        setProductList(products);

        if (query) {
          const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts(products);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, [location.search]);

  const paginate = (pageNumber) => {
    setCurentProduct(pageNumber);
    window.scrollTo(0, 300);
  };

  if (filteredProducts == 0) {
    mess = (
      <>
        <div>Không tìm thấy sản phẩm</div>
      </>
    );
  }

  console.log(filteredProducts);

  return (
    <>
      <div style={{ backgroundColor: "#efefef" }}>
        <div
          style={{
            backgroundColor: "#efefef",
            display: "grid",
            gridTemplateColumns: "1fr 250px",
            gap: "24px",
            width: "80%",
            margin: "0 auto",
          }}
        >
          <div>
            <div
              style={{
                backgroundColor: "#efefef",
                paddingTop: "2rem",
                paddingBottom: "2rem",
              }}
            >
              <div className="dDEtQq">
                <div className="cFhbdX">
                  <Link to="/" className="resultSearch">
                    Trang chủ
                  </Link>
                  <span style={{ margin: "10px" }}>{">"}</span>
                  <span className="resultSearch">
                    Kết quả tìm kiếm "{query}"
                  </span>
                </div>
              </div>
              <div className="product_container">
                <div className="product_frame">
                  <Container className="mt-3">
                    <Tab.Container
                      defaultActiveKey="first"
                      activeKey={activeKey}
                      onSelect={(k) => setActiveKey(k)}
                    >
                      <Tab.Content>
                        <Tab.Pane eventKey="first">
                          <div className="product-main">
                            {mess}
                            {CurrentProducts.map((item) => {
                              return (
                                <>
                                  <div className="product-item men">
                                    <div className="product discount product_filter">
                                      <div className="product_background">
                                        <div className="product_border">
                                          <div className="product_image">
                                            <Link to={`/detail/${item.id}`}>
                                              <img
                                                src={
                                                  item.imageName == null
                                                    ? `../3708994bdca38cd8dbea509f233f3cf4.jpg`
                                                    : `https://localhost:7073/Images/${item.imageName}`
                                                }
                                                alt=""
                                              />
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                      {/* <div className="favorite favorite_left" /> */}
                                      <div className="product_info">
                                        <h6 className="product_name">
                                          <Link to={`/detail/${item.id}`}>
                                            {item.name}
                                          </Link>
                                        </h6>
                                        <div className="product_price">
                                          {item.price
                                            .toLocaleString("en-US")
                                            .replace(/,/g, ".")}{" "}
                                          <sup>₫</sup>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="red_button add_to_cart_button">
                                      <a href="#">add to cart</a>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                          <div>
                            <ul className="pagination">
                              {pageNumber.map((item) => {
                                return (
                                  <li className="page-item" key={item}>
                                    <a
                                      href="#"
                                      className="page-link"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        paginate(item);
                                      }}
                                    >
                                      {item}
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </Container>
                </div>
              </div>
            </div>
          </div>

          <div
            className="brLIEg"
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              width: "100%",
              height: "200px",
            }}
          >
            <div className="cjqkgR">
              <div style={{ margin: "0 auto" }}>
                <div className="efUuhP">Tìm theo giá</div>

                <div class="price-range-containerSearch">
                  <div class="input-group">
                    <input
                      className="inputSearch"
                      type="number"
                      id="min-price"
                      name="min-price"
                      min="0"
                      step="10000"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <span style={{ margin: "0px", marginTop: "5px" }}>-</span>
                    <input
                      className="inputSearch"
                      type="number"
                      id="max-price"
                      name="max-price"
                      min="0"
                      step="10000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      style={{ width: "45%" }}
                    />
                  </div>
                  <button onClick={handleFilter} className="buttonSearch">
                    Áp dụng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResultComponent;
