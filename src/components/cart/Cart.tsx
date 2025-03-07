import { useMemo, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, changeSelectedQuality } = useAppContext();
  const [errorId, setErrorId] = useState(0);

  const totalCost = useMemo(() => {
    if (cart.length) {
      return cart.reduce((prev, current) => {
        prev += current.price * current.selectedQuality;
        return prev;
      }, 0);
    } else {
      return 0;
    }
  }, [cart]);

  return (
    <div>
      <h1>Shopping Cart</h1>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.length
            ? cart.map((cartProduct) => (
                <tr key={`cart_row_${cartProduct.id}`}>
                  <td>
                    <img src={cartProduct.imageUrl} alt={cartProduct.name} />
                    <div>
                      <span>{cartProduct.name}</span>
                    </div>
                  </td>
                  <td>
                    <span>{cartProduct.price}</span>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="quantity-input"
                      value={cartProduct.selectedQuality}
                      onChange={(e) => {
                        if (Number(e.target.value) <= cartProduct.quantity) {
                          setErrorId(0);
                          changeSelectedQuality(
                            cartProduct.id,
                            Number(e.target.value)
                          );
                        } else {
                          setErrorId(cartProduct.id);
                        }
                      }}
                      min="1"
                    />{" "}
                    {errorId === cartProduct.id ? (
                      <span style={{ color: "red" }}>
                        Selected quantity exceeding{" "}
                      </span>
                    ) : null}
                  </td>
                  <td>{cartProduct.price * cartProduct.selectedQuality} </td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(cartProduct.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>

      <div className="total-cost">
        Total: <span>Rs. {totalCost}</span>
      </div>
    </div>
  );
}

export default Cart;
