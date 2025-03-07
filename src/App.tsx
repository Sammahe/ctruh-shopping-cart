import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Toolbar from "./components/toolbar/Toolbar";
import Cart from "./components/cart/Cart";
import ProductsCatalogue from "./components/products/ProductsCatelog";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Router>
        <Toolbar />
        <Routes>
          <Route path="/" element={<ProductsCatalogue />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
