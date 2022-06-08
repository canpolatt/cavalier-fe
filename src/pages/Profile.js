import useAuth from "../hooks/useAuth";
import * as Yup from "yup";
import { useFormik } from "formik";
import updateUser from "../api/updateUserApi";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { setName } from "../redux/user/userSlice";
import { useTranslation } from "react-i18next";

const initialValues = {
  name: "",
  surname: "",
};

const initialPasswordValues = {
  password: "",
  confirmPassword: "",
};

const Profile = () => {
  const user = useAuth();
  const dispatch = useDispatch();
  const isLoggedIn = localStorage.getItem("accessToken");
  const { t } = useTranslation();
  const validate = Yup.object({
    name: Yup.string().required("Lütfen adınızı giriniz."),
    surname: Yup.string().required("Lütfen soyadınızı giriniz."),
  });

  const validatePass = Yup.object({
    password: Yup.string()
      .min(8, "Şifre en az 8 karakter olmalıdır.")
      .required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Şifreler eşlesmiyor")
      .required(),
  });

  const passFormik = useFormik({
    initialValues: initialPasswordValues,
    validationSchema: validatePass,
    onSubmit: (values) => {
      passFormik.setValues(initialPasswordValues);
      updateUser("/api/users", values).then(
        (res) => res.status === 200 && console.log(res)
      );
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const infoFormik = useFormik({
    initialValues: initialValues,
    validationSchema: validate,
    onSubmit: (values) => {
      infoFormik.setValues(initialValues);
      updateUser("/api/users", values).then(
        (res) => res.status === 200 && dispatch(setName(res.data.name))
      );
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const setInputValue = (key, value) => {
    infoFormik.setValues({
      ...infoFormik.values,
      [key]: value,
    });
  };

  const setPassInputValue = (key, value) => {
    passFormik.setValues({
      ...passFormik.values,
      [key]: value,
    });
  };

  return (
    <div className="flex-1 p-8">
      {isLoggedIn ? (
        <div>
          <h2 className=" text-xl lg:text-3xl font-semibold">
            {t("Hello")} {user.name},
          </h2>
          <div className="flex flex-col w-full lg:flex-row">
            <div className="lg:w-1/2 p-4">
              <h3 className="mb-4 lg:mb-8 lg:text-xl">{t("Account Information")}</h3>
              <form
                onSubmit={infoFormik.handleSubmit}
                className="p-8 flex flex-col gap-4 border"
              >
                <TextField
                  InputProps={{ style: { fontSize: "80%" } }}
                  InputLabelProps={{ style: { fontSize: "80%" } }}
                  error={infoFormik.errors.name && infoFormik.touched.name}
                  id="outlined-error-helper-text-1"
                  value={infoFormik.values.name}
                  label={t("Name")}
                  onChange={(e) => setInputValue("name", e.target.value)}
                  helperText={infoFormik.errors.name}
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
                  error={
                    infoFormik.errors.surname && infoFormik.touched.surname
                  }
                  id="outlined-error-helper-text-2"
                  value={infoFormik.values.surname}
                  label={t("Surname")}
                  onChange={(e) => setInputValue("surname", e.target.value)}
                  helperText={infoFormik.errors.surname}
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
                <button
                  type="submit"
                  className="rounded-lg flex-[2_2_0%] p-2 mx-1 bg-golden text-white font-bold"
                >
                  {t("Save")}
                </button>
              </form>
            </div>
            <div className="lg:w-1/2 p-4">
              <h3 className="mb-4 lg:mb-8 lg:text-xl">{t("Password")} {t("Update")}</h3>
              <form
                onSubmit={passFormik.handleSubmit}
                className="p-8 flex flex-col gap-4 border"
              >
                <TextField
                  InputProps={{ style: { fontSize: "80%" } }}
                  InputLabelProps={{ style: { fontSize: "80%" } }}
                  error={
                    passFormik.errors.password && passFormik.touched.password
                  }
                  id="outlined-error-helper-text-3"
                  value={passFormik.values.password}
                  label={`${t("New")} ${t("Password")}`}
                  type="password"
                  onChange={(e) =>
                    setPassInputValue("password", e.target.value)
                  }
                  helperText={passFormik.errors.password}
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
                  error={
                    passFormik.errors.confirmPassword &&
                    passFormik.touched.password
                  }
                  id="outlined-error-helper-text-4"
                  value={passFormik.values.confirmPassword}
                  label={`${t("New")} ${t("Password")} (${t("Again")})`}
                  type="password"
                  onChange={(e) =>
                    setPassInputValue("confirmPassword", e.target.value)
                  }
                  helperText={passFormik.errors.confirmPassword}
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
                <button
                  type="submit"
                  className="rounded-lg flex-[2_2_0%] p-2 mx-1 bg-golden text-white font-bold"
                >
                  {t("Update")}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-3xl">
          Lütfen giriş yapınız.
        </div>
      )}
    </div>
  );
};

export default Profile;
