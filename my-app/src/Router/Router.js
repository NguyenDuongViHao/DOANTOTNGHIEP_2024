import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index from "../Admin/Index"
import Main from "../User/Layout/Main"
import IndexUser from "../User/Layout/IndexUser"
import AccountList from "../Admin/Account/AccountList"
import ProductDetail from "../User/Product/ProductDetail"

const Router = () =>{
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Route path="admin" element={<Index />} exact>
                            <Route path="accounts" element={<AccountList/>}></Route>
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