import "./Products.css";
import SearchIcon from "../../assets/search.svg";
import FilterIcon from "../../assets/filter.svg";
import { FilterTypes, ProductCard } from "../../types/product";
import ProductCardView from "./ProductCardView";
interface ProductsProps {
  productsList: ProductCard[];
  setSearchText: (text: string) => void;
  selectedFilters: FilterTypes;
  setSelectedFilters: (selectedFilters: FilterTypes) => void;
}
function Products({
  productsList,
  setSearchText,
  selectedFilters,
  setSelectedFilters,
}: ProductsProps) {
  return (
    <div className="catalogue">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(changeEvent) => setSearchText(changeEvent.target.value)}
          onKeyDown={(keyDownEvent) => {
            if (keyDownEvent.key == "Enter") {
              setSelectedFilters({ ...selectedFilters });
            }
          }}
        />
        <img
          id="iconButton"
          src={SearchIcon}
          alt="Search"
          onClick={() => setSelectedFilters({ ...selectedFilters })}
        />
        <img
          id="iconButton"
          src={FilterIcon}
          alt="filter"
          onClick={() => console.log("Filter clicked")}
        />
      </div>

      {productsList?.length ? (
        <div className="product-list">
          {productsList.map((product) => {
            return ProductCardView(product);
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Products;
