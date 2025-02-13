import { Route, Routes } from "react-router-dom";
import AnimalsPage from "./pages/AnimalsPage";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import AppLayout from "./layout/AppLayout";
import CheckoutPage from "./pages/CheckoutPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="animals" element={<AnimalsPage />} />
        <Route path="category" element={<CategoryPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
