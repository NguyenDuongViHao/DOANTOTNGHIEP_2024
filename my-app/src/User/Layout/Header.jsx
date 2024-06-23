import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./style.css";
import { Button, Modal } from "react-bootstrap";
import AxiosClient from "../../Axios/AxiosClient";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [show, setShow] = useState(false);

  const [query, setQuery] = useState("");

  const handleSearch = (query) => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleInputChange = (event) => {
    handleSearch(event.target.value);
  };

  // useEffect(() => {
  //   AxiosClient.get(`/products`).then((res) => {
  //     setFilteredItems(res.data.products);
  //   });
  // }, []);

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
                            onChange={handleInputChange}
                          />
                          <button className="LdVUr" style={{ height: "100%" }}>
                            Tìm kiếm
                          </button>
                          {/* {show && 
                            <div className="jlBoKO">
                              <div className="gyELMq">
                                <a href="" className="item"> 
                                  <img src="https://salt.tikicdn.com/ts/upload/e8/aa/26/42a11360f906c4e769a0ff144d04bfe1.png" class="item-icon"/>
                                  <div class="keyword">áo thun nam</div>
                                </a>
                               
                              </div>
                            </div>} */}
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
                          <a href="" className="kjhfd">
                            <p className="brEmWQ">Thông tin tài khoản</p>
                          </a>
                          <a href="" className="kjhfd">
                            <p className="brEmWQ">Đơn hàng của tôi</p>
                          </a>
                          <a href="" className="kjhfd">
                            <p className="brEmWQ">Đăng xuất</p>
                          </a>
                        </div>
                      </div>
                      <div className="hfiWvr">
                        <a href="">
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
                        </a>
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
