import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
// import 'datatables.net-buttons-bs5';
// import 'datatables.net-buttons/js/buttons.colVis.mjs';
// import 'datatables.net-buttons/js/buttons.html5.mjs';
// import 'datatables.net-buttons/js/buttons.print.mjs';
// import 'datatables.net-responsive-bs5';
const Index = () => {
    const navigate = useNavigate();
    const logout = async () => {
        try {
            localStorage.clear();
            navigate("/");
        } catch (error) {
            console.log("Logout error", error);
        }
    }
    return (
        <>
            <div>
                <div id="main-wrapper">
                    <header className="topbar" data-navbarbg="skin5">
                        <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                            <div className="navbar-header" data-logobg="skin5">
                                <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)"><i className="ti-menu ti-close" /></a>
                                <a className="navbar-brand">
                                    <b className="logo-icon p-l-10">
                                        <img src="Admin//assets/images/logo-icon.png" alt="homepage" className="light-logo" />
                                    </b>
                                    <span className="logo-text">
                                        <img src="/Admin/assets/images/logo-text.png" alt="homepage" className="light-logo" />
                                    </span>
                                </a>
                                <a className="topbartoggler d-block d-md-none waves-effect waves-light" href="javascript:void(0)" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i className="ti-more" /></a>
                            </div>
                            <div className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin5">
                                <ul className="navbar-nav float-left mr-auto">
                                    <li className="nav-item d-none d-md-block"><a className="nav-link sidebartoggler waves-effect waves-light" href="javascript:void(0)" data-sidebartype="mini-sidebar"><i className="mdi mdi-menu font-24" /></a></li>
                                    <li className="nav-item dropdown">
                                        {/* <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className="d-none d-md-block">Create New <i className="fa fa-angle-down" /></span>
                                            <span className="d-block d-md-none"><i className="fa fa-plus" /></span>
                                        </a> */}
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <div className="dropdown-divider" />
                                            <a className="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </li>
                                    <li className="nav-item search-box"> <a className="nav-link waves-effect waves-dark" href="javascript:void(0)"><i className="ti-search" /></a>
                                        <form className="app-search position-absolute">
                                            <input type="text" className="form-control" placeholder="Search & enter" /> <a className="srh-btn"><i className="ti-close" /></a>
                                        </form>
                                    </li>
                                </ul>
                                <ul className="navbar-nav float-right">
                                    {/* <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle waves-effect waves-dark" href data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="mdi mdi-bell font-24" />
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <div className="dropdown-divider" />
                                            <a className="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle waves-effect waves-dark" href id={2} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="font-24 mdi mdi-comment-processing" />
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right mailbox animated bounceInDown" aria-labelledby={2}>
                                            <ul className="list-style-none">
                                                <li>
                                                    <div className>
                                                        <a href="javascript:void(0)" className="link border-top">
                                                            <div className="d-flex no-block align-items-center p-10">
                                                                <span className="btn btn-success btn-circle"><i className="ti-calendar" /></span>
                                                                <div className="m-l-10">
                                                                    <h5 className="m-b-0">Event today</h5>
                                                                    <span className="mail-desc">Just a reminder that event</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a href="javascript:void(0)" className="link border-top">
                                                            <div className="d-flex no-block align-items-center p-10">
                                                                <span className="btn btn-info btn-circle"><i className="ti-settings" /></span>
                                                                <div className="m-l-10">
                                                                    <h5 className="m-b-0">Settings</h5>
                                                                    <span className="mail-desc">You can customize this template</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a href="javascript:void(0)" className="link border-top">
                                                            <div className="d-flex no-block align-items-center p-10">
                                                                <span className="btn btn-primary btn-circle"><i className="ti-user" /></span>
                                                                <div className="m-l-10">
                                                                    <h5 className="m-b-0">Pavan kumar</h5>
                                                                    <span className="mail-desc">Just see the my admin!</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <a href="javascript:void(0)" className="link border-top">
                                                            <div className="d-flex no-block align-items-center p-10">
                                                                <span className="btn btn-danger btn-circle"><i className="fa fa-link" /></span>
                                                                <div className="m-l-10">
                                                                    <h5 className="m-b-0">Luanch Admin</h5>
                                                                    <span className="mail-desc">Just see the my new admin!</span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li> */}
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic" href data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="/assets/images/users/1.jpg" alt="user" className="rounded-circle" width={31} /></a>
                                        <div className="dropdown-menu dropdown-menu-right user-dd animated">
                                            {/* <a className="dropdown-item" href="javascript:void(0)"><i className="ti-user m-r-5 m-l-5" /> My Profile</a>
                                            <a className="dropdown-item" href="javascript:void(0)"><i className="ti-wallet m-r-5 m-l-5" /> My Balance</a>
                                            <a className="dropdown-item" href="javascript:void(0)"><i className="ti-email m-r-5 m-l-5" /> Inbox</a>
                                            <div className="dropdown-divider" />
                                            <a className="dropdown-item" href="javascript:void(0)"><i className="ti-settings m-r-5 m-l-5" /> Account Setting</a>
                                            <div className="dropdown-divider" /> */}
                                            <a className="dropdown-item" href="javascript:void(0)"><i className="fa fa-power-off m-r-5 m-l-5" onClick={logout}/> Đăng Xuất</a>
                                            <div className="dropdown-divider" />
                                            <div className="p-l-30 p-10"><Link href="javascript:void(0)" className="btn btn-sm btn-success btn-rounded" to='/'>Quay về trang chủ</Link></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>
                    <aside className="left-sidebar" data-sidebarbg="skin5">
                        <div className="scroll-sidebar">
                            <nav className="sidebar-nav">
                                <ul id="sidebarnav" className="p-t-30">
                                    {/* <li className="sidebar-item">
                                        <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/admin" aria-expanded="false">
                                            <i className="mdi mdi-view-dashboard" />
                                            <span className="hide-menu">Dashboard</span>
                                        </a>
                                    </li> */}

                                    <Link to="" className="nav-link">
                                        <li className="sidebar-item">
                                            <a className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false">
                                                <i className="mdi mdi-library-books"></i>
                                                <span className="hide-menu">Dashboard</span>
                                            </a>
                                        </li>
                                    </Link>
                                    
                                    <Link to="category" className="nav-link">
                                        <li className="sidebar-item">
                                            <a className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false">
                                                <i className="mdi mdi-library-books"></i>
                                                <span className="hide-menu">Loại sản phẩm</span>
                                            </a>
                                        </li>
                                    </Link>

                                    <Link to="slideshow" className="nav-link">
                                        <li className="sidebar-item">
                                            <a className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false">
                                                <i className="mdi mdi-library-books"></i>
                                                <span className="hide-menu">Slide show</span>
                                            </a>
                                        </li>
                                    </Link>

                                    <Link to="accounts" className="nav-link">
                                        <li className="sidebar-item">
                                            <a className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false">
                                                <i className="mdi mdi-library-books"></i>
                                                <span className="hide-menu">Loại tài khoản</span>
                                            </a>
                                        </li>
                                    </Link>

                                    <Link to="products" className="nav-link">
                                        <li className="sidebar-item">
                                            <a className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false">
                                                <i className="mdi mdi-library-books"></i>
                                                <span className="hide-menu">Sản phẩm</span>
                                            </a>
                                        </li>
                                    </Link>

                                    <Link to="comments" className="nav-link">
                                        <li className="sidebar-item">
                                            <a className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false">
                                                <i className="mdi mdi-library-books"></i>
                                                <span className="hide-menu">Bình luận</span>
                                            </a>
                                        </li>
                                    </Link>

                                    <Link to="orders" className="nav-link">
                                        <li className="sidebar-item">
                                            <a className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false">
                                                <i className="mdi mdi-library-books"></i>
                                                <span className="hide-menu">Danh sách đơn hàng</span>
                                            </a>
                                        </li>
                                    </Link>
                                    
                                    <Link to="statistical" className="nav-link">
                                        <li className="sidebar-item">
                                            <a className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false">
                                                <i className="mdi mdi-library-books"></i>
                                                <span className="hide-menu">Thống kê</span>
                                            </a>
                                        </li>
                                    </Link>

                                    <Link to="images" className="nav-link">
                                        <li className="sidebar-item">
                                            <a className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false">
                                                <i className="mdi mdi-library-books"></i>
                                                <span className="hide-menu">Hình ảnh</span>
                                            </a>
                                        </li>
                                    </Link>
                                </ul>
                            </nav>
                        </div>
                    </aside>
                    <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '91vh' }}>
                        <Outlet />
                        <footer className="footer text-center mb-0" style={{ marginTop: 'auto' }}>
                            All Rights Reserved by Matrix-admin. Designed and Developed by <a href="https://wrappixel.com">WrapPixel</a>.
                        </footer>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Index;