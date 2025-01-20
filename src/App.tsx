import { Routes, Route } from "react-router";
import Category from "./pages/categorys";
import CategoryProducts from "./pages/categoryProducts";
import Login from "./pages/login";
import Home from "./pages/home";
import Register from "./pages/register";
import Products from "./pages/products";
import Details from "./pages/details";
import Cart from "./pages/cart";

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
        </Route>
        <Route path="product">
          <Route path="/product/:productId" element={<Details />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  )
}

export default App
