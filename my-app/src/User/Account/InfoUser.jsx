import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import "./infoUser.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import MyOrder from "./MyOrder";
import { faFileAlt, faHeart, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const InfoUser = () => {
  const { id } = useParams();
  const [listFavourite, setlistFavourite] = useState([]);
  const location = useLocation();
  const cleanPathname = location.pathname.replace("/", "");
  console.log(cleanPathname);
  const [user, setUser] = useState({});
  const UserId = localStorage.getItem("userId");
  const [errors, setError] = useState("");
  const [loading, setLoading] = useState(false);

  
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
      <>
      <div className="backgroundInfo">
      <div
        className="container"
 
       
      >
       <Tab.Container
    id="left-tabs-example"
    defaultActiveKey={cleanPathname}
  >
    <Row>
      <Col sm={3} className="mt-4 mb-3">
        <div className="userInfo jIFHQL">
          <FontAwesomeIcon icon={faUserCircle} className="iconstt" style={{fontSize:"3rem"}}/>
          <div className="info ">
            Tài khoản của
            <strong>{user.fullName}nguyen dương dương vihao</strong>
          </div>
        </div>
        <Nav variant="pills" className="flex-column managementInfo">
          <Nav.Item>
            <Nav.Link eventKey="info" as={Link} to="/info" style={{border:"0px", padding:"10px 10px"}}>
             <FontAwesomeIcon icon={faUser} />
             <span style={{marginLeft:"27px"}}> Thông tin tài khoản</span>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="order" as={Link} to="/order" style={{border:"0px", padding:"10px 10px"}}>
            <FontAwesomeIcon icon={faFileAlt} />
             <span style={{marginLeft:"27px"}}> Quản lí đơn hàng</span>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="favourite" as={Link} to="/favourite" style={{border:"0px", padding:"10px 10px"}}>
            <FontAwesomeIcon icon={faHeart} />
              <span style={{marginLeft:"27px"}}>Sản phẩm yêu thích</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
      <Col sm={9} className="mt-4">
        <Tab.Content >
          <Tab.Pane eventKey="info">
          <div className="myOrder">Thông tin tài khoản</div>
          <Card className="cardBody">
              <Card.Body style={{ padding: "0px" }}> 
              <h1>Info</h1>
              </Card.Body>
            </Card>
            
          </Tab.Pane>

          <Tab.Pane eventKey="order">
            <div className="myOrder">Đơn hàng của tôi</div>
            <Card className="cardBody">
              <Card.Body style={{ padding: "0px" }}> 
                  <MyOrder/>
              </Card.Body>
            </Card>
          </Tab.Pane>

          <Tab.Pane eventKey="favourite">
            <div className="myOrder">
              Danh sách yêu thích ({listFavourite.length})
            </div>
            <h1>yêu thích</h1>

          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
      </div>
    </div>
  </>
)
}

export default InfoUser;



