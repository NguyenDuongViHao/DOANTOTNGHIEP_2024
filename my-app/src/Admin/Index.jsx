import {
  faColonSign,
  faExchange,
  faSign,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Index.css";
import AxiosClient from "../Axios/AxiosClient";
const Index = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log("Logout error", error);
    }
  };
  const UserId = localStorage.getItem("userId");
  const [User, setUser] = useState({});
  const location = useLocation();
  const path = location.pathname;
  const [active, setActive] = useState(false);
  useEffect(() => {
    AxiosClient.get(`/Users/${UserId}`).then((res) => {
      setUser(res.data);
    });
  }, [UserId]);
  return (
    <>
      <div className="wrapper">
        {/* Sidebar */}
        <div className="sidebar" data-background-color="dark">
          <div className="sidebar-logo">
            {/* Logo Header */}
            <div className="logo-header" data-background-color="dark">
              <Link to="/admin" className="logo">
                <img
                  src="../Admin/assets/img/kaiadmin/logo_light.svg"
                  alt="navbar brand"
                  className="navbar-brand"
                  height={20}
                />
              </Link>
              <div className="nav-toggle">
                <button className="btn btn-toggle toggle-sidebar">
                  <i className="gg-menu-right" />
                </button>
                <button className="btn btn-toggle sidenav-toggler">
                  <i className="gg-menu-left" />
                </button>
              </div>
              <button className="topbar-toggler more">
                <i className="gg-more-vertical-alt" />
              </button>
            </div>
            {/* End Logo Header */}
          </div>
          <div className="sidebar-wrapper scrollbar scrollbar-inner">
            <div className="sidebar-content">
              <ul className="nav nav-secondary">
                <li className={`nav-item ${path === "/admin" ? "active" : ""}`}>
                  <Link
                    to="/admin"
                    className="nav-link collapsed"
                    aria-expanded="false"
                  >
                   <i className="far fa-chart-bar" />
                    <p>Thống kê</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <a data-bs-toggle="collapse" href="#base">
                    <i className="fas fa-edit" />
                    <p>Quản lý</p>
                    <span className="caret" />
                  </a>
                  <div className="collapse" id="base">
                    <ul className="nav nav-collapse">
                      <li
                        className={`nav-item ${
                          path === "/admin/accounts" ? "active" : ""
                        }`}
                      >
                        <Link to="/admin/accounts">
                          <span className="sub-item">Quản lý tài khoản</span>
                        </Link>
                      </li>
                      <li
                        className={`nav-item ${
                          path === "/admin/products" ? "active" : ""
                        }`}
                      >
                        <Link to="/admin/products">
                          <span className="sub-item">Quản lý sản phẩm</span>
                        </Link>
                      </li>
                      <li
                        className={`nav-item ${
                          path === "/admin/categories" ? "active" : ""
                        }`}
                      >
                        <Link to="/admin/categories">
                          <span className="sub-item">
                            Quản lý loại sản phẩm
                          </span>
                        </Link>
                      </li>
                      <li
                        className={`nav-item ${
                          path === "/admin/orders" ? "active" : ""
                        }`}
                      >
                        <Link to="/admin/orders">
                          <span className="sub-item">Quản lý đơn hàng</span>
                        </Link>
                      </li>
                      <li
                        className={`nav-item ${
                          path === "/admin/reviews" ? "active" : ""
                        }`}
                      >
                        <Link to="/admin/reviews">
                          <span className="sub-item">Quản lý đánh giá</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* <li className={`nav-item ${path === '/admin/chart' ? 'active' : ''}`}>
                  <Link to="/admin/chart">
                  <i className="far fa-chart-bar" />
                  <p>Thống kê</p>
                  </Link>
                </li> */}
                {/* <li className={`nav-item ${path === '/admin/images' ? 'active' : ''}`}>
                  <Link to="/admin/images">
                  <i className="far fa-images" />
                  <p>Hình Ảnh sản phẩm</p>
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        {/* End Sidebar */}
        <div className="main-panel">
          <div className="main-header">
            <div className="main-header-logo">
              {/* Logo Header */}
              <div className="logo-header" data-background-color="dark">
                <Link to="/admin" className="logo">
                  <img
                    src="assets/img/kaiadmin/logo_light.svg"
                    alt="navbar brand"
                    className="navbar-brand"
                    height={20}
                  />
                </Link>
                <div className="nav-toggle">
                  <button className="btn btn-toggle toggle-sidebar">
                    <i className="gg-menu-right" />
                  </button>
                  <button className="btn btn-toggle sidenav-toggler">
                    <i className="gg-menu-left" />
                  </button>
                </div>
                <button className="topbar-toggler more">
                  <i className="gg-more-vertical-alt" />
                </button>
              </div>
              {/* End Logo Header */}
            </div>
            {/* Navbar Header */}
            <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg">
              <div className="container-fluid">
                <ul
                  className="navbar-nav topbar-nav ms-md-auto align-items-center"
                  style={{ marginRight: "20px" }}
                >
                  <li className="nav-item topbar-user dropdown hidden-caret">
                    <a
                      className="dropdown-toggle profile-pic"
                      data-bs-toggle="dropdown"
                      href="#"
                      aria-expanded="false"
                    >
                      <div className="avatar-sm">
                        <img
                          src="../User_name.jpg"
                          alt="..."
                          className="avatar-img rounded-circle"
                        />
                      </div>
                      <span className="profile-username">
                        <span className="fw-bold">{User.fullName}</span>
                      </span>
                    </a>
                    <ul className="dropdown-menu dropdown-user animated fadeIn">
                      <div
                        className="dropdown-user-scroll scrollbar-outer"
                        style={{ height: "auto !important" }}
                      >
                        <li>
                          <a className="dropdown-item" onClick={logout}>
                            <FontAwesomeIcon icon={faExchange} /> Logout
                          </a>
                        </li>
                      </div>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
            {/* End Navbar */}
          </div>

          <div className="container">
            <Outlet />
          </div>

          <footer className="footer">
            <div className="container-fluid d-flex justify-content-between">
              <nav className="pull-left">
                <ul className="nav">
                  <li className="nav-item">
                    <a className="nav-link" href="http://www.themekita.com"></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      {" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      {" "}
                    </a>
                  </li>
                </ul>
              </nav>
              <div></div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
export default Index;
