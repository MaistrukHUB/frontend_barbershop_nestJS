import Modal from "react-modal";
import { PriceItem } from "../../common/@types/price";
import style from "./ModalUpdatePrice.module.scss";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import {
  useAdmin,
  useAppDispatch,
  useAxiosConfig,
} from "../../utils/hook";
import price, { fetchPrice } from "../../redux/slice/price";
import axios from "axios";
import WarningModal from "../warningModal";

interface IModalUpdatePrice {
  isModalOpen: boolean;
  setIsModalOpen: any;
  priceItem: PriceItem;
}
interface FormErrors {
  name?: string;
  cost?: string;
  isRange?: string;
}

const ModalUpdatePrice: React.FC<IModalUpdatePrice> = ({
  isModalOpen,
  setIsModalOpen,
  priceItem,
}) => {
  const dispatch = useAppDispatch();

  const admin = useAdmin();
  const axiosConfig = useAxiosConfig();

  const [formData, setFormData] = useState({
    name: "",
    cost: 0,
    isRange: false,
  });
  const [serverError, setServerError] = useState<string[] | null>(
    null
  );

  useEffect(() => {
    setFormData({
      ...priceItem,
    });
    setValidationErrors({});
    setServerError(null);
  }, []);

  const [validationErrors, setValidationErrors] =
    useState<FormErrors>({});

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      cost: 0,
      isRange: false,
    });
    setValidationErrors({});
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? parseFloat(e.target.value)
          : type === "text"
          ? e.target.value
          : !!e.target.value,
    }));
  };

  const handleValidation = async () => {
    try {
      const priceSchema = yup.object().shape({
        name: yup.string().required("Поле Ім'я є обов'язковим"),
        cost: yup
          .number()
          .required("Поле Вартість є обов'язковим")
          .min(1, "Вартість повинна бути більше 0"),
        isRange: yup
          .boolean()
          .required("Поле isRange є обов'язковим"),
      });
      await priceSchema.validate(formData, { abortEarly: false });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: FormErrors = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path as keyof FormErrors] =
              err.message;
          }
        });
        setValidationErrors(validationErrors);
      } else {
        console.error("Помилка при валідації:", error);
        setServerError(["Сталася невідома помилка"]);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await handleValidation();
      console.log(formData);
      await axios.patch(
        `http://localhost:6969/price/${priceItem.id}`,
        formData,
        axiosConfig
      );

      setIsModalOpen(false);
      dispatch(fetchPrice());
      setFormData({
        name: "",
        cost: 0,
        isRange: false,
      });
      setServerError(null);
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
        setServerError([error.response.data.message]);
      } else {
        setServerError(["Сталася невідома помилка."]);
      }
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel='Оновити продукт'
      className={style.modal}
      overlayClassName={style.overlay}
    >
      <form>
        <label>
          Назва:
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder={`${priceItem.name}`}
          />
          {validationErrors.name && (
            <div className={style.warningText}>
              {validationErrors.name}
            </div>
          )}
        </label>
        <label>
          Вартість:
          <input
            type='number'
            name='cost'
            value={formData.cost}
            onChange={handleChange}
            placeholder={`${priceItem.cost}`}
          />
          {validationErrors.cost && (
            <div className={style.warningText}>
              {validationErrors.cost}
            </div>
          )}
        </label>
        <label className={style.checkbox}>
          <input
            type='checkbox'
            name='isRange'
            checked={formData.isRange}
            onChange={handleChange}
            className={style.checkboxInput}
            id='isRange' // додайте id для зв'язку з label
          />

          <span className={style.checkboxLabelText}>
            Це діапазон ?
          </span>
          <span className={style.checkboxLabel}>{""}</span>

          {validationErrors.isRange && (
            <div className={style.warningText}>
              {validationErrors.isRange}
            </div>
          )}
        </label>
        <WarningModal serverError={serverError} />

        <div className={style.buttons}>
          <button
            className={style.itemBg}
            type='button'
            onClick={handleSubmit}
          >
            Оновити дані
          </button>
          <button
            className={style.itemBor}
            type='button'
            onClick={closeModal}
          >
            Закрити
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalUpdatePrice;
