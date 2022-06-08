import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { Button, Checkbox, IconButton, InputAdornment } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/SignIn.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { login } from "../redux/user/userApi";

const SignIn = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [toastObj, setToastObj] = useState({
    severity: "success",
    message: "None",
  });
  const vertical = "bottom";
  const horizontal = "center";
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();

  //Validation schema
  const validate = Yup.object({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string()
      .min(4, "Invalid Password")
      .max(16, "Invalid Password")
      .required("Password required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      const response = await dispatch(login(values));
      if (response.payload.status) {
        setToastObj({
          severity: "success",
          message: "Başarıyla giriş yapıldı",
        });
        setOpen(true);
        if (loggedIn) {
          localStorage.setItem(
            "accessToken",
            response.payload.data.accessToken
          );
        }

        navigate("/");
      } else {
        setOpen(true);
        setToastObj({ severity: "error", message: response.payload });
      }
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCheck = () => {
    setLoggedIn(!loggedIn);
  };

  if (auth.isLoggedIn && localStorage.getItem("accessToken")) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="form-wrapper">
        <h2>Cavalier Mobilya</h2>
        <form className="form" onSubmit={formik.handleSubmit}>
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
            id="outlined-error-helper-text-2"
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
            type={showPassword ? "text" : "password"}
            onChange={(e) => setInputValue("password", e.target.value)}
            helperText={formik.errors.password}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    sx={{ color: "#a08862" }}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className="logged-in">
            <Checkbox
              checked={loggedIn}
              onChange={handleCheck}
              sx={{
                color: "#a08862",
                "&.Mui-checked": {
                  color: "#a08862",
                },
              }}
            />
            <p>Remember me</p>
          </div>

          <Button type="submit" className="cavalier-btn-primary">
            Log In
          </Button>
          <div>
            <a className="hover:text-golden hover:underline" href="/register">
              Don't have a account?
            </a>
          </div>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={toastObj.severity}>
          {toastObj.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignIn;
