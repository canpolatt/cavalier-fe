import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.products);
  const total = useSelector((state) => state.cart.total);
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className="flex-1 flex flex-col lg:flex-row ">
      <ul className="p-2 lg:p-8 flex-1">
        {cartItems?.map((item, idx) => {
          return (
            <li
              key={idx}
              className="flex p-4 border lg:items-center justify-between"
            >
              <div className="flex">
                <div className="p-2">
                  <img
                    className="object-cover w-24 h-24 lg:w-32 lg:h-32 rounded-full"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-sm lg:text-md mb-4">{item.title}</h3>
                  <p className="text-xs lg:text-sm">{item.description.slice(0, 20) + "..."}</p>
                </div>
              </div>
                <div className="flex p-2 w-1/4 mt-auto lg:mt-0">
                  <button className="flex-1 border">{item.quantity === 0 ? <DeleteIcon color="warning" /> : "-"}</button>
                  <p className="flex-1 flex items-center justify-center">{item.quantity}</p>
                  <button className="flex-1 border">+</button>
                </div>
            </li>
          );
        })}
      </ul>
      <div className="flex-1 p-8"></div>
      <div className="rounded-tl-lg rounded-tr-lg drop-shadow-2xl fixed bottom-0 bg-neutral-800 w-full flex items-center h-14">
            <p className="flex-1 text-center p-2 mx-1 font-bold text-white">
            {"₺"+total+".00 / "+quantity+" adet ürün"}
            </p>
            <button className="rounded-lg flex-[2_2_0%] p-2 mx-1 bg-lime-600 text-white font-bold">
              {" "}
              ALIŞVERİŞİ TAMAMLA{" "}
            </button>
          </div>
    </div>
  );
};

export default Cart;