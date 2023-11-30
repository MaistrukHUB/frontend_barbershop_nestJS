// FormAddExtent.tsx
import React, { useState, useEffect } from "react";
import style from "./FormAddExtent.module.scss";

export interface IFormAddExtentProps {
  id: any;
  handleFormCreate: (
    cost: number,
    extent: number,
    id: number
  ) => void;
  formData: any;
  setIsVisionButton: any;
}
const FormAddExtent: React.FC<IFormAddExtentProps> = ({
  handleFormCreate,
  id,
  formData,
  setIsVisionButton,
}) => {
  const [costValue, setCostValue] = useState<number>(0);
  const [extentValue, setExtentValue] = useState<number>(0);
  const [visibleExtent, setVisibleExtent] = useState<boolean>(false);

  useEffect(() => {
    setCostValue(0);
    setExtentValue(0);
  }, []);

  const handleFormCreateClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (costValue) {
      if (formData.type === "certificate") {
        setExtentValue(0);
      }
      handleFormCreate(costValue, extentValue, id);
      setIsVisionButton(true);
      setCostValue(0);
      setExtentValue(0);
    } else {
      console.error("costValue або extentValue не визначено");
    }
  };

  const handelCreateExtent = (e: any) => {
    e.preventDefault();
    setVisibleExtent(true);
  };

  return (
    <form className={style.root}>
      <label>
        Ціна:
        <input
          type='number'
          onChange={(e) => setCostValue(parseFloat(e.target.value))}
          name='cost'
        />
      </label>
      {!visibleExtent && formData.type !== "certificate" ? (
        <>
          <button
            className={style.itemBg}
            onClick={(e) => handelCreateExtent(e)}
          >
            Додати об'єм
          </button>
        </>
      ) : (
        ""
      )}

      {visibleExtent && formData.type !== "certificate" ? (
        <label>
          Об'єм:
          <input
            type='number'
            onChange={(e) =>
              setExtentValue(parseFloat(e.target.value))
            }
            name='cost'
          />
        </label>
      ) : null}

      <button
        className={style.itemBg}
        onClick={handleFormCreateClick}
      >
        Стоврити цінник
      </button>
    </form>
  );
};

export default FormAddExtent;
