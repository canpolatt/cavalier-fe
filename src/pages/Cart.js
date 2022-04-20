import { useSelector, useDispatch } from "react-redux";
import {
  addCart,
  removeFromCart,
} from "../redux/shoppingCart/shoppingCartSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.products);
  const total = useSelector((state) => state.cart.total);
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (item, calc) => {
    if (calc === "dec") {
      dispatch(removeFromCart(item));
    }
    if (calc === "inc") {
      dispatch(addCart(item));
    }
  };

  // useEffect(()=>{
  //   if(document.cookie){
  //     dispatch(fillWithCookie(document.cookie))
  //   }
  // },[dispatch])

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          SEPETİNİZDE ÜRÜN BULUNMAMAKTADIR
        </div>
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row ">
          <ul className="p-2 lg:p-8 flex-1 flex gap-y-4 flex-col">
            {cartItems?.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className="flex p-4 border lg:items-center justify-between"
                >
                  <div className="flex">
                    <div className="p-2">
                      <img
                        loading="lazy"
                        className="object-cover w-24 h-24 lg:w-32 lg:h-32 rounded-full"
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                    <div className="p-2 flex flex-col gap-y-3">
                      <h3 className="text-sm lg:text-lg lg:font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-xs lg:text-sm">
                        {item.description.slice(0, 40) + "..."}
                      </p>
                      <div className="flex gap-2">
                        <label className="text-sm">Renk:</label>
                        <div
                          className={`rounded-full w-6 h-6`}
                          style={{ backgroundColor: `${item.color}` }}
                        ></div>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <label className="text-sm">Boyut:</label>
                        <p className="text-xs lg:text-md ">{item.size}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex p-2 w-1/4 mt-auto lg:mt-0">
                    <button
                      onClick={() => handleClick(item, "dec")}
                      className={
                        item.quantity !== 1 ? `border p-2 flex-1` : `flex-1`
                      }
                    >
                      {item.quantity === 1 ? (
                        <DeleteIcon color="warning" />
                      ) : (
                        "-"
                      )}
                    </button>
                    <p className="flex-1 flex items-center justify-center p-2">
                      {item.quantity}
                    </p>
                    <button
                      onClick={() => handleClick(item, "inc")}
                      className="flex-1 border p-1"
                    >
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex-1 p-8"></div>
          <div className="rounded-tl-lg rounded-tr-lg drop-shadow-2xl fixed bottom-0 bg-jet w-full flex items-center h-14">
            <p className="flex-1 text-center p-2 mx-1 font-bold text-white flex flex-col">
              {"₺" + total + ".00"}
              <span>{quantity + " adet ürün"}</span>
            </p>

            <button
              onClick={() => cartItems.length > 0 && navigate("/order")}
              className="rounded-lg flex-[2_2_0%] p-2 mx-1 bg-golden text-white font-bold"
            >
              {" "}
              SEPETİ ONAYLA{" "}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
