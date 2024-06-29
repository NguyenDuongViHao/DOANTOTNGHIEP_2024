import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index from "../Admin/Index"
import Main from "../User/Layout/Main"
import IndexUser from "../User/Layout/IndexUser"
import AccountList from "../Admin/Account/AccountList"
import ProductDetail from "../User/Product/ProductDetail"
import AccountAdd from "../Admin/Account/AccountAdd"
import ProductList from "../Admin/Product/ProductList"
import ProductAdd from "../Admin/Product/ProductAdd"

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
                    </Route>
                    </Route>
               
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Router