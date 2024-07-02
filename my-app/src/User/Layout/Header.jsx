import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./style.css";
import { Button, Modal } from "react-bootstrap";
import AxiosClient from "../../Axios/AxiosClient";

const Header = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [show, setShow] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    setQuery(event.target.value); // Lưu query vào state
    setShow(true);

    if (event.target.value.trim() === "") {
      const randomItems = getRandomItems(allItems, 5);
      setFilteredItems(randomItems);
    } else {
      const filtered = allItems.filter((item) =>
        item.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredItems(filtered.slice(0, 8));
    }
  };

  const getRandomItems = (array, number) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, number);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    AxiosClient.get(`/Products/listProduct`).then((res) => {
      setAllItems(res.data); // Lưu toàn bộ sản phẩm vào state
      setFilteredItems(res.data); // Hiển thị tất cả sản phẩm lúc đầu
    });
  }, []);

  return (
    <>
      <header
        className="header trans_300"
        onClick={handleClose}
        style={{ height: "80px" }}
      >
        <div
          className="main_nav_container"
          style={{ borderRadius: "unset", height: "100%" }}
        >
          <div className="container" style={{ height: "100%" }}>
            <div className="row" style={{ height: "100%" }}>
              <div className="col-lg-12 text-right" style={{ height: "100%" }}>
                <div className="logo_container" style={{ zIndex: 2 }}>
                  <Link to="/">
                    clt<span>shop</span>
                  </Link>
                </div>

                <div className="huqeuo">
                  <div className="edlkEo">
                    <div className="hBRVdJ">
                      <div className="hULqIV">
                        <div className="cTCXTh">
                          <img
                            class="icon-search"
                            src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png"
                            alt="icon-search"
                            style={{ height: "100%" }}
                          />
                          <input
                            type="text"
                            name=""
                            id=""
                            className="IXqBC"
                            style={{ height: "100%" }}
                            value={query}
                            onChange={handleSearch}
                          />
                           <Link to={`/search-results?query=${encodeURIComponent(query)}`}>Tìm kiếm</Link>
                          {show && (
                            <div className="jlBoKO">
                              <div className="gyELMq">
                                {filteredItems.map((item) => (
                                  <a
                                    href={`detail/${item.id}`}
                                    className="item"
                                    key={item.id}
                                  >
                                    <img
                                      src="https://salt.tikicdn.com/ts/upload/e8/aa/26/42a11360f906c4e769a0ff144d04bfe1.png"
                                      class="item-icon"
                                    />
                                    <div className="keyword">{item.name}</div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="hkQlMw">
                      <div className="fUChpf">
                        <img
                          src="https://salt.tikicdn.com/ts/upload/b4/90/74/6baaecfa664314469ab50758e5ee46ca.png"
                          alt="header_menu_item_home"
                        />
                        <a href="" style={{ color: "rgb(128, 128, 137)" }}>
                          Trang chủ
                        </a>
                      </div>
                      <div className="fUChpf">
                        <img
                          src="https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png"
                          alt="header_header_account_img"
                        />
                        <span>Tài khoản</span>
                        <div className="hvGJCW toggler">
                          <Link to="info" className="kjhfd">
                            <p className="brEmWQ">Thông tin tài khoản</p>
                          </Link>
                          <Link href="order" className="kjhfd">
                            <p className="brEmWQ">Đơn hàng của tôi</p>
                          </Link>
                          <Link to="" className="kjhfd">
                            <p className="brEmWQ">Đăng xuất</p>
                          </Link>
                        </div>
                      </div>
                      <div className="hfiWvr">
                        <Link to="/cart">
                          <div className="iZYkSb bhXqXQ">
                            <div className="cart-wrapper">
                              <img
                                class="cart-icon"
                                src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png "
                                alt="header_header_img_Cart"
                                style={{ width: "60%" }}
                              />
                              <span className="jbrHBQ">0</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
