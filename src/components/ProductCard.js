import { useNavigate } from "react-router-dom";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ImageModal from "../components/ImageModal";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/shoppingCart/shoppingCartSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ProductObj } from "../utils/productObj";
import useAuth from "../hooks/useAuth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { updateProduct } from "../api/productApi";
import { deleteProduct } from "../api/productApi";
import { useTranslation } from "react-i18next";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

let initialImageModalVisibility = false;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "0",
  boxShadow: 24,
  p: 4,
};

const ProductCard = ({ item }) => {
  const [productDetail, setProductDetail] = useState({
    categories: item.categories,
    categoriesValue: "",
    size: item.size,
    sizeValue: "",
    color: item.color,
    colorValue: "",
  });
  const { t } = useTranslation();
  const [isImageModal, setIsImageModal] = useState(initialImageModalVisibility);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setOpenUpdate(false);
  };
  const auth = useAuth();

  const handleOpen = () => {
    formik.setValues({
      size: "",
      color: "",
    });
    formik.setErrors({});
    setOpen(true);
  };

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };

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
    formik2.setValues({ ...formik2.values, [key]: payload[key] });
  };

  const handleDeleteProduct = async () => {
    const res = await deleteProduct(item._id);
    window.location.reload();
    console.log(res);
  };

  const validate2 = Yup.object({
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

  const formik2 = useFormik({
    initialValues: {
      title: item.title,
      description: item.description,
      image: item.image,
      categories: item.categories,
      size: item.size,
      color: item.color,
      price: item.price,
      stock: item.stock,
      inStock: item.inStock,
      brand: item.brand,
    },
    validationSchema: validate2,
    onSubmit: async (values) => {
      const res = await updateProduct(values, item._id);
      console.log(res);
      window.location.reload();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  //Validation schema
  const validate = Yup.object({
    size: Yup.string().required("Size required"),
    color: Yup.string().required("Color required"),
  });

  const formik = useFormik({
    initialValues: {
      size: "",
      color: "",
    },
    validationSchema: validate,
    onSubmit: () => {
      addToCart();
      setOpen(false);
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

  const setInputValue2 = (key, value) => {
    formik2.setValues({
      ...formik2.values,
      [key]: value,
    });
  };

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  const addToCart = () => {
    const obj = new ProductObj(
      formik.values.color,
      formik.values.size,
      1,
      item._id,
      item.price,
      item.image,
      item.description,
      item.title
    );
    dispatch(addCart({ ...obj }));
  };

  // TO DO:
  // Özellikleri seçmeden dispatch edilmeyecek

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={"flex flex-col gap-y-4"}
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <span className="flex flex-col gap-y-2">
              <ul className="flex items-center py-2">
                <label>{`${t("Color")} :`}</label>
                {item?.color?.map((item, idx) => (
                  <li
                    className={` rounded-full  w-8 h-8 ml-2 hover:cursor-pointer ${
                      formik.values.color === item
                        ? "border-2 border-slate-600"
                        : ""
                    }`}
                    value={item}
                    style={{ backgroundColor: `${item}` }}
                    key={idx}
                    onClick={() => setInputValue("color", item)}
                  ></li>
                ))}
              </ul>
              <small className=" text-red-400 font-semibold">
                {formik.errors.color}
              </small>
            </span>

            <span className="flex flex-col gap-y-2 mt-4">
              <label>{`${t("Size")} :`}</label>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="w-full"
                value={formik.values.size}
                onChange={(e) => setInputValue("size", e.target.value)}
              >
                {item?.size?.map((item, idx) => (
                  <MenuItem value={item} id={idx} key={idx}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <small className="text-red-400 font-semibold">
                {formik.errors.size}
              </small>
            </span>
            <button
              className="mt-4 w-full rounded-lg flex-[2_2_0%] p-2 mx-1 bg-golden text-white font-bold"
              type="submit"
            >
              {t("Add to Cart")}
            </button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={openUpdate}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={"flex flex-col gap-y-4"}
      >
        <Box sx={style}>
          <form
            className=" p-8 items-center justify-center h-full flex flex-col"
            onSubmit={formik2.handleSubmit}
          >
            <div className="flex gap-x-20">
              <div className="flex flex-col gap-y-4">
                <TextField
                  error={Object.keys(formik2.errors).length > 0}
                  id="outlined-error-helper-text-1"
                  value={formik2.values.title}
                  label="Title"
                  onChange={(e) => setInputValue2("title", e.target.value)}
                  helperText={formik2.errors.title}
                />
                <TextField
                  error={Object.keys(formik2.errors).length > 0}
                  id="outlined-error-helper-text-1"
                  value={formik2.values.description}
                  label="Description"
                  onChange={(e) =>
                    setInputValue2("description", e.target.value)
                  }
                  helperText={formik2.errors.description}
                />

                <TextField
                  error={Object.keys(formik2.errors).length > 0}
                  id="outlined-error-helper-text-1"
                  value={formik2.values.image}
                  label="Image Link"
                  onChange={(e) => setInputValue2("image", e.target.value)}
                  helperText={formik2.errors.image}
                />

                <div className="flex items-center gap-x-4">
                  <TextField
                    error={Object.keys(formik2.errors).length > 0}
                    id="outlined-error-helper-text-1"
                    value={productDetail.categoriesValue}
                    label="Categories"
                    onChange={(e) =>
                      handleValue("categoriesValue", e.target.value)
                    }
                    helperText={formik2.errors.categories}
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
                    error={Object.keys(formik2.errors).length > 0}
                    id="outlined-error-helper-text-1"
                    value={productDetail.sizeValue}
                    label="Size"
                    onChange={(e) => handleValue("sizeValue", e.target.value)}
                    helperText={formik2.errors.size}
                  />
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleChange(productDetail.sizeValue, "size")
                    }
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
                    error={Object.keys(formik2.errors).length > 0}
                    id="outlined-error-helper-text-1"
                    value={productDetail.colorValue}
                    label="Color"
                    onChange={(e) => handleValue("colorValue", e.target.value)}
                    helperText={formik2.errors.color}
                  />
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleChange(productDetail.colorValue, "color")
                    }
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
                  error={Object.keys(formik2.errors).length > 0}
                  id="outlined-error-helper-text-1"
                  value={formik2.values.price}
                  label="Price"
                  onChange={(e) =>
                    setInputValue2("price", Number(e.target.value))
                  }
                  helperText={formik2.errors.price}
                />

                <TextField
                  error={Object.keys(formik2.errors).length > 0}
                  id="outlined-error-helper-text-1"
                  value={formik2.values.stock}
                  label="Stock"
                  onChange={(e) =>
                    setInputValue2("stock", Number(e.target.value))
                  }
                  helperText={formik2.errors.stock}
                />

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik2.values.inStock}
                  label="In Stock"
                  onChange={(e) => setInputValue2("inStock", e.target.value)}
                >
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>

                <TextField
                  error={Object.keys(formik2.errors).length > 0}
                  id="outlined-error-helper-text-1"
                  value={formik2.values.brand}
                  label="Brand"
                  onChange={(e) => setInputValue2("brand", e.target.value)}
                  helperText={formik2.errors.brand}
                />
              </div>
            </div>
            <Button type="submit" className="cavalier-btn-primary mt-12 w-1/3">
              Update Product
            </Button>
          </form>
        </Box>
      </Modal>
      <div className="md:max-w-xs lg:w-96 shadow-md rounded-lg handle--child-visibility flex flex-col cursor-pointer">
        <div className="relative border-b p-2">
          <img
            loading="lazy"
            onClick={() => handleClick(item._id)}
            className="w-full p-2 h-48 object-cover"
            src={item.image}
            alt={item.title}
          />
          <div className="absolute top-0 right-0 p-2 flex items-center justify-center flex-col gap-2">
            <div
              onClick={handleOpen}
              className="rounded-full border bg-white hover:bg-slate-200 shadow p-2"
            >
              <AddShoppingCartIcon />
            </div>
            <div
              onClick={() => setIsImageModal(!initialImageModalVisibility)}
              className="rounded-full border bg-white hover:bg-slate-200 shadow p-2"
            >
              <ZoomInIcon />
            </div>

            {auth.isAdmin && (
              <>
                <div
                  onClick={handleOpenUpdate}
                  className="rounded-full border bg-white hover:bg-slate-200 shadow p-1 "
                >
                  <ChangeCircleIcon style={{ fill: "green" }} />
                </div>

                <div
                  onClick={handleDeleteProduct}
                  className="rounded-full border bg-white hover:bg-slate-200 shadow p-1"
                >
                  <DeleteIcon style={{ fill: "red" }} />
                </div>
              </>
            )}
          </div>
        </div>
        <div onClick={() => handleClick(item._id)} className="p-4 mt-auto">
          <h4 className="text-md md:text-lg">{item.title}</h4>
          <h5 className="text-xs md:text-sm text-slate-400">
            {item.description.length > 20
              ? item.description.slice(0, 20) + "..."
              : item.description}
          </h5>
          <span className="text-xs md:text-sm">₺{item.price}</span>
        </div>
        {isImageModal && (
          <ImageModal
            src={item.image}
            imageModalVisibility={isImageModal}
            setImageModalVisibility={setIsImageModal}
          />
        )}
      </div>
    </>
  );
};

export default ProductCard;
