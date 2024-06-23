import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index from "../Admin/Index"
import Main from "../User/Layout/Main"
import IndexUser from "../User/Layout/IndexUser"

const Router = () =>{
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Route path="admin" element={<Index />} exact>

                        </Route>
                    </Route>
                    <Route>
                    <Route path="/" element={<IndexUser/>}>
                        <Route path="" element={<Main />}></Route>
                    </Route>
                    </Route>
               
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Router