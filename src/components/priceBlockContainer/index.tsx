import { PriceItem } from "../../common/@types/price";
import { useAdmin, useAxiosConfig } from "../../utils/hook";
import PriceBlock, { ModePriceBlock } from "../priceBlock";
import style from "./PriceBlockContainer.module.scss";

import React from "react";

interface IPriceBlockContainer {
  price: PriceItem[];
  mode: ModePriceBlock;
}

const PriceBlockContainer: React.FC<IPriceBlockContainer> = ({
  price,
  mode,
}) => {
  const admin = useAdmin();
  const axiosConfig = useAxiosConfig();

  return (
    <div className={style.root}>
      <p className={style.priceContainerTitle}>Прайс лист</p>
      {price ? (
        <ul className={style.priceList}>
          {price &&
            price.map((item: PriceItem) => (
              <PriceBlock key={item.name} item={item} mode={mode} />
            ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default PriceBlockContainer;
