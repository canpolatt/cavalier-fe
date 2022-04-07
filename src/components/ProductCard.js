import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

const ProductCard = ({item}) => {
  return (
    <div className="w-48 shadow-md rounded-lg handle--child-visibility flex  flex-col">
      <div className="relative">
        <img
          className="w-full p-2 h-48 object-cover"
          src={item.image}
        />
        <div className="absolute top-0 right-0 p-2 child">
          <LocalGroceryStoreIcon />
        </div>
      </div>
      <div className="p-4 mt-auto">
        <h4 className="text-lg">{item.title}</h4>
        <h5 className="text-sm text-slate-400">{item.description}</h5>
        <span className="text-sm">₺{item.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
