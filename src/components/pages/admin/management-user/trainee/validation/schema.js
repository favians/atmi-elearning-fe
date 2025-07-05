import * as Yup from "yup";

export const traineeFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email tidak boleh kosong"),
  password: Yup.string().required("Password tidak boleh kosong"),
  full_name: Yup.string().required("Nama tidak boleh kosong"),
  instance: Yup.string().required("Perusahaan tidak boleh kosong"),
  phone: Yup.string().required("Nomor telepon tidak boleh kosong"),
  address: Yup.string().required("Alamat tidak boleh kosong"),
  training_id: Yup.string().required("Pelatihan tidak boleh kosong"),
});

export const editTraineeFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email tidak boleh kosong"),
  full_name: Yup.string().required("Nama tidak boleh kosong"),
  instance: Yup.string().required("Perusahaan tidak boleh kosong"),
  phone: Yup.string().required("Nomor telepon tidak boleh kosong"),
  address: Yup.string().required("Alamat tidak boleh kosong"),
  training_id: Yup.string().required("Pelatihan tidak boleh kosong"),
});
