import { useEffect, useState } from "react";
import AxiosClient from "../../Axios/AxiosClient";
import { Col, Row } from "react-bootstrap";
// import { Rating } from "@mui/material";
import "./Favourite.css";
import { Link, useParams } from "react-router-dom";

const Favourite = () => {
  const { id } = useParams();
  const [favoriteProduct, setFavoriteProduct] = useState([]);
  const [selectedFavoriteProduct, setselectedFavoriteProduct] = useState([]);

  const UserId = localStorage.getItem("userId");
  const [shoulSubmit, setshoulSubmit] = useState(false);

  const handleFavourite = (e, id, productid) => {
    e.preventDefault();
    setselectedFavoriteProduct({
      id: id,
      productId: productid,
      userId: UserId,
      status: true,
    });
    setshoulSubmit(true);
  };

  useEffect(() => {
    if (shoulSubmit) {
      AxiosClient.post(`Favourites`, selectedFavoriteProduct)
        .then((res) => {
          console.log(res.data);
          setshoulSubmit(false);
          fetchFavoriteProducts(); 
        })
        .catch((error) => {
          console.error("Lỗi khi thêm mục yêu thích", error);
          setshoulSubmit(false);
        });
    }
  }, [shoulSubmit]);

  const fetchFavoriteProducts = () => {
    AxiosClient.get(`/Favourites/listFavorite/${UserId}`)
      .then((res) => {
        setFavoriteProduct(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching favorite products:", error);
      });
  };

  useEffect(() => {
    fetchFavoriteProducts(); 
  }, [UserId]);

  return (
    <div>
      <Row>
        <div>
          <div className="jXurFV1">
            <div className="kagiDG1">
              <div className="inner1">
                <ul className="list1">
                  {favoriteProduct.map((item) => (
                    <>
                      <li className="item1">
                        <div
                          className="btn-delete1"
                          onClick={(e) =>
                            handleFavourite(e, item.id, item.productId)
                          }
                        >
                          x
                        </div>
                        <div className="thumbnail1">
                          <Link to={`/detail/${item.productId}`}>
                            <div className="jDowEZ1">
                              <img
                                src={`https://localhost:7073/images/${item.imageName}`}
                                alt="hinhalt1"
                              />
                            </div>
                          </Link>
                        </div>
                        <div className="body1">
                          <Link
                            to={`/detail/${item.productId}`}
                            className="name1"
                            style={{ paddingTop: "3rem" }}
                          >
                            {item.nameProduct}
                          </Link>
                          <div className="rating1"></div>
                          <div className="review-count1"></div>
                          <div className="description1"></div>
                        </div>
                        <div className="footer1">
                          <div
                            className="price has-discount1"
                            style={{ paddingTop: "3rem" }}
                          >
                            {item.price
                              .toLocaleString("en-US")
                              .replace(/,/g, ".")}
                          </div>
                          <div className="wrap1"></div>
                        </div>
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
};
export default Favourite;
