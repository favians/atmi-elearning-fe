import * as Yup from "yup";

export const questionnaireFormSchema = Yup.object().shape({
  name: Yup.string().required("Nama tidak boleh kosong"),
});
