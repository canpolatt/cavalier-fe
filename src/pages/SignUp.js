import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { register } from "../redux/user/userApi";

export default function SignUp() {
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
      const res = await register(values);
      console.log(res);
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
        <h2>Cavalier Mobilya</h2>
        <form className="form" onSubmit={formik.handleSubmit}>
          <TextField
            error={Object.keys(formik.errors).length > 0}
            id="outlined-error-helper-text-1"
            value={formik.values.name}
            label="Name"
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
            id="outlined-error-helper-text-1"
            value={formik.values.surname}
            label="Surname"
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
            id="outlined-error-helper-text-1"
            value={formik.values.email}
            label="Email"
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
            id="outlined-error-helper-text-1"
            value={formik.values.password}
            label="Password"
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
            Sign Up
          </Button>
        </form>
      </div>
    </>
  );
}
