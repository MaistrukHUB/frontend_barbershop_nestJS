// AddExtent.tsx
import React, { useEffect, useState } from "react";
import FormAddExtent from "../formAddExtent";
import style from "./AddExtent.module.scss";
import FormUpdateCostExtentValue from "../formUpdateCostExtentValue";

export interface IAddExtentProps {
  setFormData: any;
  formData: any;
}

type FormType = {
  id: number;
};

const AddExtent: React.FC<IAddExtentProps> = ({
  setFormData,
  formData,
}) => {
  const [forms, setForms] = useState<FormType[]>([]);
  const [isVisionButton, setIsVisionButton] = useState<boolean>(true);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedCost, setSelectedCost] = useState<number>(0);
  const [selectedExtent, setSelectedExtent] = useState<number>(0);
  const [
    visionFormUpdateCostExtentValue,
    setVisionFormUpdateCostExtentValue,
  ] = useState<boolean>(false);

  const handleButtonCount = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setIsVisionButton(false);
    e.preventDefault();
    const newForm = { id: new Date().getTime() };
    setForms((prevForms) => [...prevForms, newForm]);
  };

  const deleteForm = (id: number) => {
    setForms((prevForms) =>
      prevForms.filter((form) => form.id !== id)
    );
  };

  const handleFormCreate = (
    cost: number,
    extent: number,
    id: number
  ) => {
    setFormData((prevData: any) => {
      const newCost = [...prevData.cost, cost];
      const newExtent = [...prevData.extent, extent];
      deleteForm(id);
      return {
        ...prevData,
        extent: newExtent,
        cost: newCost,
      };
    });
  };

  // const resetStateValues =(setCostValue:any,setExtentValue:any)=>{
  //   setCostValue(0)
  //   setExtentValue(0)
  // }

  const deleteCostExtentElement = (index: number) => {
    setFormData((prevData: any) => {
      const newCost = [...prevData.cost];
      const newExtent = [...prevData.extent];

      newCost.splice(index, 1);
      newExtent.splice(index, 1);

      return {
        ...prevData,
        extent: newExtent,
        cost: newCost,
      };
    });
  };

  const handelSettingCostExtent = (
    index: number,
    cost: number,
    extent: number
  ) => {
    setSelectedIndex(index);
    setSelectedCost(cost);
    setSelectedExtent(extent);

    setVisionFormUpdateCostExtentValue(true);
  };

  return (
    <div>
      {formData &&
        formData.cost.map((itemCost: any, index: number) => (
          <div className={style.pricesBlock} key={index}>
            {index + 1}. Цінник: {itemCost}
            {formData.extent[index] ? (
              <div>
                {" "}
                {formData.extent[index] ? (
                  <span key={index}>
                    Об'єм: {formData.extent[index]}
                  </span>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            <div
              onClick={() =>
                handelSettingCostExtent(
                  index,
                  itemCost,
                  formData.extent[index]
                )
              }
            >
              <svg
                className={style.settingIcon}
                width='25px'
                height='25px'
                version='1.1'
                id='Capa_1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 482.568 482.568'
              >
                <g>
                  <g>
                    <path
                      d='M116.993,203.218c13.4-1.8,26.8,2.8,36.3,12.3l24,24l22.7-22.6l-32.8-32.7c-5.1-5.1-5.1-13.4,0-18.5s13.4-5.1,18.5,0
			l32.8,32.8l22.7-22.6l-24.1-24.1c-9.5-9.5-14.1-23-12.3-36.3c4-30.4-5.7-62.2-29-85.6c-23.8-23.8-56.4-33.4-87.3-28.8
			c-4.9,0.7-6.9,6.8-3.4,10.3l30.9,30.9c14.7,14.7,14.7,38.5,0,53.1l-19,19c-14.7,14.7-38.5,14.7-53.1,0l-31-30.9
			c-3.5-3.5-9.5-1.5-10.3,3.4c-4.6,30.9,5,63.5,28.8,87.3C54.793,197.518,86.593,207.218,116.993,203.218z'
                    />
                    <path
                      d='M309.193,243.918l-22.7,22.6l134.8,134.8c5.1,5.1,5.1,13.4,0,18.5s-13.4,5.1-18.5,0l-134.8-134.8l-22.7,22.6l138.9,138.9
			c17.6,17.6,46.1,17.5,63.7-0.1s17.6-46.1,0.1-63.7L309.193,243.918z'
                    />
                    <path
                      d='M361.293,153.918h59.9l59.9-119.7l-29.9-29.9l-119.8,59.8v59.9l-162.8,162.3l-29.3-29.2l-118,118
			c-24.6,24.6-24.6,64.4,0,89s64.4,24.6,89,0l118-118l-29.9-29.9L361.293,153.918z'
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div onClick={() => deleteCostExtentElement(index)}>
              <svg
                className={style.deleteIcon}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 100 100'
                width='25px'
                height='25px'
              >
                <path d='M 46 13 C 44.35503 13 43 14.35503 43 16 L 43 18 L 32.265625 18 C 30.510922 18 28.879517 18.922811 27.976562 20.427734 L 26.433594 23 L 23 23 C 20.802666 23 19 24.802666 19 27 C 19 29.197334 20.802666 31 23 31 L 24.074219 31 L 27.648438 77.458984 C 27.88773 80.575775 30.504529 83 33.630859 83 L 66.369141 83 C 69.495471 83 72.11227 80.575775 72.351562 77.458984 L 75.925781 31 L 77 31 C 79.197334 31 81 29.197334 81 27 C 81 24.802666 79.197334 23 77 23 L 73.566406 23 L 72.023438 20.427734 C 71.120481 18.922811 69.489078 18 67.734375 18 L 57 18 L 57 16 C 57 14.35503 55.64497 13 54 13 L 46 13 z M 46 15 L 54 15 C 54.56503 15 55 15.43497 55 16 L 55 18 L 45 18 L 45 16 C 45 15.43497 45.43497 15 46 15 z M 32.265625 20 L 43.832031 20 A 1.0001 1.0001 0 0 0 44.158203 20 L 55.832031 20 A 1.0001 1.0001 0 0 0 56.158203 20 L 67.734375 20 C 68.789672 20 69.763595 20.551955 70.306641 21.457031 L 71.833984 24 L 68.5 24 A 0.50005 0.50005 0 1 0 68.5 25 L 73.5 25 L 77 25 C 78.116666 25 79 25.883334 79 27 C 79 28.116666 78.116666 29 77 29 L 23 29 C 21.883334 29 21 28.116666 21 27 C 21 25.883334 21.883334 25 23 25 L 27 25 L 61.5 25 A 0.50005 0.50005 0 1 0 61.5 24 L 28.166016 24 L 29.693359 21.457031 C 30.236405 20.551955 31.210328 20 32.265625 20 z M 64.5 24 A 0.50005 0.50005 0 1 0 64.5 25 L 66.5 25 A 0.50005 0.50005 0 1 0 66.5 24 L 64.5 24 z M 26.078125 31 L 73.921875 31 L 70.357422 77.306641 C 70.196715 79.39985 68.46881 81 66.369141 81 L 33.630859 81 C 31.53119 81 29.803285 79.39985 29.642578 77.306641 L 26.078125 31 z M 38 35 C 36.348906 35 35 36.348906 35 38 L 35 73 C 35 74.651094 36.348906 76 38 76 C 39.651094 76 41 74.651094 41 73 L 41 38 C 41 36.348906 39.651094 35 38 35 z M 50 35 C 48.348906 35 47 36.348906 47 38 L 47 73 C 47 74.651094 48.348906 76 50 76 C 51.651094 76 53 74.651094 53 73 L 53 69.5 A 0.50005 0.50005 0 1 0 52 69.5 L 52 73 C 52 74.110906 51.110906 75 50 75 C 48.889094 75 48 74.110906 48 73 L 48 38 C 48 36.889094 48.889094 36 50 36 C 51.110906 36 52 36.889094 52 38 L 52 63.5 A 0.50005 0.50005 0 1 0 53 63.5 L 53 38 C 53 36.348906 51.651094 35 50 35 z M 62 35 C 60.348906 35 59 36.348906 59 38 L 59 39.5 A 0.50005 0.50005 0 1 0 60 39.5 L 60 38 C 60 36.889094 60.889094 36 62 36 C 63.110906 36 64 36.889094 64 38 L 64 73 C 64 74.110906 63.110906 75 62 75 C 60.889094 75 60 74.110906 60 73 L 60 47.5 A 0.50005 0.50005 0 1 0 59 47.5 L 59 73 C 59 74.651094 60.348906 76 62 76 C 63.651094 76 65 74.651094 65 73 L 65 38 C 65 36.348906 63.651094 35 62 35 z M 38 36 C 39.110906 36 40 36.889094 40 38 L 40 73 C 40 74.110906 39.110906 75 38 75 C 36.889094 75 36 74.110906 36 73 L 36 38 C 36 36.889094 36.889094 36 38 36 z M 59.492188 41.992188 A 0.50005 0.50005 0 0 0 59 42.5 L 59 44.5 A 0.50005 0.50005 0 1 0 60 44.5 L 60 42.5 A 0.50005 0.50005 0 0 0 59.492188 41.992188 z' />
              </svg>
            </div>
          </div>
        ))}
      {visionFormUpdateCostExtentValue && (
        <FormUpdateCostExtentValue
          index={selectedIndex}
          cost={selectedCost}
          extent={selectedExtent}
          setFormData={setFormData}
          setVisionFormUpdateCostExtentValue={
            setVisionFormUpdateCostExtentValue
          }
        />
      )}

      <button
        className={`${style.itemBg} ${
          isVisionButton ? style.visible : ""
        }`}
        onClick={handleButtonCount}
      >
        Додати ціну
      </button>
      {formData.cost.length === 0 ? (
        <div>Поле ціна обовязкове</div>
      ) : (
        ""
      )}
      {forms.map((form) => (
        <FormAddExtent
          key={form.id}
          id={form.id}
          handleFormCreate={handleFormCreate}
          formData={formData}
          setIsVisionButton={setIsVisionButton}
        />
      ))}
    </div>
  );
};

export default AddExtent;
