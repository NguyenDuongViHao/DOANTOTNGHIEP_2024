import "./Cart.css";
import AxiosClient from "../../Axios/AxiosClient";
import { useEffect, useId, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const UserId = localStorage.getItem("userId");
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const [Cart, setCart] = useState([]);
  const [ListCart, setListCart] = useState([]);
  const [AllCheck, setAllChecked] = useState(false);
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [show, setShow] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedCart, setSelectedCart] = useState({});

  const [User, setUser] = useState({});

  const [ListProductDetail, setListProductDetail] = useState([]);
  // const [quantityOnChange, setquantityOnChange] = useState("");


  const handleCloseDeleteCart = () => setShow(false);
  const handleShowDeleteCart = (id) => {
    setSelectedCart(Cart.find((a) => a.id == id));
    setShow(true);
  }
  const handleDeleteCart = async (e) =>{
    e.preventDefault();
    try {
      await AxiosClient.delete(`/Carts/${selectedCart.id}`);
      const updatedCart = Cart.filter((item) => item.id !== selectedCart.id);
      setCart(updatedCart);
      setShow(false);
    } catch (error) {
      console.error("Error deleting cart item", error);
      toast.error("Có lỗi xảy ra khi xóa các sản phẩm!");
    }
  }

  //xóa nhiều
  const handleCloseDeleteCartAll = () => setShowAll(false);
  const handleShowDeleteCartAll = () => {
    const deleteSelected = Cart.filter((item)=> item.selected)
    if(deleteSelected.length==0){
      toast.warning(() => (<div>Không có sản phẩm nào được chọn để xóa!</div>));     
      return;
    }
    setShowAll(true)
  }

  const handleDeleteCartAll = async (e)=>{
    e.preventDefault();
    try{
      const deleteSelected = Cart.filter((item)=> item.selected)
      const deletePromises = deleteSelected.map((item) =>
        AxiosClient.delete(`/Carts/${item.id}`)
      );
      await Promise.all(deletePromises);
      //cập nhật giỏ hàng
      const updatedCart = Cart.filter((item) => !item.selected);
      setCart(updatedCart);

      setShowAll(false);
    } catch(error){
      console.error("Error deleting cart item", error);
      toast.error("Có lỗi xảy ra khi xóa các sản phẩm!");
    }
  }


  const increaseQuantity = (Id) => {
    const updateCartIncrease = Cart.map((item) =>
      item.id === Id ? { ...item, quantity: item.quantity + 1 } : item
    );
    const quantityHasIncrease = updateCartIncrease.find(
      (item) => item.id === Id
    ); 
    const quantityCurrent = ListCart.find(
      (item) => item.id === Id
    ); 
    console.log(quantityCurrent, "tăng");

    const updateQuantityOfProduct = quantityHasIncrease
      ? {
          id: quantityHasIncrease.id,
          userId: UserId,
          quantity: quantityHasIncrease.quantity,
          productDetailId: quantityHasIncrease.productDetailId,
          selected: false,
        }
      : null;
      if(quantityHasIncrease.quantity>quantityCurrent.productDetail.quantity){
        toast.warning(() => (
          <div>Sản phẩm này đã hết hàng!</div>), {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: false,
          className: "custom-toast",
          toastId: 'custom-toast'
        });   
        return;
      }
    
    setCart(updateCartIncrease);
    setTotal(calculateTotal(updateCartIncrease));
    if (updateQuantityOfProduct) {
      updateCartInDatabase(updateQuantityOfProduct);
    }
    console.log(updateQuantityOfProduct, "tăng");
  };

  const decreaseQuantity = (Id) => {
    const updateDesrease = Cart.map((item) =>
      item.id === Id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    const quantityHasDecreased = updateDesrease.find((item) => item.id === Id);
    const updateQuantityOfProduct = quantityHasDecreased
      ? {
          id: quantityHasDecreased.id,
          userId: UserId,
          quantity: quantityHasDecreased.quantity,
          productDetailId: quantityHasDecreased.productDetailId,
          selected: false,
        }
      : null;
    setCart(updateDesrease);
    setTotal(calculateTotal(updateDesrease));
    if (updateQuantityOfProduct) {
      updateCartInDatabase(updateQuantityOfProduct);
    }
    console.log(updateQuantityOfProduct, "giảm");
  };

  const handleQuantityChange = (e, Idcart) => {
    const cartSelected = Cart.find((search) => search.id == Idcart); 
    const newQuantity = e.target.value;
    const productAddToCart = ListProductDetail.find((search)=> search.id == cartSelected.productDetailId)
    if (isNaN(newQuantity)) {
      toast.error("Vui lòng chỉ nhập số!");
      return;
    }
    if (!productAddToCart) {
      toast.error("Không tìm thấy sản phẩm!");
      return;
    }
    if(newQuantity > productAddToCart.quantity){
      toast.warning(() => (<div>Sản phẩm này chỉ còn {productAddToCart.quantity} !</div>));   
      return;
    }
    updateQuantity(Idcart, newQuantity, cartSelected.productDetailId);
    console.log(productAddToCart,"productdetail ")
    console.log(newQuantity,"so luong cart thay đoi")
  };

  const updateQuantity = (Idcart, newQuantity, productDetailId) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id === Idcart ? { ...item, quantity: Number(newQuantity) } : item
      )
    );
    
    AxiosClient.put( `/Carts/updateQuantityCart`, {quantity: newQuantity, userId: UserId, id: Idcart, productDetailId: productDetailId, selected: false})
        .then((response) => {
          console.log("Cart items updated quantity successfully", response);
        })
        .catch((error) => {
          console.error("Error updating cart items", error);
          toast.error("Có lỗi xảy ra khi cập nhật số lượng giỏ hàng.");
        });
  };

  const calculateTotalForProduct = (pro) => {
    const totalPrice = pro.price * pro.quantity;
    return totalPrice;
  };

  const calculateTotal = (UpdateCart) => {
    let subTotal = 0;
    let discount = 0;
    UpdateCart.forEach((product) => {
      if (product.selected) {
        subTotal += calculateTotalForProduct(product);
        discount = 0;
      }
    });

    setDiscount(discount);
    setSubTotal(subTotal);
    return subTotal - discount;
  };

  // check alll
  const handleCheckAll = () => {
    const newCheckAll = !AllCheck;
    setAllChecked(newCheckAll);
    const updatedCheckAndCart = Cart.map((item) => ({
      ...item,
      selected: newCheckAll,
    }));
    setCart(updatedCheckAndCart);
    setTotal(calculateTotal(updatedCheckAndCart));
  };

  const handleCheckOne = (Id) => {
    const updatedCheckAndCartOne = Cart.map((item) =>
      item.id === Id ? { ...item, selected: !item.selected } : item
    );
    setCart(updatedCheckAndCartOne);
    const allchecked = updatedCheckAndCartOne.every((item) => item.selected); // trả về true khi tất cả thỏa mãn điều kiên, nếu ko thỏa sẽ trả về false
    setAllChecked(allchecked);
    setTotal(calculateTotal(updatedCheckAndCartOne));
  };

  const handleBuyProduct = () => {
    if(User.phoneNumber == null){
      navigate("/cart/shipping")
    }
    else{
      const selectedCartItems = Cart.filter((item) => item.selected);

    if (selectedCartItems.length > 0) {
      const selectedDetails = selectedCartItems.map((item) => ({
        id: item.id,
        productDetailId: item.productDetailId,
        quantity: item.quantity,
        selected: true,
        userId: UserId,
        // Đảm bảo rằng selected luôn là true khi gửi lên server
      }));

      AxiosClient.put(`/Carts/updateSelected`, selectedDetails)
        .then((response) => {
          console.log("Cart items updated successfully", response);
          navigate("/pay");
        })
        .catch((error) => {
          console.error("Error updating cart items", error);
          toast.error("Có lỗi xảy ra khi cập nhật giỏ hàng.");
        });
    } else {
      toast.warning("Không có sản phẩm nào được chọn.");
    }
    }
  };

  console.log(Cart);

  const quantityInCart = () => {
    return Cart.length;
  };

  const updateCartInDatabase = async (updatedProduct) => {
    try {
      const response = await AxiosClient.put(
        `/Carts/updateQuantityCart`,
        updatedProduct,
        {
          headers: {
            "Content-Type": "application/json", // chỉ định dữ liệu truyền vào
          },
        }
      );

      if (response.status !== 204) {
        // nếu trả về No Content
        throw new Error("Failed to update cart");
      }
    } catch (error) {
      console.error("Error updating cart in database:", error);
    }
  };

  useEffect(() => {
    AxiosClient.get(`/Carts/listCart/${UserId}`)
      .then((res) => {
        setCart(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  useEffect(() => {
    if (location.pathname == "/cart") {
      const updateSelectedBackToFalse = async () => {
        try {
          await AxiosClient.put(
            `/Carts/updateSelectedWhenBackToCart/${UserId}`
          );
          console.log("Selected status updated to false when back to cart");
          await AxiosClient.get(`/Carts/listCart/${UserId}`)
            .then((res) => {
              setCart(res.data);
            })
            .catch((error) => {
              console.error("There was an error fetching the products!", error);
            });
        } catch (error) {
          console.error(
            "Error updating selected status when back to cart",
            error
          );
        }
      };

      updateSelectedBackToFalse();
    }
  }, [location.pathname]);

  useEffect(() => {
    AxiosClient.get(`/Carts`)
      .then((res) => {
        setListCart(res.data)
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  useEffect(() => {
    AxiosClient.get(`/Users/${UserId}`).then((res) => {
      setUser(res.data);
    });
  }, [UserId]);
console.log(UserId, "userrrrrrr")
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
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main>
        <div className="dvFPWG">
          <div className="main-title">
            <h4>Giỏ hàng</h4>
          </div>
          <div className="kXPYZZ">
            <div className="negmo">
              <div className="fNFAoO iekQrN">
                <label htmlFor="" className="ioqOoJ">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={AllCheck}
                    onClick={handleCheckAll}
                  />
                  <span className="checkbox-fake "></span>
                  <span className="label">Tất cả ({quantityInCart()})</span>
                </label>
                <span>Đơn giá</span>
                <span>Số lượng </span>
                <span>Thành tiền</span>
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
                  class="remove-all"
                  alt="deleted"
                  onClick={handleShowDeleteCartAll}
                ></img>
              </div>
              <div>
                <div style={{ height: "auto", overflow: "hidden" }}>
                  {/* ....item đon hang */}
                  {Cart.map((item) => {
                    // const thePriceOfEachProduct = (item.price* item.stock);

                    return (
                      <>
                        <div className="dPgBoJ">
                          {/* <div className="sellers__group ">
                            <label htmlFor="" className="ioqOoJ">
                              <input type="checkbox" name="" id="" />
                              <span className="checkbox-fake"></span>
                            </label>
                            <img
                              src="https://salt.tikicdn.com/ts/upload/30/24/79/8317b36e87e7c0920e33de0ab5c21b62.png"
                              alt="seller-link"
                              class="sellers__icon-home"
                            ></img>
                            <a href="" className="sellers__name">
                              <img
                                src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/Path.svg"
                                alt="seller-link"
                                class="sellers__icon-arrow"
                              ></img>
                            </a>
                          </div> */}

                          <div className="gkXJew">
                            <div className="jjBWEQ fNFAoO">
                              <div className="iUnYbj">
                                <div className="ioqOoJ">
                                  <input
                                    type="checkbox"
                                    name=""
                                    id=""
                                    checked={item.selected}
                                    onClick={() => handleCheckOne(item.id)}
                                  />
                                  <span className="checkbox-fake"></span>
                                </div>
                                <a href="" className="dueyr">
                                  <img
                                    src={`https://localhost:7073/Images/${item.imageURL}`}
                                    alt=""
                                    className="fWjUGo"
                                  />
                                </a>
                                <div className="eBPgyQ">
                                  <div ClassName="item-badge"></div>
                                  <a href="">{item.productName}</a>
                                  <p className="variant-text">
                                    Màu: {item.nameColor}, {item.nameSize}
                                  </p>
                                  <div className="iHmewP">
                                    {/* <span className="delivery-text">
                                      giao hàng ngày tới
                                    </span> */}
                                  </div>
                                </div>
                              </div>
                              <div className="libseF">
                                <div className="mqMAG">
                                  {item.price
                                    .toLocaleString("en-US")
                                    .replace(/,/g, ".")}
                                  <sup>₫</sup>
                                </div>
                              </div>
                              <div className="sfcGVRj">
                                <div className="gEpOC">
                                  <span
                                    className="qty-decrease"
                                    onClick={() => decreaseQuantity(item.id)}
                                  >
                                    <img
                                      src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/decrease.svg"
                                      alt="decrease"
                                    />
                                  </span>
                                  <input
                                    type="tel"
                                    className="qty-input "
                                    value={item.quantity}
                                    onChange={(e)=>{handleQuantityChange(e, item.id)}}
                                  />
                                  <span
                                    className="qty-increase"
                                    onClick={() => increaseQuantity(item.id)}
                                  >
                                    <img
                                      src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/increase.svg"
                                      alt="increase"
                                    />
                                  </span>
                                </div>
                              </div>
                              <div className="kmBtgH">
                                {calculateTotalForProduct(item)
                                  .toLocaleString("en-US")
                                  .replace(/,/g, ".")}
                                <sup>₫</sup>
                              </div>
                              <div className="hzcTWN">
                                <img
                                  src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
                                  alt="deleted"
                                  width="17"
                                  height="17"
                                  onClick={()=>handleShowDeleteCart(item.id)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="cYBSKG"></div>
                          {/* <div className="cYBSKG" style={{height:"2rem"}}>
                            <div className="wrapper">
                              <div className="description">
                                khuyến mãi....
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* .... */}
            <div className="eEhtFa">
              <div className="right-inner" style={{ top: "-249.911px" }}>
                <div>
                  <div className="bVA-DDf2 cTGPxG">
                    <div className="block-header ">
                      <h3 className="block-header__title">Giao tới</h3>
                      <Link to="/cart/shipping">Thay đổi</Link>
                    </div>
                    <div className="customer_info">
                      <p
                        className="customer_info__name"
                        style={{ color: "rgb(56, 56, 61)" }}
                      >
                        {User.fullName}
                      </p>
                      <i></i>
                      <p
                        className="customer_info__phone"
                        style={{ color: "rgb(56, 56, 61)" }}
                      >
                        {User.phoneNumber}
                      </p>
                    </div>
                    <div className="address">
                      <span className="address__type">nhà</span>
                      {User.address}
                      <p className="warning-message"></p>
                    </div>
                  </div>

                  {/* <div className="jMrZxT bVA-DDf">
                    <div className="block-header">
                      <div className="block-header__title ">Khuyến mãi</div>
                      <div className="block-header__usage">
                        <span>Có thể chọn 2</span>
                      </div>
                    </div>
                    <div className="coupon-list"></div>
                    <div className="show-more">
                      <span>Chọn hoặc nhập Khuyến mãi khác</span>
                    </div>
                  </div> */}
                </div>

                <div className="gMwcWr">
                  <ul className="prices__items">
                    <li className="prices__item">
                      <span className="prices__text">Tạm tính</span>
                      <span className="prices__value">
                        {subTotal.toLocaleString("en-US").replace(/,/g, ".")}
                        <sup>₫</sup>
                      </span>
                    </li>
                    <li className="prices__item">
                      <span className="prices__text">Giảm giá</span>
                      <span className="prices__value">
                        {discount.toLocaleString("en-US").replace(/,/g, ".")}
                        <sup>₫</sup>
                      </span>
                    </li>
                  </ul>

                  <div className="prices__total">
                    <span className="prices__text">Tổng tiền</span>
                    <div className="prices__content ">
                      <span className="prices__value prices__value--final">
                        {total.toLocaleString("en-US").replace(/,/g, ".")}
                        <sup>₫</sup>
                      </span>
                      <span className="prices__value--noted "></span>
                    </div>
                  </div>
                </div>

                <div className="dGoOLh" onClick={handleBuyProduct}>
                  Mua Hàng
                </div>

                <div style={{ marginTop: "12px" }}></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modal
        show={show}
        onHide={handleCloseDeleteCart}
        backdrop="static"
        keyboard={false}
        size="sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Bạn có muốn xóa sản phẩm đang chọn
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteCart}>Xác nhận</Button>
          <Button variant="secondary" onClick={handleCloseDeleteCart}>
           Hủy
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAll}
        onHide={handleCloseDeleteCartAll}
        backdrop="static"
        keyboard={false}
        size="sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa tất cả sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có muốn xóa
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteCartAll}>Xác nhận</Button>
          <Button variant="secondary" onClick={handleCloseDeleteCartAll}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer className="custom-toast-container"/>
    </>
  );
};

export default Cart;
