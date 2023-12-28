export type CartItemType = {
  idCartProduct: string;
  idProduct: string;
  img: string;
  name: string;
  extent: number;
  count: number;
  cost: number;
  type: string;
};
export interface CartSliceState {
  productsCart: CartItemType[];
  totalPrice: number;
  totalCount: number;
}
export interface ICartItemProps {
  productCart: CartItemType;
}

export interface IFormDataByOrder {
  name: string;
  phone: number | null;
  email: string;
}
