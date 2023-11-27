import React from "react";
import style from "./ProductItemsContainer.module.scss";
import {
  ContentItemsProps,
  ProductItem,
} from "../../common/@types/product";
import { ProductCart } from "../index";

const ProductItemsContainer: React.FC<ContentItemsProps> = ({
  products,
  status,
}) => {
  return (
    <div className={`${style.root} `}>
      {status === "error" ? (
        // <ErrorBlock />
        <p>ErrorBlock</p>
      ) : (
        <div className={style.items}>
          {status === "loading"
            ? [...new Array(9)].map((_, index) => (
                // <MyLoader key={index} />
                <p>myLoader</p>
              ))
            : products.map((obj: ProductItem) => (
                <ProductCart key={obj.name} itemObj={obj} />
              ))}
        </div>
      )}
    </div>
  );
};

export default ProductItemsContainer;
