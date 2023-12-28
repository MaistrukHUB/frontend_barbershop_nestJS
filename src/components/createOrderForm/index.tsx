import React, { useEffect, useState } from "react";
import style from "./CreateOrder.module.scss";
import Modal from "react-modal";
import { ICreateOrderFormProps } from "../../common/@types/order";
import {
  useAppDispatch,
  useAppSelector,
  useAxiosConfig,
} from "../../utils/hook";
import * as yup from "yup";
import WarningModal from "../warningModal";
import axios from "axios";
import ConfirmModal from "../confirmModal";
import { clearCart } from "../../redux/slice/cart";
import { IFormDataByOrder } from "../../common/@types/cart";
import {
  Theme,
  toast,
  ToastContainer,
  ToastOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configToast } from "../../utils/configuration";
import {
  handelSandOrder,
  createListByOrder,
  createNewOrder,
} from "../../utils/telegram";

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

const CreateOrderForm: React.FC<ICreateOrderFormProps> = ({
  isModalOpen,
  setIsModalOpen,
  productsCart,
}) => {
  const dispatch = useAppDispatch();
  const axiosConfig = useAxiosConfig();

  const { isLogged, user, token } = useAppSelector(
    (state) => state.authSlice
  );
  const { totalPrice } = useAppSelector((state) => state.cartSlice);

  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string[] | null>(
    null
  );
  const [validationErrors, setValidationErrors] =
    useState<FormErrors>({});

  const [formData, setFormData] = useState<IFormDataByOrder>({
    name: "",
    phone: 0,
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        phone: user.phone,
        email: user.email,
      });
    }
    setValidationErrors({});
    setServerError(null);
  }, [isModalOpen, productsCart, user]);

  const closeModal = () => {
    setIsModalOpen(false);
    setValidationErrors({});
    setServerError(null);
  };

  const handleValidation = async () => {
    try {
      const teammateSchema = yup.object().shape({
        name: yup.string().required("Поле Ім'я є обов'язковим"),
        phone: yup.number().required("Поле телефон є обов'язковим"),
        email: yup.string().required("Поле email є обов'язковим"),
      });
      await teammateSchema.validate(formData, { abortEarly: false });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: FormErrors = {};
        error.inner.forEach((err: yup.ValidationError) => {
          if (err.path) {
            validationErrors[err.path as keyof FormErrors] =
              err.message;
          }
        });
        setValidationErrors(validationErrors);
      } else {
        console.error("Помилка при відправці запиту:", error);
        setServerError(["Сталася невідома помилка"]);
      }
    }
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      createNewOrder(productsCart, formData, totalPrice);
      await handleValidation();
      toast.success("Виконано!", { ...configToast });
      dispatch(clearCart());
      closeModal();
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
        toast.info("Вітаємо!", { ...configToast });
        setServerError([error.response.data.message]);
      } else {
        toast.info("Вітаємо!", { ...configToast });
        setServerError(["Сталася невідома помилка."]);
      }
    }
  };

  const onConfirm = async () => {
    try {
      createListByOrder(productsCart);
      handelSandOrder(formData, totalPrice);
      const response = await axios.post(
        `http://localhost:6969/cart/create`,
        productsCart,
        axiosConfig
      );
      toast.success("Виконано!", { ...configToast });
      dispatch(clearCart());
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

  const onDeny = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.root}>
      {isLogged ? (
        <>
          {isModalOpen ? (
            <ConfirmModal
              message={`Підтвердження замовлення`}
              confirmButtonText={"Підтвердити"}
              denyButtonText={"Скасувати"}
              onConfirm={onConfirm}
              onDeny={onDeny}
              setShowConfirm={setIsModalOpen}
            />
          ) : (
            ""
          )}
        </>
      ) : (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel='Створити замовлення'
          className={style.modal}
          overlayClassName={style.overlay}
        >
          <form>
            <label>
              Ваше ім'я:
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
              Номер телефону:
              <input
                type='number'
                name='phone'
                value={`${formData.phone}`}
                onChange={handleChange}
              />
              {validationErrors.phone && (
                <div className={style.warningText}>
                  {validationErrors.phone}
                </div>
              )}
            </label>
            <label>
              Email:
              <input
                type='text'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
              {validationErrors.email && (
                <div className={style.warningText}>
                  {validationErrors.email}
                </div>
              )}
            </label>
          </form>
          <div className={style.buttons}>
            <button
              className={style.itemBg}
              type='button'
              onClick={handleSubmit}
            >
              Замовити
            </button>
            <button
              className={style.itemBor}
              type='button'
              onClick={closeModal}
            >
              Скасувати
            </button>
          </div>
          <WarningModal serverError={serverError} />
        </Modal>
      )}
    </div>
  );
};

export default CreateOrderForm;
