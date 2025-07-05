import * as Yup from "yup";

export const step1Validation = Yup.object().shape({
  image_cover_file: Yup.mixed()
    .required("File harus diunggah")
    .test(
      "fileSize",
      "Ukuran File melebihi 1MB",
      (value) => value && value.size <= 1 * 1024 * 1024,
    )
    .test(
      "fileType",
      "Format File tidak Didukung",
      (value) => value && ["image/png", "image/jpeg"].includes(value.type),
    ),
  title: Yup.string()
    .required("Nama pelatihan tidak boleh kosong")
    .min(3, "Nama pelatihan minimal 3 karakter")
    .max(50, "Nama pelatihan maksimal 50 karakter"),
  topic_id: Yup.string().required("Kelompok pelatihan tidak boleh kosong"),

  price: Yup.number()
    .required("Harga tidak boleh kosong")
    .typeError("Harga harus berupa angka")
    .min(0, "Harga tidak boleh negatif")
    .max(100000000, "Harga tidak boleh lebih dari 100 juta"),
  trainer_id: Yup.string().required("Trainer tidak boleh kosong"),
  rundown_file: Yup.mixed()
    .required("File harus diunggah")
    .test(
      "fileSize",
      "Ukuran File melebihi 10MB",
      (value) => value && value.size <= 10 * 1024 * 1024,
    )
    .test(
      "fileType",
      "Format File tidak Didukung",
      (value) => value && ["application/pdf"].includes(value.type),
    ),
});

export const step2Validation = Yup.object().shape({
  rundown_file: Yup.mixed()
    .required("File harus diunggah")
    .test(
      "fileSize",
      "Ukuran File melebihi 10MB",
      (value) => value && value.size <= 10 * 1024 * 1024,
    )
    .test(
      "fileType",
      "Format File tidak Didukung",
      (value) => value && ["application/pdf"].includes(value.type),
    ),
});

export const getValidationSchemaByStep = (step) => {
  switch (step) {
    case 1:
      return step1Validation;
    case 2:
      return step2Validation;
    default:
      return step1Validation; // fallback
  }
};
