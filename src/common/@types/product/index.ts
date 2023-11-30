export type ProductItem = {
  name: string;
  rating: number | null;
  type: string;
  about: string;
  category: string;
  cost: number[];
  extent: number[];
  img: string;
};

export type ContentItemsProps = {
  products: ProductItem[];
  status: string;
};

export enum ProductMode {
  OnlyShow = "onlyShow",
  Edit = "edit",
}

export interface IPropsProductsContainer {
  mode: ProductMode;
  products: ProductItem[];
  status: string;
}
