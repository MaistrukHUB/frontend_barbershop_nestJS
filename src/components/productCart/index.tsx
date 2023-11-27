import { Link } from "react-router-dom";
import style from "./ProductCart.module.scss";
import React, { useState } from "react";
import { ProductItem } from "../../common/@types/product";

const ProductCart: React.FC<any> = ({ itemObj }) => {
  const [selectedExtent, setSelectedExtent] = useState<number>(0);

  const handleExtent = (index: number) => {
    setSelectedExtent(index);
  };

  return (
    <div className={style.productBlockWrapper}>
      <div className={style.productBlock}>
        <Link to={`/`}>
          <img
            className={style.productBlockImage}
            src={itemObj.img[0]}
            alt='product'
          />
        </Link>

        <h4 className={style.productBlockTitle}>{itemObj.name}</h4>
        {itemObj.extent.length > 0 && (
          <div className={style.productBlockSelector}>
            <ul>
              {itemObj.extent.map((item: number, index: number) => (
                <li
                  onClick={() => handleExtent(index)}
                  key={item}
                  className={
                    selectedExtent === index ? style.active : ""
                  }
                >
                  {item}{" "}
                  {itemObj.category === "beard" ||
                  itemObj.category === "shave"
                    ? "мл."
                    : "гр."}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={style.productBlockBottom}>
          <div className={style.productBlockPrice}>
            {itemObj.cost[selectedExtent]} ГРН
          </div>
          <div className={`${style.button}`}>
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                fill='white'
              />
            </svg>
            <span>Додати</span>
            <span>0</span>
            {/* {countItems > 0 ? <i>{countItems} </i> : ""} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
