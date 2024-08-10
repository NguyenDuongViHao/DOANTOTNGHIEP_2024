import { useEffect, useState } from "react";
import "./ProductDetail.css";
// import { useDispatch, useSelector } from "react-redux";
// import { ProductDetailAction } from "../../Redux/Action/ClothingStoreAction";
import { useNavigate, useParams } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ModalLoginDetail from "./ModalLoginDetail";
const ProductDetail = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const UserId = localStorage.getItem("userId");

  const [User, setUser] = useState({});
  const [ProductDetail, setProductDetail] = useState([]);
  const [ListProductDetail, setListProductDetail] = useState([]);
  const [ListCart, setListCart] = useState([]);
  const [DetailReview, setDetailReview] = useState({});

  //yêu thích
  const currentlyAFavorite = (
    <FontAwesomeIcon
      icon={faHeart}
      color="rgb(156, 163, 175)"
      style={{ fontSize: "20px" }}
    />
  );
  const notCurrentlyAFavorite = (
    <FontAwesomeIcon
      icon={faHeart}
      color="rgb(255, 66, 79)"
      style={{ fontSize: "20px" }}
    />
  );

  const [favoriteChange, setfavoriteChange] = useState(false);
  const [favourite, setFavourite] = useState({
    productId: id,
    userId: UserId,
    status: true,
  });

  const [MainImageUrl, setMainImageUrl] = useState("");

  //biến thể
  const [activeIndexColor, setActiveIndexColor] = useState(null); // chỉnh lại
  const [activeIndexSize, setActiveIndexSize] = useState(null);
  const [collapse, setCollapse] = useState(true);
  const [displayVariantColor, setDisplayVariantColor] = useState(""); //để ở đây name của các biến thể
  const [displayVariantSize, setDisplayVariantSize] = useState("");

  //tăng giảm số lượng
  const [Quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState();

  const [Carts, setCarts] = useState({
    userId: UserId,
    quantity: 1,
    selected: false,
  });
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  // const [showRegister, setShowRegister] = useState(false);
  // const handleCloseRegister = () => setShowRegister(false);

  const handleIncrease = (e) => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = (e) => {
    if (Quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    } else {
      toast.info(() => <div>Số lượng không được nhỏ hơn 1</div>);
    }
  };

  const totalPrice = Quantity * price;

  const handleClickColor = (indexColor, colorr) => {
    setActiveIndexColor(
      indexColor === activeIndexColor ? indexColor : indexColor
    );
    setDisplayVariantColor(colorr);
  };
  const handleClickSize = (indexSize, sizee) => {
    setActiveIndexSize(indexSize === activeIndexSize ? indexSize : indexSize);
    setDisplayVariantSize(sizee);
  };

  const handleClickCollapse = (e) => {
    e.preventDefault();
    setCollapse(!collapse);
  };

  const handleClickImage = (url) => {
    setMainImageUrl(url);
  };

  const getInitials = (fullName) => {
    if (!fullName) return "";
    return fullName
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };
  console.log(activeIndexColor, "color");
  console.log(activeIndexSize, "size");

  const handleSubmitCart = async (e) => {
    if (UserId == null) {
      setShowLogin(true);
      return;
    }
    if (activeIndexColor && activeIndexSize) {
      e.preventDefault();
      const productDetailAddCart = ListProductDetail.find(
        (search) =>
          search.sizeId == activeIndexSize &&
          search.colorId == activeIndexColor &&
          search.productId == id
      );
      console.log(id, "iddd");
      console.log(productDetailAddCart, "chitiet");
      if (productDetailAddCart) {
        //kiểm tra biến thể
        const ProductInCart = ListCart.find(
          (search) =>
            search.productDetailId == productDetailAddCart.id &&
            search.userId == UserId
        ); //undef //thêm user
        console.log(ProductInCart, "kkhfaksf");
        var totalQuantity = 0;

        if (ProductInCart) {
          //nếu có trong giỏ hàng
          console.log(ProductInCart, "cos trong gio hang");
          console.log(productDetailAddCart.quantity, "soluong san pham ton");

          totalQuantity = Quantity + ProductInCart.quantity;
          if (totalQuantity > productDetailAddCart.quantity) {
            //"kiểm tra so lượng sản phẩm được thêm vào khi đã có thêm vào trước đó
            toast.info(() => (
              <div>
                Số lượng sản phẩm chỉ còn {productDetailAddCart.quantity} hãy
                kiểm tra giỏ hàng
              </div>
            ));
            return false;
          } else {
            setCarts((prev) => ({
              ...prev,
              quantity: Quantity,
              productDetailId: productDetailAddCart.id,
            }));
            setShouldSubmit(true);
            return true;
          }
        } else {
          if (Quantity > productDetailAddCart.quantity) {
            //kiểm tra số lựong sản phẩm đc thêm vào khi chưa có sản phẩm đó trong gio hàng,
            toast.info(() => (
              <div>
                Số lượng sản phẩm chỉ còn {productDetailAddCart.quantity}
              </div>
            ));
            return false;
          }
          setCarts((prev) => ({
            ...prev,
            quantity: Quantity,
            productDetailId: productDetailAddCart.id,
          }));
          setShouldSubmit(true);
          console.log(productDetailAddCart.id, "detailllll");
          return true;
        }
      } else {
        toast.info(() => <div>Biến thể này chưa có cho sản phẩm</div>);
        return false;
      }
    } else {
      toast.warning(() => <div>Sản phẩm này chưa có biến thể</div>);
    }
    return false;
  };

  console.log(ListCart, "cart");

  const handlePurchase = async (e) => {
    if (UserId == null) {
      setShowLogin(true);
      return;
    }
    if (activeIndexColor && activeIndexSize) {
      const shouldProceed = await handleSubmitCart(e);
      if (shouldProceed) {
        const timer = setTimeout(() => {
          navigate("/cart");
        }, 300);
        return () => clearTimeout(timer);
      }
    } else {
      toast.warning(() => <div>Sản phẩm này chưa có biến thể</div>);
    }
  };

  const handleFavourete = () => {
    if (UserId == null) {
      setShowLogin(true);
    } else {
      setfavoriteChange((prevFavourite) => !prevFavourite);
      if (favoriteChange) {
        toast.info(() => <div>Đã bỏ yêu thích</div>);
      } else {
        toast.info(() => <div>Đã thêm vào danh sách yêu thích </div>);
      }
      handleThemFavourite();
    }
  };

  const handleThemFavourite = () => {
    AxiosClient.post(`Favourites`, favourite)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Lỗi khi thêm mục yêu thích", error);
      });
  };

  const handleQuantityChange = (e, IdProduct) => {
    const ColorId = parseInt(activeIndexColor, 10);
    const SizeId = parseInt(activeIndexSize, 10);
    const newQuantity = Number(e.target.value);

    if (isNaN(newQuantity)) {
      toast.error("Vui lòng chỉ nhập số!");
      return;
    }
    const quantityProductDetail = ListProductDetail.find(
      (search) =>
        search.productId == IdProduct &&
        search.colorId == ColorId &&
        search.sizeId == SizeId
    );
    if (!quantityProductDetail) {
      toast.error("Không tìm thấy sản phẩm!");
      return;
    }
    if (newQuantity > quantityProductDetail.quantity) {
      toast.warning(() => (
        <div>Sản phẩm này chỉ còn {quantityProductDetail.quantity} !</div>
      ));
      return;
    }

    updateQuantity(newQuantity);
    console.log(quantityProductDetail, "productdetail ");
    console.log(newQuantity, "so luong cart thay đoi");
  };

  const updateQuantity = (newQuantity) => {
    setQuantity(newQuantity);
  };

  useEffect(() => {
    AxiosClient.get(`Favourites/${UserId}/${id}`)
      .then((res) => {
        if (res.data) {
          setfavoriteChange(true);
          console.log(res.data, "yeuthicsh");
        } else {
          setfavoriteChange(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    AxiosClient.get(`/Products/productDetail/${id}`)
      .then((res) => {
        setProductDetail([res.data]);
        setPrice(res.data.price);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  useEffect(() => {
    AxiosClient.get(`/ProductDetails`)
      .then((res) => {
        setListProductDetail(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  useEffect(() => {
    AxiosClient.get(`/Carts`)
      .then((res) => {
        setListCart(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, [shouldSubmit, Carts]);

  useEffect(() => {
    if (
      ProductDetail.length > 0 &&
      ProductDetail[0].sizes.length > 0 &&
      ProductDetail[0].colors.length > 0
    ) {
      setActiveIndexSize(`${ProductDetail[0].sizes[0].id}`);
      setDisplayVariantSize(`${ProductDetail[0].sizes[0].nameSize}`);
      setActiveIndexColor(`${ProductDetail[0].colors[0].id}`);
      setDisplayVariantColor(`${ProductDetail[0].colors[0].nameColor}`);
      if (ProductDetail[0].images.length > 0) {
        setMainImageUrl(
          `https://localhost:7073/Images/${ProductDetail[0].images[0].fileName}`
        );
      } else {
        setMainImageUrl(`../3708994bdca38cd8dbea509f233f3cf4.jpg`);
      }
    }
  }, [ProductDetail]);

  useEffect(() => {
    if (shouldSubmit) {
      AxiosClient.post("/Carts/createCart", Carts)
        .then((res) => {
          console.log("Cart created:", res.data);
          toast.info(() => <div>Thêm vào giỏ hàng thành công</div>);
        })
        .catch((error) => {
          console.error("There was an error creating the cart!", error);
        });
      setShouldSubmit(false);
    }
  }, [shouldSubmit, Carts]);

  useEffect(() => {
    AxiosClient.get(`/Reviews/detailReview/${id}`)
      .then((res) => {
        setDetailReview(res.data);
      })
      .catch((error) => {
        console.error("There was an error creating the cart!", error);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderStars = (starNumber) => {
    const stars = [];
    for (let i = 1; i <= starNumber; i++) {
      if (i <= 1) {
        stars.push(
          <img
            key={i}
            alt="star-icon"
            src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
            width="20"
            height="20"
          />
        );
      } else {
        stars.push(
          <img
            key={i}
            alt="star-icon"
            src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
            width="20"
            height="20"
            style={{ opacity: 0.5 }}
          />
        );
      }
    }
    return stars;
  };

  return (
    <>
      {ProductDetail.map((item) => {
        return (
          <>
            <div className="proDetails">
              <div className="proframe">
                <div className="" style={{ marginBottom: "14rem" }}>
                  <div className="proContainer">
                    <div className="proleft">
                      <div className="kXwtNH">
                        <div className="image-frame">
                          <div className="img-pro">
                            <div className="position-pointer">
                              <img
                                src={MainImageUrl == null ? "" : MainImageUrl}
                                alt=""
                                className="hbqSye"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="eKNqTX thumbnail-list">
                          <div className="bCOUwr children-slider">
                            <div className="content">
                              {/* <span className="icon-prev"></span> */}
                              <span className="slider">
                                {item.images.map((itemImg) => {
                                  return (
                                    <>
                                      <a
                                        href=""
                                        className="jWvPKd"
                                        key={itemImg.id}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleClickImage(
                                            `https://localhost:7073/Images/${itemImg.fileName}`
                                          );
                                        }}
                                      >
                                        <img
                                          src={`https://localhost:7073/Images/${itemImg.fileName}`}
                                          alt=""
                                        />
                                      </a>
                                    </>
                                  );
                                })}
                              </span>
                              {/* <span className="icon-next"></span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="proright">
                      <div className="uPvBM">
                        <div className="bufoOo">
                          <div className="eDHhpS">
                            <div className="column-title ">
                              <div className="iWzGzX">
                                <div className="ZcTap">
                                  <span className="brand-and-author">
                                    <h6>
                                      Thương hiệu: <span>{item.brand}</span>
                                    </h6>
                                  </span>
                                </div>
                                <h1 className="iXccQY">{item.name}</h1>
                              </div>

                              <div className="iWzGzXy">
                                <div className="jkiKKI">
                                  <div className="product-price">
                                    <div className="product-price__current-price">
                                      {item.price
                                        .toLocaleString("en-US")
                                        .replace(/,/g, ".")}
                                      <sup>₫</sup>
                                    </div>
                                    <div className="product-price__discount-rate">
                                      {/* khuyến mãi */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="fGaJQu">
                              <div className="doDlAA">
                                <p className="bPJqXH ">Color</p>
                                <div className="fKNxKo">
                                  {item.colors.map((itemcolor) => {
                                    return (
                                      <>
                                        <div
                                          className="dhKKOZ"
                                          onClick={() =>
                                            handleClickColor(
                                              `${itemcolor.id}`,
                                              `${itemcolor.nameColor}`
                                            )
                                          }
                                        >
                                          <span>
                                            <div className="adsfad">
                                              {/* <img
                                              src="../00005047_83f129bc4f7b4984b80cc70831b5d03e_large.jpg"
                                              alt=""
                                            /> */}
                                              <span>{itemcolor.nameColor}</span>
                                            </div>
                                          </span>
                                          <div
                                            className={`borderr ${
                                              activeIndexColor ===
                                              `${itemcolor.id}`
                                                ? "active"
                                                : ""
                                            }`}
                                          ></div>
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="doDlAA">
                                <p className="bPJqXH ">Kích cỡ</p>
                                <div className="fKNxKo">
                                  {item.sizes.map((itemSize) => {
                                    return (
                                      <>
                                        <div
                                          key={itemSize.id}
                                          className="dhKKOZ"
                                          onClick={() =>
                                            handleClickSize(
                                              `${itemSize.id}`,
                                              `${itemSize.nameSize}`
                                            )
                                          }
                                        >
                                          <span>{itemSize.nameSize}</span>
                                          <div
                                            className={`borderr ${
                                              activeIndexSize ===
                                              `${itemSize.id}`
                                                ? "active"
                                                : ""
                                            }`}
                                          ></div>
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bufoOo">
                          <div className="bPRVIq">Thông tin chi tiết</div>
                          <div className="qutye">
                            <div className="hNNYbU">
                              <div className="guWvLv">
                                <span>Nhóm sản phẩm</span>
                                <span className="chhHdv">
                                  {item.categoryName}
                                </span>
                              </div>
                            </div>
                            <div className="hNNYbU">
                              <div className="guWvLv">
                                <span>Thương hiệu</span>
                                <span className="chhHdv">{item.brand}</span>
                              </div>
                            </div>

                            <div className="hNNYbU">
                              <div className="guWvLv">
                                <span>Xuất Xứ</span>
                                <span className="chhHdv">{item.origin}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bufoOo">
                          <div className="bPRVIq">Mô tả sản phẩm</div>
                          <div className="eba-dki">
                            <div className="xbBes">
                              {collapse ? (
                                <div className="description">
                                  {item.description
                                    .split(" - ")
                                    .map((part, index) => (
                                      <div key={index}>{part}</div>
                                    ))}
                                  <div className="gradient"></div>
                                </div>
                              ) : (
                                <div className="imwRtb">
                                  <div className="description">
                                    {item.description
                                      .split(" - ")
                                      .map((part, index) => (
                                        <div key={index}>{part}</div>
                                      ))}
                                  </div>
                                </div>
                              )}
                              {collapse ? (
                                <a
                                  href=""
                                  className="btn-more"
                                  onClick={handleClickCollapse}
                                >
                                  Xem thêm
                                </a>
                              ) : (
                                <a
                                  href=""
                                  className="btn-more"
                                  onClick={handleClickCollapse}
                                >
                                  Thu gọn
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="reviewPro"
                    style={{ width: "100%", marginBottom: "1rem" }}
                  >
                    <div className="bufoOo ">
                      <div className="bPRVIq">Đánh giá khách hàng</div>
                      <div className="gCaHEu">
                        <div className="customer-reviews__inner ">
                          <div className="customer-reviews__top">
                            <div
                              style={{
                                width: "100%",
                                paddingBottom: "16px",
                              }}
                            >
                              <div className="dZYmgO">
                                <div className="review-rating__heading">
                                  Tổng quan
                                </div>
                                <div style={{ display: "flex" }}>
                                  <div style={{ width: "30%" }}>
                                    <div className="review-rating__summary">
                                      <div className="review-rating__point">
                                        {DetailReview.averageRating}
                                      </div>
                                      <div className="review-rating__stars">
                                        {renderStars(
                                          DetailReview.averageRating
                                        )}
                                      </div>
                                    </div>
                                    <div className="review-rating__total">
                                      {DetailReview.totalStars} đánh giá
                                    </div>
                                    <div className="review-rating__detail"></div>
                                    <div className="review-rating__level">
                                      <div className="hphKLs">
                                        <span>
                                          {" "}
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          {" "}
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          {" "}
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          {" "}
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          {" "}
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <div></div>
                                      </div>
                                      <div className="lfisVy"></div>
                                      <div className="review-rating__number">
                                        {DetailReview.fiveStars}
                                      </div>
                                    </div>
                                    <div className="review-rating__level">
                                      <div className="hphKLs">
                                        <span>
                                          {" "}
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          {" "}
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          {" "}
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          {" "}
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <div></div>
                                      </div>
                                      <div className="lfisVy"></div>
                                      <div className="review-rating__number">
                                        {DetailReview.fourStars}
                                      </div>
                                    </div>
                                    <div className="review-rating__level">
                                      <div className="hphKLs">
                                        <span>
                                          {" "}
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          {" "}
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          {" "}
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <div></div>
                                      </div>
                                      <div className="lfisVy"></div>
                                      <div className="review-rating__number">
                                        {DetailReview.threeStars}
                                      </div>
                                    </div>
                                    <div className="review-rating__level">
                                      <div className="hphKLs">
                                        <span>
                                          {" "}
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          {" "}
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <div></div>
                                      </div>
                                      <div className="lfisVy"></div>
                                      <div className="review-rating__number">
                                        {DetailReview.twoStars}
                                      </div>
                                    </div>
                                    <div className="review-rating__level">
                                      <div className="hphKLs">
                                        <span>
                                          {" "}
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <span>
                                          <img
                                            alt="star-icon"
                                            src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png"
                                            width="14"
                                            height="14"
                                          ></img>
                                        </span>
                                        <div></div>
                                      </div>
                                      <div className="lfisVy"></div>
                                      <div className="review-rating__number">
                                        {DetailReview.oneStars}
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    style={{ display: "flex" }}
                                    className="lturye"
                                  >
                                    {/* <span style={{marginTop:"22%"}}>Cảm ơn đã đánh giá</span>
                              <div className="circle-image">
                                <img src="../iconreview.jpg" alt="Avatar" />
                              </div> */}
                                  </div>
                                </div>
                              </div>
                              <div className="gtPdrn">
                                {item.reviews.map((itemReview, index) => {
                                  return (
                                    <>
                                      <div className="dpVjwc" key={index}>
                                        <div className="review-comment__user ">
                                          <div className="review-comment__user-inner">
                                            <div className="review-comment__user-avatar">
                                              <div className="iRypZD has-character ">
                                                <img
                                                  src="../Ao Thun Carrot Theme 360GSM.jpg"
                                                  alt=""
                                                />
                                                <span>
                                                  {getInitials(
                                                    itemReview.userName
                                                  )}
                                                </span>
                                              </div>
                                            </div>
                                            <div>
                                              <div className="review-comment__user-name">
                                                {itemReview.userName}
                                              </div>
                                              <div className="review-comment__user-date">
                                                {itemReview.reviewDate}{" "}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div style={{ flexGrow: 1 }}>
                                          <div className="review-comment__rating-title">
                                            <div
                                              className="review-comment__rating"
                                              style={{ whiteSpace: "nowrap" }}
                                            >
                                              {renderStars(
                                                itemReview.starNumber
                                              )}
                                            </div>
                                          </div>
                                          <div className="review-comment__seller-name-attributes">
                                            <div className="review-comment__seller-name">
                                              <span>
                                                <i></i>
                                              </span>
                                              Đã mua hàng
                                            </div>
                                          </div>
                                          <div className="review-comment__content">
                                            {itemReview.content}
                                          </div>
                                          <div className="review-comment__created-date">
                                            <div className="review-comment__attributes">
                                              <div className="review-comment__attributes--item">
                                                {/* <span>màu sắc kích cỡ</span> */}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grJPUk">
                  <div
                    className="iueye"
                    style={{
                      position: "sticky",
                      top: "12px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                      gap: "12px",
                      margin: "1rem 0",
                    }}
                  >
                    <div
                      className="bufoOo"
                      style={{ gap: "16px", overflow: "initial" }}
                    >
                      <div
                        className="bfJGpi"
                        style={{
                          display: "flex",
                          gap: "0px",
                          alignItems: "center",
                          height: "65px",
                        }}
                      >
                        <div className="kjhff">
                          <div className="mnvbc">
                            <span className="seller-name">
                              <div className="myqYs">
                                <a href="" className="">
                                  <span>{item.name}</span>
                                </a>
                              </div>
                            </span>

                            <div className="bSSDTY">
                              <div className="review item">
                                <div className="title">
                                  <span>{DetailReview.averageRating}</span>
                                  <img
                                    src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
                                    alt=""
                                  />
                                </div>
                                <div className="sub-title ">
                                  ({DetailReview.totalStars}) đánh giá
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="favourite" style={{ width: "13%" }}>
                          <div
                            className=""
                            onClick={handleFavourete}
                            style={{ cursor: "pointer" }}
                          >
                            {favoriteChange
                              ? notCurrentlyAFavorite
                              : currentlyAFavorite}
                          </div>
                        </div>
                      </div>
                      <div className="ZcTap">
                        <div>Đang chọn: </div>
                        <div>{displayVariantColor}, </div>
                        <div>{displayVariantSize}</div>
                      </div>
                      {/* <div className="dCPDNj"></div> */}
                      <div className="eEcWHI">
                        <div className="cbfhs">
                          <div className="lgdBsd">
                            <p className="labell">số lượng</p>
                            <div className="group-input">
                              <button
                                className="disable"
                                onClick={handleDecrease}
                              >
                                <img
                                  src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                                  alt=""
                                />
                              </button>
                              <input
                                type="text"
                                className="input"
                                value={Quantity}
                                onChange={(e) => {
                                  handleQuantityChange(e, item.id);
                                }}
                              />
                              <button onClick={handleIncrease}>
                                <img
                                  src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                                  alt=""
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="VKBfi">
                          <div className="fcwSuV">Tạm tính</div>
                          <div className="HGbRm">
                            <div>
                              {totalPrice
                                .toLocaleString("en-US")
                                .replace(/,/g, ".")}{" "}
                              <sup>₫</sup>
                            </div>
                          </div>
                        </div>

                        <div className="group-button">
                          <button className="gbcanz">
                            <span
                              onClick={(e) => {
                                handlePurchase(e);
                              }}
                            >
                              Mua hàng
                            </span>
                          </button>
                          <button
                            className="jZCrXg"
                            onClick={(e) => handleSubmitCart(e)}
                          >
                            Thêm vào giỏ hàng
                          </button>
                          {/* <button className="jZCrXg">
                            <div>Mua trước trả sau</div>
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
      <ModalLoginDetail show={showLogin} handleClose={handleCloseLogin} />
      {/* <ModalRegister show={showRegister} handleClose={handleCloseRegister} /> */}
      <ToastContainer className="custom-toast-container" />
    </>
  );
};

export default ProductDetail;
