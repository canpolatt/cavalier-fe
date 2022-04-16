import { useNavigate } from "react-router-dom";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ImageModal from "../components/ImageModal";
import { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/shoppingCart/shoppingCartSlice";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { colors } from "../utils/colors";
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
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const handleOpen = () => {
    setColor("");
    setSize("");
    setOpen(true);
  };

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  const handleColor = (item) => {
    setColor(item);
  };

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  const addToCart = () => {
    const obj = new ProductObj(color, size, 1, item._id, item.price, item.image, item.description, item.title);
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
          <span className="flex flex-col gap-y-2">
            <ul className="flex items-center py-2">
              <label>Renk Seçenekleri:</label>
              {item?.color?.map((item, idx) => (
                <li
                  className={`${
                    colors[item]
                  } rounded-full  w-8 h-8 ml-2 hover:cursor-pointer ${
                    color === item ? "border-2 border-slate-600" : ""
                  }`}
                  key={idx}
                  onClick={() => handleColor(item)}
                ></li>
              ))}
            </ul>
          </span>

          <span className="flex flex-col gap-y-2">
            <h1>Boyutlar</h1>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className="w-full"
              value={size}
              onChange={handleChange}
            >
              {item?.size?.map((item, idx) => (
                <MenuItem
                  value={item.height + " x " + item.width + " " + item.depth}
                  id={idx}
                  key={idx}
                >
                  {item.height + " x " + item.width + " " + item.depth}
                </MenuItem>
              ))}
            </Select>
          </span>
          <button
            className="mt-4 w-full rounded-lg flex-[2_2_0%] p-2 mx-1 bg-lime-600 text-white font-bold"
            onClick={() => addToCart()}
          >
            Sepete ekle
          </button>
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
