import { useAppContext } from "../../context/AppContext";
import { ProductCard } from "../../types/product";

function ProductCardView(product: ProductCard) {
  const { addToCart } = useAppContext();

  const handleAddProductToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      imageUrl: product.imageURL,
      price: product.price,
      quantity: product.quantity,
      selectedQuality: 1,
      total: product.price,
    });
  };
  return (
    <div className="product-card" key={`${product.name}-${product.id}`}>
      <h4>{product.name}</h4>
      <img src={product.imageURL} alt="Product name" />
      <p className="card-bottom">
        <strong>
          {product.currency === "INR" ? "Rs. " : "$"} {product.price}
        </strong>{" "}
        <button onClick={handleAddProductToCart}>Add to cart</button>
      </p>
    </div>
  );
}

export default ProductCardView;
