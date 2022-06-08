import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { register } from "../redux/user/userApi";
import {useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SignUp() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  //Validation schema
  const validate = Yup.object({
    name: Yup.string("Name reqired"),
    surname: Yup.string("Surname required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string()
      .min(4, "Invalid Password")
      .max(16, "Invalid Password")
      .required("Password required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      formik.setValues(formik.initialValues);
      const res = await register(values);
      res && navigate("/login");
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
    <>
      <div className="form-wrapper">
        <h2>Cavalier</h2>
        <form className="form" onSubmit={formik.handleSubmit}>
          <TextField
            error={Object.keys(formik.errors).length > 0}
            id="outlined-error-helper-text-1"
            value={formik.values.name}
            label={t("Name")}
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
            onChange={(e) => setInputValue("name", e.target.value)}
            helperText={formik.errors.name}
          />
          <TextField
            error={Object.keys(formik.errors).length > 0}
            id="outlined-error-helper-text-2"
            value={formik.values.surname}
            label={t("Surname")}
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
            onChange={(e) => setInputValue("surname", e.target.value)}
            helperText={formik.errors.surname}
          />
          <TextField
            error={Object.keys(formik.errors).length > 0}
            id="outlined-error-helper-text-3"
            value={formik.values.email}
            label={t("E-mail Address")}
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
            onChange={(e) => setInputValue("email", e.target.value)}
            helperText={formik.errors.email}
          />

          <TextField
            error={Object.keys(formik.errors).length > 0}
            id="outlined-error-helper-text-4"
            value={formik.values.password}
            label={t("Password")}
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
            onChange={(e) => setInputValue("password", e.target.value)}
            helperText={formik.errors.password}
            type={"password"}
          />

          <Button type="submit" className="cavalier-btn-primary">
            {t("Sign Up")}
          </Button>
        </form>
      </div>
    </>
  );
}
