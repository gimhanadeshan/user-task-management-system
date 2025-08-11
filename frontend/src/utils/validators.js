import * as Yup from "yup";

export const loginSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().min(6, "Too short").required("Required"),
});

export const registerSchema = Yup.object({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
});

export const taskSchema = Yup.object({
  title: Yup.string().required("Required"),
  description: Yup.string(),
  dueDate: Yup.date().required("Required"),
});
