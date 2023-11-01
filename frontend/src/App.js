import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Shop from "./components/Shop";
import Register from "./components/Register";
import Checkout from "./components/Checkout";
import Purchase from "./components/Purchase";
import Login from "./components/Login";
import { CartProvider } from "./components/CartContext";
import { PurchaseProvider } from "./components/PurchaseContext";
function App() {
  return (
    <CartProvider>
      <PurchaseProvider>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/auth" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/purchase" element={<Purchase />} />
          </Routes>
        </div>
      </PurchaseProvider>
    </CartProvider>
  );
}

export default App;
