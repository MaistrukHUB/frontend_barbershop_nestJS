import { CartItemType } from "../cart";

export interface ICreateOrderFormProps {
  isModalOpen: boolean;
  setIsModalOpen: any;
  productsCart: CartItemType[];
}
