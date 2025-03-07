import { createContext, useState, useContext } from "react";
import { CartProduct } from "../types/product";

interface AppContextType {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: number) => void;
  changeSelectedQuality: (productId: number, selectedQuantity: number) => void;
  cartedItems: number;
}
const AppContext = createContext<AppContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  changeSelectedQuality: () => {},
  cartedItems: 0,
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [cartedItems, setCartedItems] = useState(0);
  const addToCart = (product: CartProduct) => {
    const tempCartedProducts = cart.length
      ? cart.find((cartItem) => cartItem.id === product.id)
        ? cart.map((item) => {
            if (item.id === product.id) {
              return {
                ...item,
                selectedQuality: item.selectedQuality + 1,
                total: item.price + product.price,
              };
            } else {
              return item;
            }
          })
        : [...cart, product]
      : [product];
    setCart(tempCartedProducts);
    setCartedItems(tempCartedProducts.length);
  };

  const removeFromCart = (productId: number) => {
    const tempProductsAfterRemove = cart.filter(
      (product) => product.id !== productId
    );
    setCart(tempProductsAfterRemove);
    setCartedItems(tempProductsAfterRemove.length);
  };

  const changeSelectedQuality = (
    productId: number,
    selectedQuantity: number
  ) => {
    const tempCartedProducts = cart.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          selectedQuality: selectedQuantity,
          total: item.price + selectedQuantity,
        };
      } else {
        return item;
      }
    });
    setCart(tempCartedProducts);
  };
  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        cartedItems,
        changeSelectedQuality,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
