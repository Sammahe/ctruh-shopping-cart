import { Link } from "react-router-dom";
import shoppingCart from "../../assets/shopping_cart.svg";
import "./Toolbar.css";
import { useAppContext } from "../../context/AppContext";

export default function ToolBar() {
  const { cartedItems } = useAppContext();
  return (
    <header className="toolbar sticky-header">
      <div className="logo">Shopping</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">
          <img src={shoppingCart} alt="Show cart" />
          <span className="badge">{cartedItems}</span>
        </Link>
      </nav>
    </header>
  );
}
