import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layout/AppLayout";
import LoginLayout from "./layout/LoginLayout";
import About from "./pages/About";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Page401 from "./pages/Page401";
import Products from "./pages/Products";
import SignIn from "./pages/SignIn";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Admin from "./pages/admin/Admin";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/login" element={<SignIn />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:product_id" element={<ProductDetail />} />
          <Route path="products/filter/:category" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="401" element={<Page401 />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route
          path="panel"
          element={
            <ProtectedRoute children={<Admin />} permittedRoles={["ADMIN"]} />
          }
        />
      </Routes>
    </>
  );
};

export default App;
