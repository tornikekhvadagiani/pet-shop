import { Route, Routes } from "react-router-dom"
import AnimalsPage from "./pages/AnimalsPage"
import CategoryPage from "./pages/CategoryPage"
import HomePage from "./pages/HomePage"

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
    <Route path="Animals" element={<AnimalsPage/>}/>
    <Route path="category" element={<CategoryPage/>}/>
    </Routes>
  )
}

export default Router