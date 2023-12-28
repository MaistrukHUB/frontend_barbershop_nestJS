export type ProductItem = {
  id?: string; // Необов'язкове поле id
  name: string;
  rating: number | null;
  type: string;
  about: string;
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
