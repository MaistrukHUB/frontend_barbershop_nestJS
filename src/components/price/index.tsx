import React from "react";
import style from "./Price.module.scss";

type PriceItem = {
  name: string;
  cost: string;
};

type PriceType = PriceItem[];

const price: PriceType = [
  {
    name: "ЧОЛОВІЧА СТРИЖКА",
    cost: "від  350",
  },
  {
    name: "СТРИЖКА БОРОДИ",
    cost: "від  250",
  },
  {
    name: "СТРИЖКА + БОРОДИ",
    cost: "від  650",
  },
  {
    name: "ДИТЯЧА СТРИЖКА",
    cost: "від   300",
  },
  {
    name: "СТРИЖКА ПІД 0",
    cost: "150",
  },
  {
    name: "СТРИЖКА НОЖИЦЯМИ",
    cost: "від  400",
  },
  {
    name: "КАМУФЛЮВАННЯ БОРОДИ",
    cost: "150",
  },
  {
    name: "КАМУФЛЮВАННЯ СИВИНИ",
    cost: "200",
  },
  {
    name: "КОРОЛІВСЬКЕ ГОЛІННЯ",
    cost: "200",
  },
  {
    name: "УКЛАДКА",
    cost: "100",
  },
];

const Price: React.FC = () => {
  return (
    <div className={`${style.root} content`}>
      <p className={style.priceListTitle}>ПОСЛУГИ</p>

      <ul className={style.priceList}>
        {price &&
          price.map((item: PriceItem) => (
            <li key={item.name} className={style.priceListItem}>
              <p>{item.name}</p>
              <span>{item.cost} ГРН.</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Price;
