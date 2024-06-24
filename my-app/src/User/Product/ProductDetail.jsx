import { useEffect, useState } from "react";
import "./ProductDetail.css";
// import { useDispatch, useSelector } from "react-redux";
// import { ProductDetailAction } from "../../Redux/Action/ClothingStoreAction";
import { useParams } from "react-router-dom";
import AxiosClient from "../../Axios/AxiosClient";
const ProductDetail = () => {

    // const dispatch = useDispatch();
    let {id} = useParams();

//     const { productDetail } = useSelector((state) => state.ClothingStoreReducer);
//     useEffect(() => {
//       dispatch(ProductDetailAction(id));
//   }, [dispatch, id]);
//   console.log(productDetail)

    const [ProductDetail, setProductDetail] = useState({});
    const [activeIndexColor, setActiveIndexColor] = useState(0);// chỉnh lại
    const [activeIndexSize, setActiveIndexSize] = useState(0);

    const [collapse, setCollapse] = useState(true);
    const [displayVariantColor, setDisplayVariantColor] = useState(''); //để ở đây name của các biến thể
    const [displayVariantSize, setDisplayVariantSize] = useState('');

    //tăng giảm số lượng
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');
    const [price, setPrice] = useState(2.888);

    const handleIncrease = (e) => {
         setMessage('')
         setQuantity(prevQuantity => prevQuantity + 1)
    };

    const handleDecrease = (e) => {
       if(quantity > 1){
        setMessage('')
        setQuantity(prevQuantity => prevQuantity - 1)
       }
       else{
        setMessage("số lượng không đươc bé hơn không")
       }
   };

   const totalPrice = quantity*price

    const handleClickColor = (indexColor, colorr) => {
        setActiveIndexColor(indexColor === activeIndexColor ? indexColor : indexColor);
        setDisplayVariantColor(colorr);
    };
    const handleClickSize = ( indexSize, sizee) => {
        setActiveIndexSize(indexSize === activeIndexSize ? indexSize : indexSize);
        setDisplayVariantSize(sizee);
    };

    const handleClickCollapse = (e) => {
        e.preventDefault();
        setCollapse(!collapse);
    };

    // useEffect(() => {
    //     AxiosClient.get("/")
    //     .then((res)=> {
    //         setProductDetail(res.data)
    //     })
    //     .catch((error)=>{
    //         console.error("There was an error fetching the products!", error);
    //     })
    // }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return ( <>
   <div className="proDetails"> 
        <div className="proframe">
            <div className="proContainer">
                
                    <div className="proleft">
                <div className="kXwtNH">
                    <div className="image-frame">
                        <div className="img-pro">
                            <div className="position-pointer">
                                <img src="../00005047_83f129bc4f7b4984b80cc70831b5d03e_large.jpg" alt="" className="hbqSye"/>
                            </div>
                        </div>
                    </div>

                    <div className="eKNqTX thumbnail-list">
                        <div className="bCOUwr children-slider">
                            
                            <div className="content">
                               {/* <span className="icon-prev"></span> */}
                               <span className="slider">
                                    <a href="" className="jWvPKd">
                                        <img src="../Ao Thun Carrot Theme 360GSM.jpg" alt="" />
                                    </a>

                                    <a href="" className="jWvPKd">
                                        <img src="Ao Thun Carrot Theme 360GSM.jpg" alt="" />
                                    </a>

                                    <a href="" className="jWvPKd">
                                        <img src="Ao Thun Carrot Theme 360GSM.jpg" alt="" />
                                    </a>

                                    <a href="" className="jWvPKd">
                                        <img src="Ao Thun Carrot Theme 360GSM.jpg" alt="" />
                                    </a>

                                    <a href="" className="jWvPKd">
                                        <img src="Ao Thun Carrot Theme 360GSM.jpg" alt="" />
                                    </a>

                                    <a href="" className="jWvPKd">
                                        <img src="Ao Thun Carrot Theme 360GSM.jpg" alt="" />
                                    </a>

                        
                                    
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
                                        <span className="brand-and-author"><h6>Thương hiệu: <span>xiaomi</span></h6></span>
                                        <span className="brand-and-author"><h6>Thương hiệu: <span>xiaomi</span></h6></span>
                                        <span className="brand-and-author"><h6>Thương hiệu: <span>xiaomi</span></h6></span>

                                    </div>
                                    <h1 className="iXccQY">Điện thoại xiaomi</h1>
                                </div>
                                
                                <div className="iWzGzXy">
                                    <div className="jkiKKI">
                                        <div className="product-price">
                                            <div className="product-price__current-price">2.8888 <sup>₫</sup></div>
                                            <div className="product-price__discount-rate">-43%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className="fGaJQu">
                            <div className="doDlAA">
                                <p className="bPJqXH ">Color</p>
                                <div className="fKNxKo">
                                    <div className="dhKKOZ" onClick={() => handleClickColor(0,"Đen")}>
                                        <span>
                                            <div className="adsfad">
                                                <img src="../00005047_83f129bc4f7b4984b80cc70831b5d03e_large.jpg" alt="" />
                                                <span>Bạc</span>
                                            </div>                                     
                                        </span>
                                        <div className={`borderr ${activeIndexColor === 0 ? 'active' : ''}`}></div>
                                    </div>
                                    <div className="dhKKOZ" onClick={() => handleClickColor(1, "Trắng")}>
                                        <span>
                                            <div className="adsfad">
                                                <img src="../00005047_83f129bc4f7b4984b80cc70831b5d03e_large.jpg" alt="" />
                                                <span>Bạc</span>
                                            </div>
                                        </span>
                                        <div className={`borderr ${activeIndexColor === 1 ? 'active' : ''}`}></div>

                                    </div>
                                    
                                </div>
                            </div>
                            <div className="doDlAA">
                                <p className="bPJqXH ">Kích cỡ</p>
                                <div className="fKNxKo">
                                    <div className="dhKKOZ" onClick={() => handleClickSize(0, "2XL")}>
                                        <span>2XL</span>
                                        <div className={`borderr ${activeIndexSize === 0 ? 'active' : ''}`}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="bufoOo">
                        <div className="bPRVIq">Thông tin vận chuyển</div>
                        <div className="hNNYbU" style={{borderBottom:"none"}}>
                            <div className="lswfd">
                                <div className="niBXE">
                                    289 ung văn khiêm, p25, Bình Thạnh
                                </div>
                                <span>Đổi</span>
                            </div>
                        </div>
                        <div className="hNNYbU" style={{borderBottom:"none"}}>
                            <div className="desjzq">
                                <div className="shipping-info__item">
                                    <div className="shipping-info__item__header">
                                        <div className="shipping-info__item__header__logo">logo</div>
                                        <div className="shipping-info__item__header__highlight">message</div>
                                    </div>
                                    <div className="shipping-info__item__fee">
                                        <div className="shipping-info__item__fee_name ">
                                            <span>thời gian</span>
                                        </div>
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
                                    <span>Xuất sứ</span>
                                    <span className="chhHdv">Việt Nam</span>
                                </div>
                            </div>
                            <div className="hNNYbU">
                                <div className="guWvLv">    
                                    <span>Thương hiệu</span>
                                    <span className="chhHdv">Yame</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bufoOo">
                        <div className="bPRVIq">Mô tả sản phẩm</div>
                        <div className="eba-dki">
                            <div className="xbBes">
                               {collapse                  
                               ? <div >
                               Quần Thể Thao Túi Hộp Nam Phúc An 1012 - Xám được may từ chất liệu vải thun cotton cao cấp, thoáng mát, không tạo cảm giác hầm bí khi mặc.
Kiểu dáng ngang gối năng động
<div className="gradient"></div>

                               </div >  
                               : <div className="imwRtb">
                                Quần Thể Thao Túi Hộp Nam Phúc An 1012 - Xám được may từ chất liệu vải thun cotton cao cấp, thoáng mát, không tạo cảm giác hầm bí khi mặc.
Kiểu dáng ngang gối năng động      
                                </div>}                                      
                            {collapse 
                            ? <a href="" className="btn-more" onClick={handleClickCollapse}>Xem thêm</a> 
                            : <a href="" className="btn-more" onClick={handleClickCollapse}>Thu gọn</a>}
                            </div>
                        </div>
                    </div>
                </div>
                    </div>
                
     
            </div>


            <div className="grJPUk">
                <div className="iueye" style={{position:"sticky", top:"12px", display:"flex", flexDirection:"column", alignItems: "stretch", gap:"12px", margin: "1rem 0"}}>
                    <div className="bufoOo" style={{gap:"16px", overflow:"initial"}}>                  
                        <div className="bfJGpi" style={{display:"flex", gap: "0px", alignItems:"center", height: "65px"}}>
                            <div className="kjhff">
                                <div className="mnvbc">
                                    <span className="seller-name">
                                        <div className="myqYs">
                                            <a href="" className="">
                                                <span>Xiaomi</span>
                                            </a>
                                            
                                        </div>
                                    </span>

                                    <div className="bSSDTY">
                                        <div className="review item">
                                            <div className="title">
                                                <span>4.8</span>
                                                <img src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" alt="" />
                                            </div>
                                            <div className="sub-title ">(2.8k+ đánh giá)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ZcTap" >
                            <div>Đang chọn:     </div>
                            <div>{displayVariantColor}</div>
                            <div>{displayVariantSize}</div>
                        </div>
                        {/* <div className="dCPDNj"></div> */}
                        <div className="eEcWHI">
                            <div className="cbfhs">
                                <div className="lgdBsd">
                                    <p className="label">số lượng</p>
                                    <div className="group-input">
                                        <button className="disable" onClick={handleDecrease}>
                                            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg" alt="" />
                                        </button>
                                        <input type="text" className="input" value={quantity}/>
                                        <button onClick={handleIncrease}>
                                            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg" alt="" />
                                        </button>
                                    </div>
                                    {message && <div className="message" style={{color:"red", marginTop:"10px"}}>{message}</div>}
                                </div>
                            </div>
                            <div className="VKBfi">
                                <div className="fcwSuV">Tạm tính</div>
                                <div className="HGbRm">
                                    <div>{totalPrice.toLocaleString("en-US").replace(/,/g, '.')} <sup>₫</sup></div>
                                </div>
                            </div>
                            <div  className="group-button">
                                <button className="gbcanz">
                                    <span>Mua hàng</span>
                                </button>
                                <button className="jZCrXg">
                                    Thêm vào giỏ hàng
                                </button>
                                <button className="jZCrXg">
                                    <div>Mua trước trả sau</div>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
       </div>  

       <div className="bufoOo ">
    <div className="bPRVIq">Đánh giá khách hàng</div>
    <div className=".gCaHEu">
        <div className="customer-reviews__inner ">
            <div className="customer-reviews__top">
                <div style={{display: "grid", gridTemplateColumns:"1fr 2fr", width:"100%", paddingBottom: "16px"}}>
                    <div className="dZYmgO">
                        <div className="review-rating__heading">Tổng quan</div>
                        <div>
                            <div className="review-rating__summary">
                                <div className="review-rating__point">
                                    4.7
                                </div>
                                <div className="review-rating__stars">
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="24" height="24"></img></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="24" height="24"></img></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="24" height="24"></img></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="24" height="24"></img></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="24" height="24"></img></span>

                                </div>
                            </div>
                            <div className="review-rating__total">tông đánh giá</div>
                            <div className="review-rating__detail">
                                <div className="review-rating__level">
                                    <div className="hphKLs">
                                    <span> <img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="14" height="14"></img></span>
                                    <span> <img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="14" height="14"></img></span>
                                    <span> <img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="14" height="14"></img></span>
                                    <span> <img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="14" height="14"></img></span>
                                    <span> <img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="14" height="14"></img></span>
                                    <div></div>
                                    </div>
                                    <div className="lfisVy"></div>
                                    <div className="review-rating__number">5</div>
                                </div>
                                <div className="review-rating__level">
                                    <div className="hphKLs">
                                    <span> <img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="14" height="14"></img></span>
                                    <span> <img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="14" height="14"></img></span>
                                    <span> <img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="14" height="14"></img></span>
                                    <span> <img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="14" height="14"></img></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png" width="14" height="14"></img></span>
                                    <div></div>
                                    </div>
                                    <div className="lfisVy"></div>
                                    <div className="review-rating__number">4</div>
                                </div>
                                <div className="review-rating__level">
                                    <div className="hphKLs">
                                    <span> <img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="14" height="14"></img></span>
                                    <span> <img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="14" height="14"></img></span>
                                    <span> <img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="14" height="14"></img></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png" width="14" height="14"></img></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png" width="14" height="14"></img></span>
                                    <div></div>
                                    </div>
                                    <div className="lfisVy"></div>
                                    <div className="review-rating__number">1</div>
                                </div>
                                <div className="review-rating__level">
                                    <div className="hphKLs">
                                    <span> <img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="14" height="14"></img></span>
                                    <span> <img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="14" height="14"></img></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png" width="14" height="14"></img></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png" width="14" height="14"></img></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png" width="14" height="14"></img></span>
                                    <div></div>
                                    </div>
                                    <div className="lfisVy"></div>
                                    <div className="review-rating__number">2</div>
                                </div>
                                <div className="review-rating__level">
                                    <div className="hphKLs">
                                    <span> <img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="14" height="14"></img></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png" width="14" height="14"></img></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png" width="14" height="14"></img></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png" width="14" height="14"></img></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/50/f9/af/0d540e678d0d639d4eba86c1cdd38556.png" width="14" height="14"></img></span>
                                    <div></div>
                                    </div>
                                    <div className="lfisVy"></div>
                                    <div className="review-rating__number">3</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gtPdrn">
                        <div className="dpVjwc">
                            <div className="review-comment__user ">
                                <div className="review-comment__user-inner" >
                                    <div className="review-comment__user-avatar">
                                        <div className="iRypZD has-character ">
                                            <img src="../Ao Thun Carrot Theme 360GSM.jpg" alt="" />
                                            <span>NDVH</span>
                                        </div>
                                       
                                    </div>
                                    <div>
                                        <div className="review-comment__user-name">vihao</div>
                                        <div className="review-comment__user-date">ngày bình luận   </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div style={{flexGrow: 1}}>
                                <div className="review-comment__rating-title">
                                    <div className="review-comment__rating" style={{whiteSpace:"nowrap"}}>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="20" height="20"/></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="20" height="20"/></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="20" height="20"/></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="20" height="20"/></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="20" height="20"/></span>
                                    </div>
                                </div>
                                <div className="review-comment__seller-name-attributes">
                                    <div className="review-comment__seller-name">
                                        <span><i ></i></span>
                                        Đã mua hàng
                                    </div>
                                </div>
                                <div className="review-comment__content" >nội dung đánh giá</div>
                                <div className="review-comment__created-date">
                                    <div className="review-comment__attributes">
                                        <div className="review-comment__attributes--item">
                                            <span>màu sắc kích cỡ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dpVjwc">
                            <div className="review-comment__user ">
                                <div className="review-comment__user-inner" >
                                    <div className="review-comment__user-avatar">
                                        <div className="iRypZD has-character ">
                                            <img src="../Ao Thun Carrot Theme 360GSM.jpg" alt="" />
                                            <span>NDVH</span>
                                        </div>
                                       
                                    </div>
                                    <div>
                                        <div className="review-comment__user-name">vihao</div>
                                        <div className="review-comment__user-date">ngày bình luận   </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div style={{flexGrow: 1}}>
                                <div className="review-comment__rating-title">
                                    <div className="review-comment__rating" style={{whiteSpace:"nowrap"}}>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="20" height="20"/></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="20" height="20"/></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="20" height="20"/></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="20" height="20"/></span>
                                    <span><img alt="star-icon" src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png" width="20" height="20"/></span>
                                    </div>
                                </div>
                                <div className="review-comment__seller-name-attributes">
                                    <div className="review-comment__seller-name">
                                        <span><i ></i></span>
                                        Đã mua hàng
                                    </div>
                                </div>
                                <div className="review-comment__content" >nội dung đánh giá</div>
                                <div className="review-comment__created-date">
                                    <div className="review-comment__attributes">
                                        <div className="review-comment__attributes--item">
                                            <span>màu sắc kích cỡ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
       </div>
   </div>
    </> );
}
 
export default ProductDetail;