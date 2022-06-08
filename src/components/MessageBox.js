import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import postMessage from "../api/messageApi";
import { useTranslation } from "react-i18next";
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

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validate,
    onSubmit: (values) => {
      formik.setValues(initialValues);
      postMessage("/api/messagebox", values);
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
      <h2 className="text-center text-xl mb-8 md:text-2xl lg:text-4xl my-4">
        {t("Contact")}
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className="p-8 flex flex-col gap-4 border"
      >
        <TextField
          InputProps={{ style: { fontSize: "80%" } }}
          InputLabelProps={{ style: { fontSize: "80%" } }}
          error={formik.errors.name}
          id="outlined-error-helper-text-1"
          value={formik.values.name}
          label={`${t("Name")}`}
          onChange={(e) => setInputValue("name", e.target.value)}
          helperText={formik.errors.name}
          sx={{
            "& label.Mui-focused": {
              color: "#a08862",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#a08862",
            },
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#a08862",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#a08862",
              },
            },
          }}
        />
        <TextField
          InputProps={{ style: { fontSize: "80%" } }}
          InputLabelProps={{ style: { fontSize: "80%" } }}
          error={formik.errors.surname}
          id="outlined-error-helper-text-2"
          value={formik.values.surname}
          label={`${t("Surname")}`}
          onChange={(e) => setInputValue("surname", e.target.value)}
          helperText={formik.errors.surname}
          sx={{
            "& label.Mui-focused": {
              color: "#a08862",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#a08862",
            },
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#a08862",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#a08862",
              },
            },
          }}
        />
        <TextField
          InputProps={{ style: { fontSize: "80%" } }}
          InputLabelProps={{ style: { fontSize: "80%" } }}
          error={formik.errors.phone}
          id="outlined-error-helper-text-3"
          value={formik.values.phone}
          label={`${t("Phone")}`}
          onChange={(e) => setInputValue("phone", e.target.value)}
          helperText={formik.errors.phone}
          sx={{
            "& label.Mui-focused": {
              color: "#a08862",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#a08862",
            },
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#a08862",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#a08862",
              },
            },
          }}
        />
        <TextField
          InputProps={{ style: { fontSize: "80%" } }}
          InputLabelProps={{ style: { fontSize: "80%" } }}
          error={formik.errors.email}
          id="outlined-error-helper-text-4"
          value={formik.values.email}
          label={`${t("E-mail Address")}`}
          onChange={(e) => setInputValue("email", e.target.value)}
          helperText={formik.errors.email}
          sx={{
            "& label.Mui-focused": {
              color: "#a08862",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#a08862",
            },
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#a08862",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#a08862",
              },
            },
          }}
        />
        <TextField
          InputProps={{ style: { fontSize: "80%" } }}
          InputLabelProps={{ style: { fontSize: "80%" } }}
          error={formik.errors.message}
          multiline
          variant="outlined"
          rows={4}
          id="outlined-error-helper-text-5"
          label={`${t("Message")}`}
          value={formik.values.message}
          onChange={(e) => setInputValue("message", e.target.value)}
          helperText={formik.errors.message}
          inputProps={{ maxLength: 255 }}
          sx={{
            "& label.Mui-focused": {
              color: "#a08862",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#a08862",
            },
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#a08862",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#a08862",
              },
            },
          }}
        ></TextField>
        <p className="text-right">{formik.values.message.length} / 255</p>
        <button
          type="submit"
          className="border mt-4 w-full md:w-1/4 p-4 bg-golden text-white"
        >
          {t("Send")}
        </button>
      </form>
    </div>
  );
};

export default MessageBox;
