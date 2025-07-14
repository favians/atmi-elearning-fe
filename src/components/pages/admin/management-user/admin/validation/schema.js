import * as Yup from "yup";

export const adminFormSchema = Yup.object().shape({
  full_name: Yup.string().required("Nama tidak boleh kosong"),
  phone: Yup.string().required("Nomor telepon tidak boleh kosong"),
  label: Yup.string().required("Label tidak boleh kosong"),
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email tidak boleh kosong"),
  password: Yup.string().required("Password tidak boleh kosong"),
});

export const updateFormSchema = Yup.object().shape({
  full_name: Yup.string().required("Nama tidak boleh kosong"),
  phone: Yup.string().required("Nomor telepon tidak boleh kosong"),
  label: Yup.string().required("Label tidak boleh kosong"),
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email tidak boleh kosong"),
});
