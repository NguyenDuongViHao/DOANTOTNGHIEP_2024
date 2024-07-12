import "./Main.css";
import Tab from "react-bootstrap/Tab";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AxiosClient from "../../Axios/AxiosClient";
import { Col, Container, Nav, Row } from "react-bootstrap";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Main = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [ProductList, setProductList] = useState([]);
  const [TheHasBeenFilter, setTheHasBeenFilter] = useState([]);
  const [ListProductFrist, setListProductFrist] = useState();
  const [activeKey, setActiveKey] = useState("first");
  const [activeKeyCategory, setactiveKeyCategory] = useState(null);
  // pagination
  const [CurentProduct, setCurentProduct] = useState(1);
  const [ProductPerPage, setProductPerPage] = useState(20);
  const pageNumber = [];

  //tim theo giá
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  // danh mục
  const [SelectedCategory, setSelectedCategory] = useState(null);
  const [CategoryList, setCategoryList] = useState([]);

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
  const paginate = (pageNumber) => {
    setCurentProduct(pageNumber);
    window.scrollTo(0, 300);
  };

  const handleCatagories = (item) => {
    const filtered = ProductList.filter((a) => a.categoryName === item);
    setFilteredProducts(filtered);
    setTheHasBeenFilter(filtered); // đã lọc mặc định
    console.log(filtered);
    window.scrollTo(0, 300);
    setActiveKey(activeKey);
    setactiveKeyCategory(item) // cần sửa
  };

  const handProductDefault = () => {
    setFilteredProducts(TheHasBeenFilter);
  };

  const handProductIncrease = () => {
    const sortedIncrease = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
    setFilteredProducts(sortedIncrease);
  };

  const handProductDecrease = () => {
    const sortedIncrease = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
    setFilteredProducts(sortedIncrease);
  };

  const handProductNews = () => {
    const sortedNews = [...filteredProducts].sort(
      (a, b) => new Date(b.createTime) - new Date(a.createTime)
    );
    setFilteredProducts(sortedNews);
  };

  const handleFilter = () => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (min != 0 && max != 0) {
      const filtered = filteredProducts.filter(
        (product) => product.price >= min && product.price <= max
      );
      setFilteredProducts(filtered);
    }
    else{    
        setFilteredProducts(ListProductFrist);
    }
  };

  useEffect(() => {
    AxiosClient.get(`/Products/listProduct`)
      .then((res) => {
        setFilteredProducts(res.data);
        setProductList(res.data);
        setTheHasBeenFilter(res.data);
        setListProductFrist(res.data)
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  console.log(ProductList);

  useEffect(() => {
    AxiosClient.get(`/Categories`)
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  console.log(CategoryList);

  return (
    <>
      <div className="dOGdaN">
        <div className="bsxLcZ">
          <div className="jZosWU">
            <div className="cjqkgR">
              <div className="efUuhP">Danh mục</div>
              {CategoryList.map((item) => {
                return (
                  <>
                    <div className={`bHIPhv ${item.name === activeKeyCategory ? 'active' : ''}`}>
                      <a
                        href="#"
                        title={item.name}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCatagories(item.name);
                        }}
                      >
                        <div className="iFfPOy">
                          <img
                            src="https://salt.tikicdn.com/cache/280x280/ts/product/da/c6/46/bf1ef8e107bea1ba17041f4f84b6b069.jpg"
                            alt="hinhanh"
                          />
                        </div>
                        <div className="ctcPzh">{item.name}</div>
                      </a>
                    </div>
                  </>
                );
              })}
            </div>

            <div className="cjqkgR">
              <div>
                <div className="efUuhP">Tìm theo giá</div>

                <div class="price-range-container">
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
                    />
                  </div>
                  <button onClick={handleFilter} className="buttonSearch">
                    Áp dụng
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mxUBJ">
            <div className="dDEtQq">
              <div className="cFhbdX">
                <h2>Tất cả sản phẩm</h2>
              </div>
            </div>

            <div style={{ marginTop: "12px", backgroundColor: "white" }}>
              <div className="slick-slider jgCwDI slick-initialized">
                <Swiper
                  watchSlidesProgress={true}
                  slidesPerView={2}
                  modules={[Pagination, Navigation]}
                  loop={true}
                  navigation={true}
                  className="mySwiper"
                  pagination={{
                    clickable: true,
                  }}
                >
                  {
                    <>
                      <SwiperSlide className="main-swiper-slide">
                        <a href="" className="wbnRK">
                          <div className={`carousel-item active`}>
                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/da/c6/46/bf1ef8e107bea1ba17041f4f84b6b069.jpg" />
                          </div>
                        </a>
                      </SwiperSlide>

                      <SwiperSlide className="main-swiper-slide">
                        <a href="" className="wbnRK">
                          <div className={`carousel-item active`}>
                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/da/c6/46/bf1ef8e107bea1ba17041f4f84b6b069.jpg" />
                          </div>
                        </a>
                      </SwiperSlide>

                      <SwiperSlide className="main-swiper-slide">
                        <a href="" className="wbnRK">
                          <div className={`carousel-item active`}>
                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/da/c6/46/bf1ef8e107bea1ba17041f4f84b6b069.jpg" />
                          </div>
                        </a>
                      </SwiperSlide>
                    </>
                  }
                </Swiper>
              </div>
            </div>

            <div className="cFhbdX" style={{ marginTop: "1rem" }}>
              <div className="sort-list mb-3" id="noanim-tab-example">
                <Nav variant="pills">
                  <Nav.Item className="navitem1">
                    <Nav.Link
                      eventKey="first"
                      onClick={handProductDefault}
                      style={{ border: "solid 1px gray", borderRadius: "16px" }}
                    >
                      Phổ Biến
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="navitem1">
                    <Nav.Link
                      eventKey="second"
                      onClick={handProductIncrease}
                      style={{ border: "solid 1px gray", borderRadius: "16px" }}
                    >
                      Giá Thấp Đến Cao
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="navitem1">
                    <Nav.Link
                      eventKey="third"
                      onClick={handProductDecrease}
                      style={{ border: "solid 1px gray", borderRadius: "16px" }}
                    >
                      {" "}
                      Giá Cao Đến Thấp
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="navitem1">
                    <Nav.Link
                      eventKey="Fourth"
                      onClick={handProductNews}
                      style={{ border: "solid 1px gray", borderRadius: "16px" }}
                    >
                      {" "}
                      Hàng mới
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <div
                  style={{ borderTop: "0.5px solid gray", margin: "1rem 0" }}
                ></div>
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
                          {CurrentProducts.map((item) => {
                            return (
                              <>
                                <div className="product-item men">
                                  <div
                                    className="product discount product_filter"
                                    style={{ margin: "0 auto", width: "90%" }}
                                  >
                                    <div className="product_background">
                                      <div className="product_border">
                                        <div className="product_image">
                                        <Link to={`detail/${item.id}`}>
                                        <img
                                            src={`https://localhost:7073/images/${item.imageName}`}
                                            alt=""
                                          />
                                        </Link>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="favorite favorite_left" />
                                    <div className="product_info">
                                      <h6 className="product_name">
                                        <Link to={`detail/${item.id}`}>
                                          {item.name}
                                        </Link>
                                      </h6>
                                      <div className="product_price">
                                        {item.price.toLocaleString("en-US")
                                        .replace(/,/g, ".")}<sup>₫</sup>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="red_button add_to_cart_button">
                                    <Link to={`detail/${item.id}`}>
                                      Xem chi tiết
                                    </Link>
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
                      <Tab.Pane eventKey="second">
                        <div className="product-main">
                          {CurrentProducts.map((item) => {
                            return (
                              <>
                                <div className="product-item men">
                                  <div className="product discount product_filter">
                                    <div className="product_background">
                                      <div className="product_border">
                                        <div className="product_image">
                                        <Link to={`detail/${item.id}`}>
                                        <img
                                            src={`https://localhost:7073/images/${item.imageName}`}
                                            alt=""
                                          />
                                        </Link>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="favorite favorite_left" />
                                    <div className="product_info">
                                      <h6 className="product_name">
                                        <Link to={`detail/${item.id}`}>
                                          {item.name}
                                        </Link>
                                      </h6>
                                      <div className="product_price">
                                        {item.price.toLocaleString("en-US")
                                        .replace(/,/g, ".")} <sup>₫</sup>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="red_button add_to_cart_button">
                                    <Link to={`detail/${item.id}`}>
                                      Xem chi tiết
                                    </Link>
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
                      <Tab.Pane eventKey="third">
                        <div className="product-main">
                          {CurrentProducts.map((item) => {
                            return (
                              <>
                                <div className="product-item men">
                                  <div className="product discount product_filter">
                                    <div className="product_background">
                                      <div className="product_border">
                                        <div className="product_image">
                                        <Link to={`detail/${item.id}`}>
                                        <img
                                            src={`https://localhost:7073/images/${item.imageName}`}
                                            alt=""
                                          />
                                        </Link>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="favorite favorite_left" />
                                    <div className="product_info">
                                      <h6 className="product_name">
                                        <Link to={`detail/${item.id}`}>
                                          {item.name}
                                        </Link>
                                      </h6>
                                      <div className="product_price">
                                        {item.price.toLocaleString("en-US")
                                        .replace(/,/g, ".")} <sup>₫</sup>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="red_button add_to_cart_button">
                                    <Link to={`detail/${item.id}`}>
                                      Xem chi tiết
                                    </Link>
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
                      <Tab.Pane eventKey="Fourth">
                        <div className="product-main">
                          {CurrentProducts.map((item) => {
                            return (
                              <>
                                <div className="product-item men">
                                  <div className="product discount product_filter">
                                    <div className="product_background">
                                      <div className="product_border">
                                        <div className="product_image">
                                        <Link to={`detail/${item.id}`}>
                                        <img
                                            src={`https://localhost:7073/images/${item.imageName}`}
                                            alt=""
                                          />
                                        </Link>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="favorite favorite_left" />
                                    <div className="product_info">
                                      <h6 className="product_name">
                                        <Link to={`detail/${item.id}`}>
                                          {item.name}
                                        </Link>
                                      </h6>
                                      <div className="product_price">
                                        {item.price.toLocaleString("en-US")
                                        .replace(/,/g, ".")} <sup>₫</sup>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="red_button add_to_cart_button">
                                    <Link to={`detail/${item.id}`}>
                                      Xem chi tiết
                                    </Link>
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
      </div>
    </>
  );
};

export default Main;
