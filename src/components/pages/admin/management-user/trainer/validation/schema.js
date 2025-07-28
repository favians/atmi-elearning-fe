import * as Yup from "yup";

export const trainerFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email tidak boleh kosong"),
  full_name: Yup.string().required("Nama tidak boleh kosong"),
  job: Yup.string().required("Pekerjaan tidak boleh kosong"),
  instance: Yup.string().required("Perusahaan tidak boleh kosong"),
  phone: Yup.string().required("Nomor telepon tidak boleh kosong"),
  about_trainer: Yup.string().required("Tentang trainer tidak boleh kosong"),
});
