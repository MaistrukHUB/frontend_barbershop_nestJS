import React, { useEffect, useState } from "react";
import style from "./ModalUpdateTeammate.module.scss";
import {
  IModalUpdateTeammateProps,
  TeammateType,
} from "../../common/@types/teammate";
import {
  useAdmin,
  useAppDispatch,
  useAxiosConfig,
} from "../../utils/hook";
import * as yup from "yup";
import axios from "axios";
import { fetchTeammates } from "../../redux/slice/team";
import Modal from "react-modal";
import WarningModal from "../warningModal";

interface FormErrors {
  name?: string;
  type?: string;
  dataStart?: string;
  linkReviews?: string;
  linkAppointment?: string;
  img?: string;
  [key: string]: string | undefined;
}

const ModalUpdateTeammate: React.FC<IModalUpdateTeammateProps> = ({
  isModalOpen,
  setIsModalOpen,
  teammate,
}) => {
  const dispatch = useAppDispatch();
  const admin = useAdmin();
  const axiosConfig = useAxiosConfig();

  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string[] | null>(
    null
  );
  const [formData, setFormData] = useState({
    ...teammate,
  });

  const [validationErrors, setValidationErrors] =
    useState<FormErrors>({});

  useEffect(() => {
    setFormData({
      ...teammate,
    });
    setValidationErrors({});
    setServerError(null);
  }, [isModalOpen, teammate]);

  const closeModal = () => {
    setIsModalOpen(false);
    setValidationErrors({});
    setServerError(null);
  };

  const handleValidation = async () => {
    try {
      const teammateSchema = yup.object().shape({
        name: yup.string().required("Поле Ім'я є обов'язковим"),
        type: yup
          .string()
          .oneOf(
            Object.values(TeammateType),
            "Оберіть  градацію барбера"
          )
          .required("Поле Тип є обов'язковим"),
        dataStart: yup
          .string()
          .required("Поле Дата початку є обов'язковим"),
        linkReviews: yup
          .string()
          .required("Поле Посилання на відгуки є обов'язковим"),
        linkAppointment: yup
          .string()
          .required("Поле Посилання на запис є обов'язковим"),
        img: yup.string().required("Поле Img є обов'язковим"),
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
      await handleValidation();

      const response = await axios.patch(
        `http://localhost:6969/team/${teammate.id}`,
        formData,
        axiosConfig
      );
      dispatch(fetchTeammates());
      closeModal();
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
        setServerError(error.response.data.message);
      } else {
        setServerError(["Сталася невідома помилка."]);
      }
    }
  };

  return (
    <div className={style.root}>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel='Додати новий продукт'
        className={style.modal}
        overlayClassName={style.overlay}
      >
        <form>
          <label>
            Ім'я:
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
            Градація барбера:
            <select
              name='type'
              value={formData.type || `${teammate.type}`}
              onChange={handleChange}
            >
              <option disabled value='Обери' key='Обери'>
                Обери
              </option>
              {Object.values(TeammateType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {validationErrors.type && (
              <div className={style.warningText}>
                {validationErrors.type}
              </div>
            )}
          </label>
          <label>
            Дата початку:
            <input
              type='text'
              name='dataStart'
              value={formData.dataStart}
              onChange={handleChange}
            />
            {validationErrors.dataStart && (
              <div className={style.warningText}>
                {validationErrors.dataStart}
              </div>
            )}
          </label>

          <label>
            Посилання на відгуки:
            <input
              type='text'
              name='linkReviews'
              value={formData.linkReviews}
              onChange={handleChange}
            />
            {validationErrors.linkReviews && (
              <div className={style.warningText}>
                {validationErrors.linkReviews}
              </div>
            )}
          </label>

          <label>
            Посилання на запис:
            <input
              type='text'
              name='linkAppointment'
              value={formData.linkAppointment}
              onChange={handleChange}
            />
            {validationErrors.linkAppointment && (
              <div className={style.warningText}>
                {validationErrors.linkAppointment}
              </div>
            )}
          </label>

          <label>
            Зображення (Img):
            <input
              type='text'
              name='img'
              value={formData.img}
              onChange={handleChange}
            />
            {validationErrors.img && (
              <div className={style.warningText}>
                {validationErrors.img}
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
    </div>
  );
};

export default ModalUpdateTeammate;
