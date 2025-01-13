import { Routes, Route } from "react-router";
import Product from "./pages/products";
import Category from "./pages/categorys";
import Login from "./pages/login";
import Home from "./pages/home";
import Register from "./pages/register";

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="category">
          <Route index element={<Category />} />
          <Route path="product" element={<Product />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
