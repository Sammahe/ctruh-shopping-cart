import Products from "./Products";
import "./Catalogue.css";
import Filters from "../filters/Filters";
import { useEffect, useState } from "react";
import { FilterTypes, ProductCard } from "../../types/product";
import { fetchInterceptor } from "../../utils/fetchInterceptor";
import { useDebounce } from "../../utils/useDebounce";
export const DEFAULT_FILTER_CATEGORIES: FilterTypes = {
  gender: [],
  color: [],
  priceRange: [],
  type: [],
};
function ProductsCatalogue() {
  const [productsList, setProductsList] = useState<ProductCard[]>([]);
  const [originalProductsList, setOriginalProductList] = useState<
    ProductCard[]
  >([]);

  const [filterCategories, setFilterCategories] = useState<FilterTypes>({
    ...DEFAULT_FILTER_CATEGORIES,
  });
  const [selectedFilters, setSelectedFilters] = useState<FilterTypes>({
    gender: [],
    color: [],
    priceRange: [],
    type: [],
  });
  const [searchText, setSearchText] = useState("");

  const debounceSelectedFilterChange = useDebounce(selectedFilters, 500);
  const getAllProducts = async () => {
    try {
      const { request, response } = await fetchInterceptor(
        "https://my-json-server.typicode.com/Gulzeesh/demo/products",
        "GET"
      );

      if (request?.ok) {
        processFilterCategories(response as ProductCard[]);
        setProductsList(response as ProductCard[]);
        setOriginalProductList(response as ProductCard[]);
      }
    } catch {
      setProductsList([]);
      setOriginalProductList([]);
    }
  };

  const processFilterCategories = (products: ProductCard[]) => {
    if (products.length) {
      const tempFilterCategories: FilterTypes = { ...DEFAULT_FILTER_CATEGORIES };
      products.map((product) => {
        if (!tempFilterCategories.gender.includes(product.gender)) {
          tempFilterCategories.gender.push(product.gender);
        }
        if (!tempFilterCategories.color.includes(product.color)) {
          tempFilterCategories.color.push(product.color);
        }
        if (!tempFilterCategories.type.includes(product.type)) {
          tempFilterCategories.type.push(product.type);
        }
      });
      tempFilterCategories.priceRange = [
        {
          start: 0,
          end: 250,
        },
        {
          start: 251,
          end: 450,
        },
        {
          start: 451,
          end: 1000,
        },
      ];
      setFilterCategories(tempFilterCategories);
    } else {
      setFilterCategories({ ...DEFAULT_FILTER_CATEGORIES });
    }
  };

  const updateProductsBasedOnFilters = (
    selectedFiltersChild: FilterTypes,
    textToBeSearched: string = ""
  ) => {
    const filteredProductsList = originalProductsList.filter((product) => {
      const isTextExisted =
        !textToBeSearched ||
        textToBeSearched
          .split(" ")
          .some(
            (searchWord) =>
              product.name
                .toLocaleLowerCase()
                .includes(searchWord.toLowerCase()) ||
              product.color
                .toLocaleLowerCase()
                .includes(searchWord.toLowerCase()) ||
              product.type
                .toLocaleLowerCase()
                .includes(searchWord.toLowerCase())
          );
      const isColorMatch =
        selectedFiltersChild.color.length === 0 ||
        selectedFiltersChild.color.includes(product.color);
      const isGenderMatch =
        selectedFiltersChild.gender.length === 0 ||
        selectedFiltersChild.gender.includes(product.gender);
      const isPriceMatch =
        selectedFiltersChild.priceRange.length === 0 ||
        selectedFiltersChild.priceRange.some(
          (range) => product.price >= range.start && product.price <= range.end
        );
      const isTypeMatch =
        selectedFiltersChild.type.length === 0 ||
        selectedFiltersChild.type.includes(product.type);

      return (
        isTextExisted &&
        isColorMatch &&
        isGenderMatch &&
        isPriceMatch &&
        isTypeMatch
      );
    });
    setProductsList(filteredProductsList);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (
      selectedFilters.color.length ||
      selectedFilters.gender.length ||
      selectedFilters.priceRange.length ||
      selectedFilters.type.length ||
      searchText
    ) {
      updateProductsBasedOnFilters(selectedFilters, searchText);
    } else {
      getAllProducts();
    }
  }, [debounceSelectedFilterChange]);

  return (
    <>
      <div className="container">
        <Filters
          filterCategories={filterCategories}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        <Products
          productsList={productsList}
          setSearchText={setSearchText}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>
    </>
  );
}

export default ProductsCatalogue;
