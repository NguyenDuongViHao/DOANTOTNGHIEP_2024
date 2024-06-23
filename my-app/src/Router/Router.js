import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index from "../Admin/Index"

const Router = () =>{
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Route path="admin" element={<Index />} exact>

                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Router