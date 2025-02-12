import { Route, Routes } from "react-router-dom"
import AnimalsPage from "./pages/AnimalsPage"
import HomePage from "./pages/HomePage"
import AppLayout from "./layout/AppLayout"
import CategoryPage from "./pages/CategoryPage"




const Router = () => {
  return (
    <Routes>
      <Route element={<AppLayout/>}>  
          <Route path="/" element={<HomePage/>}/>
          <Route path="Animals" element={<AnimalsPage/>}/>
          <Route path="category" element={<CategoryPage/>}/>
       </Route> 
    </Routes>
  )
}
export default Router

