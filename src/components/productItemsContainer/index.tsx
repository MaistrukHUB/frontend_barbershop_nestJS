import React from "react";
import style from "./ProductItemsContainer.module.scss";
import {
  IPropsProductsContainer,
  ProductItem,
  ProductMode,
} from "../../common/@types/product";
import { CreateNewProduct, ProductCard } from "../index";
import { useAdmin, useAppSelector } from "../../utils/hook";

const ProductItemsContainer: React.FC<IPropsProductsContainer> = ({
  products,
  status,
  mode,
}) => {
  const admin = useAdmin();

  return (
    <div className={`${style.root} `}>
      {status === "error" ? (
        // <ErrorBlock />
        <p>ErrorBlock</p>
      ) : (
        <div className={style.items}>
          {mode === ProductMode.Edit && admin && <CreateNewProduct />}
          {status === "loading"
            ? [...new Array(9)].map((_, index) => (
                // <MyLoader key={index} />
                <p key={index}>myLoader</p>
              ))
            : products.map((obj: ProductItem) => (
                <ProductCard
                  admin={admin}
                  key={obj.name}
                  itemObj={obj}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default ProductItemsContainer;
