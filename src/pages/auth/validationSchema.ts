// validationSchema.ts
import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email є обов'язковим полем")
    .email("Введіть правильний email"),
  password: yup.string().required("Пароль є обов'язковим полем"),
});

export const registrationSchema = yup.object().shape({
  name: yup.string().required("Ім'я є обов'язковим полем"),
  phone: yup
    .number()
    .required("Телефон є обов'язковим полем")
    .positive("Телефон повинен бути позитивним числом"),
  email: yup
    .string()
    .required("Email є обов'язковим полем")
    .email("Введіть правильний email"),
  password: yup.string().required("Пароль є обов'язковим полем"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Паролі повинні співпадати")
    .required("Повторення пароля є обов'язковим полем"),
});
