import { useEffect, useState } from "react";
import "./Shipping.css";
// import Pay from "./Pay";
import AxiosClient from "../../Axios/AxiosClient";
import { Link } from "react-router-dom";

const Shipping = () => {
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [FullName, setFullName] = useState("");

  const [tempPhone, setTempPhone] = useState("");
  const [tempAddress, setTempAddress] = useState("");
  const [tempFullName, setTempFullName] = useState("");

  const [OpenEdit, setOpenEdit] = useState(false);
  const [OpenPay, setOpenPay] = useState(false);

  const [User, setUser] = useState({});

  const UserId = localStorage.getItem("userId");

  const handleEditClick = () => {
    setOpenEdit((prevIndex) => (prevIndex === false ? true : false));
    setTempFullName(FullName)
    setTempPhone(Phone)
    setTempAddress(Address)
    // setTempPhone(localStorage.getItem("Phone") || "");
    // setTempAddress(localStorage.getItem("Address") || "");
  };

  const handleCancle = () => {
    // localStorage.removeItem("tempPhone");
    // localStorage.removeItem("tempAddress");
    setOpenEdit(false);
  };

  const handleChangeFullName = (e) => {
    let value = e.target.value;
    setTempFullName(value);
  };

  const handleChangePhone = (e) => {
    let value = e.target.value;
    setTempPhone(value);
  };

  const handleChangeAddress = (e) => {
    let value = e.target.value;
    setTempAddress(value);
  };

  const handleUpdate = () => {
    AxiosClient.put(`/Users/${UserId}`, {
      id: UserId,
      phoneNumber: tempPhone,
      address: tempAddress,
      fullName: tempFullName,
    })
      .then(() => {
        setPhone(tempPhone);
        setAddress(tempAddress);
        setOpenEdit(false);
        setFullName(tempFullName);

      })
      .catch((error) => {
        console.error("Update failed", error);
      });
  };

  useEffect(() => {
    AxiosClient.get(`/Users/${UserId}`).then((res) => {
      setUser(res.data);
      setFullName(res.data.fullName || "");
      setPhone(res.data.phoneNumber || "");
      setAddress(res.data.address || "");
    });
  }, [UserId, Phone, Address, FullName]);

  return (
    <>
      {OpenPay == false && (
        <div
          style={{
            background: "rgb(245, 245, 250)",
            backgroundColor: "#efefef",
            paddingTop: "2rem",
            paddingBottom:"2rem"
          }}
        >
          <div className="hfMLFx">
            <div className="jQjVjo">
              <h3 className="title">Nhập thông tin và địa chỉ giao hàng</h3>
              <div className="address-list">
                <div className="bsrCjS">
                  <p className="name">{User.fullName}</p>
                  <p className="address">{User.address}</p>
                  <p className="phone">{User.phoneNumber}</p>
                  <p className="action">
                    <button className="btn saving-address">
                      <Link to="/pay" style={{ color: "rgb(255, 255, 255)" }}>
                        Giao đến địa điểm này
                      </Link>
                    </button>
                    <button
                      className="btn edit-address"
                      onClick={handleEditClick}
                    >
                      Sửa
                    </button>
                  </p>
                </div>
              </div>
              <div className="gpiOgm"></div>

              {OpenEdit && (
                <div className="dtkMQo">
                  <div className="form-container">
                    
                  <div className="kSzifj">
                      <label htmlFor="">Họ tên</label>
                      <input
                        type="text"
                        name="fullName"
                        id=""
                        className="girQwT"
                        onChange={handleChangeFullName}
                        value={tempFullName}
                      />
                    </div>

                    <div className="kSzifj">
                      <label htmlFor="">Số điện thoại</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        id=""
                        className="girQwT"
                        onChange={handleChangePhone}
                        value={tempPhone}
                      />
                    </div>
                    <div className="kSzifj">
                      <label htmlFor="">Địa chỉ</label>
                      <input
                        type="text"
                        name="address"
                        id=""
                        className="girQwT"
                        onChange={handleChangeAddress}
                        value={tempAddress}
                      />
                    </div>

                    <div className="kSzifj">
                      <label></label>
                      <div className="button-group">
                        <button className="cancel" onClick={handleCancle}>
                          Hủy bỏ
                        </button>
                        <button
                          className="create-update"
                          onClick={() => {
                            handleUpdate();
                          }}
                        >
                          Cập nhật
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* {OpenPay && <Pay user={User.fullName} phoneValue={Phone} addressValue={Address} onChildOpenPay={handleChildInputChange} />} */}
    </>
  );
};
export default Shipping;
