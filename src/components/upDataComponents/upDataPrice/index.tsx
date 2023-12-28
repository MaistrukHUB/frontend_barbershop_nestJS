import React, { useState } from "react";
import style from "./UpDataPrice.module.scss";
import {
  useAdmin,
  useAppDispatch,
  useAppSelector,
  useAxiosConfig,
} from "../../../utils/hook";
import Modal from "react-modal";
import axios from "axios";
import * as yup from "yup";
import PriceBlockContainer from "../../priceBlockContainer";
import { fetchPrice } from "../../../redux/slice/price";
import { ModePriceBlock } from "../../priceBlock";
import WarningModal from "../../warningModal";
import {
  Theme,
  toast,
  ToastContainer,
  ToastOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configToast } from "../../../utils/configuration";

interface FormErrors {
  name?: string;
  cost?: string;
  isRange?: string;
}

const UpDataPrice = () => {
  const dispatch = useAppDispatch();

  const admin = useAdmin();
  const axiosConfig = useAxiosConfig();

  const { price } = useAppSelector((state) => state.priceSlice);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    cost: 0,
    isRange: false,
  });

  const [validationErrors, setValidationErrors] =
    useState<FormErrors>({});
  const [serverError, setServerError] = useState<string[] | null>(
    null
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

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
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await handleValidation();
      console.log(formData);
      await axios.post(
        "http://localhost:6969/price/create",
        formData,
        axiosConfig
      );
      toast.success("Додано!", { ...configToast });

      setIsModalOpen(false);
      dispatch(fetchPrice());
      setFormData({
        name: "",
        cost: 0,
        isRange: false,
      });
      // Після успішного запиту очистіть serverError
      setServerError(null);
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.info(`${error.response.data.message}`, {
          ...configToast,
          autoClose: 3000,
        });

        console.log(error.response.data.message);
        setServerError([error.response.data.message]);
      } else {
        toast.info(`${error.response.data.message}`, {
          ...configToast,
          autoClose: 3000,
        });
        setServerError(["Сталася невідома помилка."]);
      }
    }
  };

  return (
    <div className={style.root}>
      {admin ? (
        <div className={style.addPiceButton} onClick={openModal}>
          <span>+</span> <p>Додати послугу</p>
        </div>
      ) : (
        ""
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel='Додати новий продукт'
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
              Додати
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
      <PriceBlockContainer
        price={price}
        mode={ModePriceBlock.UPDATE}
      />
    </div>
  );
};

export default UpDataPrice;
