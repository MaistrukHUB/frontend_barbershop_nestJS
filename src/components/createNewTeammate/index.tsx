import React, { useState } from "react";
import style from "./CreateNewTeammate.module.scss";
import {
  useAdmin,
  useAppDispatch,
  useAxiosConfig,
} from "../../utils/hook";
import {
  ICreateNewTeammateProps,
  TeammateType,
} from "../../common/@types/teammate";
import * as yup from "yup";
import axios from "axios";
import { fetchTeammates } from "../../redux/slice/team";
import Modal from "react-modal";
import WarningModal from "../warningModal";
import {
  Theme,
  toast,
  ToastContainer,
  ToastOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configToast } from "../../utils/configuration";

interface FormErrors {
  name?: string;
  type?:string;
  dataStart?: string;
  linkReviews?: string;
  linkAppointment?: string;
  img?: string;
  [key: string]: string | undefined;
}

const CreateNewTeammate: React.FC<ICreateNewTeammateProps> = () => {
  const dispatch = useAppDispatch();
  const axiosConfig = useAxiosConfig();
  const admin = useAdmin();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string[] | null>(
    null
  );
  const [validationErrors, setValidationErrors] =
    useState<FormErrors>({});

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    dataStart: "",
    linkReviews: "",
    linkAppointment: "",
    img: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      type: "",
      dataStart: "",
      linkReviews: "",
      linkAppointment: "",
      img: "",
    });
    setErrors({});
    setValidationErrors({});
    setServerError(null);
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

  const handleSubmit = async () => {
    try {
      await handleValidation();

      const response = await axios.post(
        "http://localhost:6969/team/create",
        formData,
        axiosConfig
      );
      toast.success("Додано!", { ...configToast });
      const resetFormData = {
        name: "",
        type: "",
        dataStart: "",
        linkReviews: "",
        linkAppointment: "",
        img: "",
      };
      setFormData({ ...resetFormData });
      dispatch(fetchTeammates());
      closeModal();
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
        toast.info(`${error.response.data.message}`, { ...configToast, autoClose: 3000 });
        setServerError(error.response.data.message);
      } else {
        setServerError(["Сталася невідома помилка."]);
        toast.info(`Сталася невідома помилка.`, { ...configToast, autoClose: 3000 });
      }
    }
  };

  return (
  
   
        <div className={style.addTeammate}>
          <div className={style.circle} onClick={openModal}>
            <div className={style.plus}>+</div>
          </div>
          <div className={style.addTeammateText}>
            Додати працівника
          </div>
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
                  value={formData.type || "Обери"}
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
        </div>
      
  );
};

export default CreateNewTeammate;
