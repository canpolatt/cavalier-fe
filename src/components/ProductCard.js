import { useNavigate } from "react-router-dom";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ImageModal from "../components/ImageModal";
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

let initialImageModalVisibility = false;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0",
  boxShadow: 24,
  p: 4,
};

const ProductCard = ({ item }) => {
  const [isImageModal, setIsImageModal] = useState(initialImageModalVisibility);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleOpen = () => {
    formik.setValues({
      size: "",
      color: "",
    });
    setOpen(true);
  };

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
                <label>Renk Seçenekleri:</label>
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
              <h1>Boyutlar</h1>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="w-full"
                value={formik.values.size}
                onChange={(e) => setInputValue("size", e.target.value)}
              >
                {item?.size?.map((item, idx) => (
                  <MenuItem
                    value={
                      item.name +
                      " - " +
                      item.height +
                      " x " +
                      item.width +
                      " " +
                      item.depth
                    }
                    id={idx}
                    key={idx}
                  >
                    {item.name +
                      " - " +
                      item.height +
                      " x " +
                      item.width +
                      " " +
                      item.depth}
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
              Sepete ekle
            </button>
          </form>
        </Box>
      </Modal>
      <div className="md:max-w-xs lg:w-96 shadow-md rounded-lg handle--child-visibility flex flex-col cursor-pointer">
        <div className="relative border-b p-2">
          <img
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
