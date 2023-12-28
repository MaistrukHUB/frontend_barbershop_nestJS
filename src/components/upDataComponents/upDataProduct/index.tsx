import React from "react";
import style from "./UpDataProduct.module.scss";
import { useAppSelector } from "../../../utils/hook";
import ProductItemsContainer from "../../productItemsContainer";
import { ProductMode } from "../../../common/@types/product";



const UpDataProduct = () => {
  const { products, status } = useAppSelector(
    (state) => state.productsSlice
  );
  return (
    <div className={style.root}>
      <ProductItemsContainer
        products={products}
        status={status}
        mode={ProductMode.Edit}
      />
    </div>
  );
};

export default UpDataProduct;
