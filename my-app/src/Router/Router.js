import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index from "../Admin/Index"
import Main from "../User/Layout/Main"
import IndexUser from "../User/Layout/IndexUser"
import AccountList from "../Admin/Account/AccountList"
import ProductDetail from "../User/Product/ProductDetail"
import AccountAdd from "../Admin/Account/AccountAdd"
import ProductList from "../Admin/Product/ProductList"
import ProductAdd from "../Admin/Product/ProductAdd"
import Cart from "../User/Cart/Cart"
import Shipping from "../User/Cart/Shipping"
import Pay from "../User/Cart/Pay"
import ShippingCart from "../User/Cart/ShippingCart"
import SearchResultComponent from "../User/Layout/SearchResultComponent"
import InfoUser from "../User/Account/InfoUser"
import InvoiceDetails from "../User/Account/InvoiceDetails"

const Router = () =>{
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Route path="admin" element={<Index />} exact>
                            <Route path="accounts" element={<AccountList/>}/>
                            <Route path="accounts/add" element={<AccountAdd/>}/>
                            <Route path="products" element={<ProductList/>}/>
                            <Route path="products/add" element={<ProductAdd/>}/>
                        </Route>
                    </Route>
                    <Route>
                        <Route path="/" element={<IndexUser/>}>
                        <Route path="" element={<Main />}></Route>
                        <Route path= "detail/:id" element={<ProductDetail/>}/>
                        <Route path="cart" element={<Cart/>} />
                        <Route path="payment/shipping" element={<Shipping/>}/>
                        <Route path="cart/shipping" element={<ShippingCart/>}/>
                        <Route path="pay" element={<Pay/>} /> 
                        <Route path="search-results" element={<SearchResultComponent />} />
                        <Route path="info" element={<InfoUser/>} />
                        <Route path="order" element={<InfoUser/>} />
                        <Route path="favourite" element={<InfoUser/>} />
                        <Route path="order/invoice/detail/:id" element={<InvoiceDetails />} />
                    </Route>
                    </Route>
               
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Router