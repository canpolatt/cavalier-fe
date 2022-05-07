import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as Yup from "yup";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useState } from "react";

const Input = styled("input")({
  display: "none",
});

export default function ProductAdd() {
  const [productDetail, setProductDetail] = useState({
    categories: [],
    categoriesValue: "",
    size: [],
    sizeValue: "",
    color: [],
    colorValue: "",
  });

  //Set array values of formik
  const handleChange = (val, key) => {
    const payload = { ...productDetail };
    payload[key].push(val);
    setProductDetail(payload);
    formik.setValues({ ...formik.values, [key]: payload[key] });
  };

  //Set input values of state
  const handleValue = (state, val) => {
    const payload = { ...productDetail };
    payload[state] = val;
    setProductDetail(payload);
  };

  //Remove item from state
  const removeItem = (val, key) => {
    let payload = { ...productDetail };
    payload[key] = payload[key].filter((item) => item !== val);
    setProductDetail(payload);
    formik.setValues({ ...formik.values, [key]: payload[key] });
  };

  ////-------------------------- FORMIK -----------------------------------------------

  const validate = Yup.object({
    title: Yup.string().required("Title required"),
    description: Yup.string().required("Description required"),
    image: Yup.string().required("Image required"),
    categories: Yup.array().required("Categories required").nullable(),
    size: Yup.array().required("Size required").nullable(),
    color: Yup.array().required("Color required").nullable(),
    price: Yup.number()
      .positive("Price must be positive")
      .required("Price required"),
    stock: Yup.number()
      .positive("Stock must be positive")
      .required("Stock required"),
    inStock: Yup.bool().required("In Stock required"),
    brand: Yup.string().required("Brand required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
      categories: [],
      size: [],
      color: [],
      price: 0,
      stock: 0,
      inStock: false,
      brand: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      console.log(values);
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

  ////-------------------------- FORMIK -----------------------------------------------

  return (
    <div className="flex-1">
      <form
        className=" p-8 items-center justify-center h-full flex flex-col"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex gap-x-20">
          <div className="flex flex-col gap-y-4">
            <TextField
              error={Object.keys(formik.errors).length > 0}
              id="outlined-error-helper-text-1"
              value={formik.values.title}
              label="Title"
              onChange={(e) => setInputValue("title", e.target.value)}
              helperText={formik.errors.title}
            />
            <TextField
              error={Object.keys(formik.errors).length > 0}
              id="outlined-error-helper-text-1"
              value={formik.values.description}
              label="Description"
              onChange={(e) => setInputValue("description", e.target.value)}
              helperText={formik.errors.description}
            />

            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                value={formik.values.image}
                multiple
                type="file"
                onChange={(e) => setInputValue("image", e.target.value)}
              />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>

            <div className="flex items-center gap-x-4">
              <TextField
                error={Object.keys(formik.errors).length > 0}
                id="outlined-error-helper-text-1"
                value={productDetail.categoriesValue}
                label="Categories"
                onChange={(e) => handleValue("categoriesValue", e.target.value)}
                helperText={formik.errors.categories}
              />
              <Button
                variant="contained"
                onClick={() =>
                  handleChange(productDetail.categoriesValue, "categories")
                }
              >
                Add Categories
              </Button>
            </div>
            <ul>
              {productDetail.categories.map((item, idx) => (
                <li key={idx} className="flex">
                  <span>{item}</span>
                  <RemoveCircleIcon
                    className="text-red-400 hover:cursor-pointer"
                    onClick={() => removeItem(item, "categories")}
                  />
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-x-4">
              <TextField
                error={Object.keys(formik.errors).length > 0}
                id="outlined-error-helper-text-1"
                value={productDetail.sizeValue}
                label="Size"
                onChange={(e) => handleValue("sizeValue", e.target.value)}
                helperText={formik.errors.size}
              />
              <Button
                variant="contained"
                onClick={() => handleChange(productDetail.sizeValue, "size")}
              >
                Add Size
              </Button>
            </div>
            <ul>
              {productDetail.size.map((item, idx) => (
                <li key={idx} className="flex">
                  <span>{item}</span>
                  <RemoveCircleIcon
                    className="text-red-400 hover:cursor-pointer"
                    onClick={() => removeItem(item, "size")}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-4">
              <TextField
                error={Object.keys(formik.errors).length > 0}
                id="outlined-error-helper-text-1"
                value={productDetail.colorValue}
                label="Color"
                onChange={(e) => handleValue("colorValue", e.target.value)}
                helperText={formik.errors.color}
              />
              <Button
                variant="contained"
                onClick={() => handleChange(productDetail.colorValue, "color")}
              >
                Add Colors
              </Button>
            </div>
            <ul>
              {productDetail.color.map((item, idx) => (
                <li key={idx} className="flex">
                  <span>{item}</span>
                  <RemoveCircleIcon
                    className="text-red-400 hover:cursor-pointer"
                    onClick={() => removeItem(item, "color")}
                  />
                </li>
              ))}
            </ul>
            <TextField
              error={Object.keys(formik.errors).length > 0}
              id="outlined-error-helper-text-1"
              value={formik.values.price}
              label="Price"
              onChange={(e) => setInputValue("price", e.target.value)}
              helperText={formik.errors.price}
            />

            <TextField
              error={Object.keys(formik.errors).length > 0}
              id="outlined-error-helper-text-1"
              value={formik.values.stock}
              label="Stock"
              onChange={(e) => setInputValue("stock", e.target.value)}
              helperText={formik.errors.stock}
            />

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.inStock}
              label="In Stock"
              onChange={(e) => setInputValue("inStock", e.target.value)}
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>

            <TextField
              error={Object.keys(formik.errors).length > 0}
              id="outlined-error-helper-text-1"
              value={formik.values.brand}
              label="Brand"
              onChange={(e) => setInputValue("brand", e.target.value)}
              helperText={formik.errors.brand}
            />
          </div>
        </div>
        <Button type="submit" className="cavalier-btn-primary mt-12 w-1/3">
          Add Product
        </Button>
      </form>
    </div>
  );
}
