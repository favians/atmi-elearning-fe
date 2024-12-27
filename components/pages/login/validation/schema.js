import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username tidak boleh kosong"),
  password: Yup.string().required("Password tidak boleh kosong"),
});
