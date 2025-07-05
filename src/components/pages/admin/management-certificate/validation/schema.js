import * as Yup from "yup";

export const certificateFormSchema = Yup.object().shape({
  user_id: Yup.string().required("Nama tidak boleh kosong"),
  scheme_id: Yup.string().required("Pelatihan tidak boleh kosong"),
  certificate_number: Yup.string().required(
    "Nomor sertifikat tidak boleh kosong",
  ),
  assign_date: Yup.string().required("Tanggal tidak boleh kosong"),
  certificate_file: Yup.mixed()
    .required("Sertifikat harus diunggah")
    .test(
      "fileSize",
      "Ukuran File terlalu besar",
      (value) => value && value.size <= 10 * 1024 * 1024,
    )
    .test(
      "fileType",
      "Format File tidak Didukung",
      (value) => value && ["image/png", "image/jpeg"].includes(value.type),
    ),

  image_file: Yup.mixed()
    .required("Cover Sertifikat harus diunggah")
    .test(
      "fileSize",
      "Ukuran File terlalu besar",
      (value) => value && value.size <= 10 * 1024 * 1024,
    )
    .test(
      "fileType",
      "Format File tidak didukung",
      (value) => value && ["image/png", "image/jpeg"].includes(value.type),
    ),
});
