import { Routes, Route } from "react-router";
import Category from "./pages/categorys";
import CategoryProducts from "./pages/categoryProducts";
import Login from "./pages/login";
import Home from "./pages/home";
import Register from "./pages/register";
import Products from "./pages/products";

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="category">
          <Route index element={<Category />} />
          <Route path="/category/:categoryId" element={<CategoryProducts />} />
          {/* <Route path="product" element={<Product />} /> */}
        </Route>
      </Routes>
    </>
  )
}

export default App
