const Footer = () => {
  return (
    <>
      {/* <div className="newsletter">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <h4>Newsletter</h4>
                <p>
                  Subscribe to our newsletter and get 20% off your first
                  purchase
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <form action="post">
                <div className="newsletter_form d-flex flex-md-row flex-column flex-xs-column align-items-center justify-content-lg-end justify-content-center">
                  <input
                    id="newsletter_email"
                    type="email"
                    placeholder="Your email"
                    required="required"
                    data-error="Valid email is required."
                  />
                  <button
                    id="newsletter_submit"
                    type="submit"
                    className="newsletter_submit_btn trans_300"
                    value="Submit"
                  >
                    subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}

      <footer className="footer" style={{position:"absolute", bottom:0, width:"100%"}}>
        <div className="cyhWKd">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              padding: "0 80px",
            }}
          >
            <div style={{ width: "268px" }}>
              <h4 className="">Hổ trợ khách hàng</h4>
              <p className="hotline pjrjr">
                Hotline:{" "}
                <span style={{ color: "rgb(56, 56, 61)", fontWeight: "500" }}>
                  0355303024
                </span>
              </p>
              <p className="hotline pjrjr">
                Email:{" "}
                <a
                  style={{ color: "rgb(56, 56, 61)", fontWeight: "500" }}
                  href="mailto:0306211024@caothang.edu.vn"
                >
                  0306211024@caothang.edu.vn
                </a>
              </p>
            </div>
            <div style={{ width: "268px" }}>
              <h4 className="">Phương thức thanh toán</h4>
              <p className="plkjh">
                <span className="icon">
                  <img
                    class="method-icon"
                    src="https://salt.tikicdn.com/ts/upload/92/b2/78/1b3b9cda5208b323eb9ec56b84c7eb87.png"
                    width="32"
                    height="32"
                    alt="icon"
                  />
                </span>
                <span className="icon">
                  <img
                    class="method-icon"
                    src="https://salt.tikicdn.com/ts/upload/77/6a/df/a35cb9c62b9215dbc6d334a77cda4327.png"
                    width="32"
                    height="32"
                    alt="icon"
                  />
                </span>
              </p>
            </div>
            <div style={{ width: "268px" }}>
              <h4 className="">Kết nối với chúng tôi</h4>
              <p className="plkjh">
                <span className="icon">
                  <a href="">
                    <img
                      src="https://img.lazcdn.com/g/tps/imgextra/i3/O1CN01Wdetn224xMIRNihao_!!6000000007457-2-tps-34-34.png"
                      alt="fb"
                    />
                  </a>
                </span>
                <span className="icon">
                  <a href="">
                    <img
                      src="https://img.lazcdn.com/g/tps/imgextra/i4/O1CN01zt1zOu1zsFnzoIWje_!!6000000006769-2-tps-34-34.png"
                      alt="yt"
                      data-spm-anchor-id="a2o4n.homepage.sns.i0.19053bdcCfcVL6"
                    />
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>   
    </>
  );
};
export default Footer;
