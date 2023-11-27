export type ProductItem = {
  name: string;
  rating: number | null;
  type: string;
  about: string;
  category: string;
  cost: number[];
  extent: number[];
  img: string[];
};

export type ContentItemsProps = {
  products: ProductItem[];
  status: string;
};
