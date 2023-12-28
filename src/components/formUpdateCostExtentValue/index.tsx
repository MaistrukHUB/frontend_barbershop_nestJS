import React, { useState, useEffect } from "react";
import style from "./FormUpdateCostExtentValue.module.scss";

interface IFormUpdateCostExtentValue {
  setVisionFormUpdateCostExtentValue: any;
  index: number;
  cost: any;
  extent: any;
  setFormData: any;
}
const FormUpdateCostExtentValue: React.FC<
  IFormUpdateCostExtentValue
> = ({
  index,
  cost,
  extent,
  setFormData,
  setVisionFormUpdateCostExtentValue,
}) => {
  const [costValue, setCostValue] = useState<number>(0);
  const [extentValue, setExtentValue] = useState<number>(0);

  const handleFormDone = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    setFormData((prevData: any) => {
      const newCost = [...prevData.cost];
      const newExtent = [...prevData.extent];
      newCost[index] = costValue;
      newExtent[index] = extentValue;
      return {
        ...prevData,
        extent: newExtent,
        cost: newCost,
      };
    });
    setVisionFormUpdateCostExtentValue(false);
  };
  const closeForm = () => {
    setVisionFormUpdateCostExtentValue(false);
  };

  return (
    <div className={style.root}>
      <div className={style.formTitle}>Цінник: {index + 1}</div>
      <div onClick={closeForm} className={style.iconClose}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 30 30'
          width='20px'
          height='20px'
        >
          {" "}
          <path d='M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z' />
        </svg>
      </div>
      <form action=''>
        <label>
          Ціна: {cost}
          <input
            value={costValue}
            type='number'
            onChange={(e) => setCostValue(parseFloat(e.target.value))}
            name='cost'
          />
        </label>
        <label className={style.extentInput} htmlFor=''>
          Об'єм: {extent}
          <input
            value={extentValue}
            type='number'
            onChange={(e) =>
              setExtentValue(parseFloat(e.target.value))
            }
            name='cost'
          />
        </label>
        <button
          className={style.itemBg}
          onClick={(e) => handleFormDone(e, index)}
        >
          Оновити дані цінника
        </button>
      </form>
    </div>
  );
};

export default FormUpdateCostExtentValue;
