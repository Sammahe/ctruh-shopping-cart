export interface ProductCard {
  id: number;
  imageURL: string;
  name: string;
  type: string;
  price: number;
  currency: string;
  color: string;
  gender: string;
  quantity: number;
}
export interface PriceRange {
  start: number;
  end: number;
}
export interface FilterTypes {
  gender: string[];
  color: string[];
  priceRange: PriceRange[];
  type: string[];
}

export interface CartProduct {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  selectedQuality: number;
  total: number;
}
