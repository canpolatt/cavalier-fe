import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { backToInitialState } from "../redux/shoppingCart/shoppingCartSlice";
import postOrder from "../api/orderApi";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const initialValues = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  address: "",
};

export default function Order() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const totalPrice = useSelector((state) => state.cart.total);
  const navigate = useNavigate();
  const validate = Yup.object({
    name: Yup.string().required("Lütfen adınızı giriniz."),
    surname: Yup.string().required("Lütfen soyadınızı giriniz."),
    email: Yup.string()
      .email("Geçersiz eposta")
      .required("Lütfen eposta giriniz."),
    phone: Yup.string()
      .matches(phoneRegExp, "Telefon numarası geçerli değil.")
      .required("Lütfen telefon numaranızı giriniz."),
    address: Yup.string()
      .min(5, "Minimum 5 karakter giriniz.")
      .max(255, "Maksimum 255 karakter geçerlidir.")
      .required("Adresinizi giriniz."),
  });
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validate,
    onSubmit: (values) => {
      formik.setValues(initialValues);
      postOrder("/api/orders", {
        products: products,
        totalPrice: totalPrice,
        address: values,
      })
        .then(
          (res) =>
            res.status === 200 &&
            navigate("success/" + res.data._id, { state: res.status })
        )
        .then(() => dispatch(backToInitialState()));
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const setInputValue = (key, value) => {
    formik.setValues({
      ...formik.values,
      [key]: value,
    });
  };

  useEffect(() => {
    if (products.length === 0) {
      navigate("/404");
    }
  }, [navigate, products.length]);

  return (
    <div className="flex-1">
      <div className="p-8 flex flex-col">
        <h2 className="text-center text-xl mb-8 md:text-2xl lg:text-4xl my-4">
          {t("Your Delivery Information")}
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
            label={t("Name")}
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
            label={t("Surname")}
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
            label={t("Phone")}
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
            label={t("E-mail Address")}
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
            error={formik.errors.address}
            multiline
            variant="outlined"
            rows={4}
            id="outlined-error-helper-text-5"
            label={t("Address")}
            value={formik.values.address}
            onChange={(e) => setInputValue("address", e.target.value)}
            helperText={formik.errors.address}
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
          <p className="text-right">{formik.values.address.length} / 255</p>
          <p className="text-xl font-extrabold p-2">₺{totalPrice}.00</p>
          <button
            type="submit"
            className="rounded-lg flex-[2_2_0%] p-2 mx-1 bg-golden text-white font-bold"
          >
            {" "}
            {t("Complete Order")}{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
