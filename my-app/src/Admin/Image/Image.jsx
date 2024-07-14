import { createRef, useEffect, useRef, useState } from "react";
import $ from 'jquery';
import AxiosClient from "../../Axios/AxiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

const ImagesAdd = () => {

    var id = 0;
    const [selectedProduct, setselectedProduct] = useState({
        category: {},
    });
    const [Products, setProducts] = useState([]);

    const [dataLoaded, setDataLoaded] = useState(false);

    const handleFileSelect = (e, idProduct) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("imageURL", file.name);
        formData.append("fileImage", file);
        formData.append("productId", idProduct);
        AxiosClient.post(`/Images`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(() => {
            window.location.reload();
            toast.success(() => (
                <div>Thêm hình ảnh  sản phẩm thành công</div>), {
                position: "top-right",
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
        })
        .catch((error) => {
            toast.error(() => (
              <div>Thêm hình ảnh sản phẩm thất bại</div>), {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              closeButton: false,
              className: "custom-toast",
              toastId: 'custom-toast-error'
            });
            console.error("There was an error!", error);
          });
    };

    useEffect(() => {
        AxiosClient.get(`/Products`).then((res) => {
            setProducts(res.data);
            setDataLoaded(true);
        });
    }, []);

    const splitDesc = (desc) => {
        const newDesc = desc.split('-').filter(item => item);
        return newDesc;
      }

    return (
        <>
            <div>
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-12 d-flex no-block align-items-center">
                            <h4 className="page-title">Thêm Hình  Ảnh Sản Phẩm</h4>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table
                                            id="myTable"
                                            className="table table-striped table-bordered display nowrap"
                                            style={{ width: "100%" }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Tên sản phẩm</th>
                                                    <th>Mô tả sản phẩm</th>
                                                    <th>Giá bán</th>
                                                    <th>Ngày tạo sản phẩm</th>
                                                    <th>Nguồn gốc</th>
                                                    <th>Thương hiệu</th>
                                                    <th>Chức năng</th>
                                                </tr>
                                            </thead>
                                            <tbody style={{verticalAlign: 'baseline'}}>
                                                {Products.map((item) => {
                                                    return (
                                                        <tr key={item.id}>
                                                            {/* <td className="product-name">
                //     <img src="https://via.placeholder.com/50" alt="Product Image" />
                //     Thanh Selenite Thô - Raw Selenite Bar
                //     <br />2 biến thể
                //   </td> */}
                                                            <td>{(id += 1)}</td>
                                                            <td>{item.name}</td>
                                                            <td>{splitDesc(item.description).map((item, index) => (
                                                                <p key={index}>- {item}</p>
                                                            ))}</td>
                                                            <td>{item.price.toLocaleString("en-US").replace(/,/g, ".")} ₫</td>
                                                            <td>{item.createTime}</td>
                                                            <td>{item.brand}</td>
                                                            <td>{item.origin}</td>
                                                            <td>

                                                                <form encType="multipart/form-data">
                                                                    <input
                                                                        type="file"
                                                                        onChange={(e) => handleFileSelect(e, item.id)}
                                                                    />

                                                                </form>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Tên sản phẩm</th>
                                                    <th>Mô tả sản phẩm</th>
                                                    <th>Giá bán</th>
                                                    <th>Ngày tạo sản phẩm</th>
                                                    <th>Nguồn góc</th>
                                                    <th>Thương hiệu</th>
                                                    <th>Chức năng</th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>

        </>);
}

export default ImagesAdd;