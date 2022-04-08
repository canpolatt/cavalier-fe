import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  }

  return (
    <div onClick={()=>handleClick(item._id)} className="shadow-md rounded-lg handle--child-visibility flex flex-col">
      <div className="relative">
        <img
          className="w-full p-2 h-48 object-cover"
          src={item.image}
          alt={item.title}
        />
        <div className="absolute top-0 right-0 p-2 child">
          <LocalGroceryStoreIcon />
        </div>
      </div>
      <div className="p-4 mt-auto">
        <h4 className="text-md md:text-lg">{item.title}</h4>
        <h5 className="text-xs md:text-sm text-slate-400">
          {item.description.length > 20
            ? item.description.slice(0, 20) + "..."
            : item.description}
        </h5>
        <span className="text-xs md:text-sm">₺{item.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
