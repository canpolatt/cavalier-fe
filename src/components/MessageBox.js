import postMessage from "../components/MessageBox";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const initialValues = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  message: "",
};

const MessageBox = () => {
  const validate = Yup.object({
    name: Yup.string().required("Lütfen adınızı giriniz."),
    surname: Yup.string().required("Lütfen soyadınızı giriniz."),
    email: Yup.string()
      .email("Geçersiz eposta")
      .required("Lütfen eposta giriniz."),
    phone: Yup.string()
      .matches(phoneRegExp, "Telefon numarası geçerli değil.")
      .required("Lütfen telefon numaranızı giriniz."),
    message: Yup.string()
      .min(5, "Minimum 5 karakter giriniz.")
      .max(255, "Maksimum 255 karakter geçerlidir.")
      .required("Mesajınızı giriniz."),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validate,
    onSubmit: (values) => {
      formik.setValues(initialValues);
      console.log(values)
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  //Set formik values
  const setInputValue = (key, value) => {
    formik.setValues({
      ...formik.values,
      [key]: value,
    });
  };
  return (
    <div className="p-8 flex flex-col">
      <p className="text-center text-3xl">Biz Size Ulaşalım</p>
      <form onSubmit={formik.handleSubmit} className="p-8 flex flex-col gap-4">
        <TextField
          error={formik.errors.name}
          id="outlined-error-helper-text-1"
          value={formik.values.name}
          label="Ad"
          onChange={(e) => setInputValue("name", e.target.value)}
          helperText={formik.errors.name}
        />
        <TextField
          error={formik.errors.surname}
          id="outlined-error-helper-text-2"
          value={formik.values.surname}
          label="Soyad"
          onChange={(e) => setInputValue("surname", e.target.value)}
          helperText={formik.errors.surname}
        />
        <TextField
          error={formik.errors.phone}
          id="outlined-error-helper-text-3"
          value={formik.values.phone}
          label="Telefon"
          onChange={(e) => setInputValue("phone", e.target.value)}
          helperText={formik.errors.phone}
        />
        <TextField
          error={formik.errors.email}
          id="outlined-error-helper-text-4"
          value={formik.values.email}
          label="Posta Adresi"
          onChange={(e) => setInputValue("email", e.target.value)}
          helperText={formik.errors.email}
        />
        <TextField
          error={formik.errors.message}
          multiline
          variant="outlined"
          rows={4}
          id="outlined-error-helper-text-5"
          label="Mesaj"
          value={formik.values.message}
          onChange={(e) => setInputValue("message", e.target.value)}
          helperText={formik.errors.message}
          inputProps={{ maxLength: 255 }}
        ></TextField>
        <p className="text-right">{formik.values.message.length} / 255</p>
        <button type="submit" className="border mt-4 w-1/4">
          Gönder
        </button>
      </form>
    </div>
  );
};

export default MessageBox;
