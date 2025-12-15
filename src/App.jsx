import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import OrderSuccess from "./pages/OrderSuccess";
import Auth from "./pages/Auth";
import Orders from "./pages/Orders";
import AboutNoaze from "./pages/AboutNoaze";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutNoaze />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
