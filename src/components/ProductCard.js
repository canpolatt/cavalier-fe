import { useNavigate } from "react-router-dom";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ImageModal from "../components/ImageModal";
import { useState } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from "react-redux";
import {addCart} from "../redux/shoppingCart/shoppingCartSlice";

let initialImageModalVisibility = false;

const ProductCard = ({ item }) => {
  const [isImageModal, setIsImageModal] = useState(initialImageModalVisibility);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  const addToCart = () => {
    setQuantity((prev)=>prev+1);
    dispatch(addCart({...item, quantity,color:"default"}))
  }

  return (
    <div className="md:max-w-xs lg:w-96 shadow-md rounded-lg handle--child-visibility flex flex-col cursor-pointer">
      <div className="relative border-b p-2">
        <img
          onClick={() => handleClick(item._id)}
          className="w-full p-2 h-48 object-cover"
          src={item.image}
          alt={item.title}
        />
        <div className="absolute top-0 right-0 p-2 flex items-center justify-center flex-col gap-2">
          <div onClick={()=>addToCart()} className="rounded-full border bg-white hover:bg-slate-200 shadow p-2">
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
  );
};

export default ProductCard;
