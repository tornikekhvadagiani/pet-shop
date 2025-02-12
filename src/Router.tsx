import { Route } from "react-router-dom"
import AnimalsPage from "./pages/AnimalsPage"
import CategoryPage from "./pages/CategoryPage"
import HomePage from "./pages/HomePage"
import AppLayout from "./layout/AppLayout"






const Router = () => {
  return (
    <Route element={<AppLayout/>}>  
          <Route path="/" element={<HomePage/>}/>
          <Route path="Animals" element={<AnimalsPage/>}/>
          <Route path="category" element={<CategoryPage/>}/>
       </Route> 
   
  )
}

export default Router


