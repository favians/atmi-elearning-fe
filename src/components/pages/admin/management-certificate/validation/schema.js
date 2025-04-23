import * as Yup from "yup";

export const certificateFormSchema = Yup.object().shape({
  user_id: Yup.string().required("Nama tidak boleh kosong"),
  scheme_id: Yup.string().required("Pelatihan tidak boleh kosong"),
  certificate_number: Yup.string().required(
    "Nomor sertifikat tidak boleh kosong",
  ),
  assign_date: Yup.string().required("Tanggal tidak boleh kosong"),
  certificate_file: Yup.string().required("File tidak boleh kosong"),
});
