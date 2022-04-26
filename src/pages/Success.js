import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getOrder } from "../api/getOrderApi";
import Loading from "../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../redux/loading/loadingSlice";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order_id } = useParams();
  const [orderDetails, setOrderDetails] = useState();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading("pending"));
    if (location.state !== 200) {
      navigate("/");
    } else {
      getOrder("/"+order_id)
        .then((res) => setOrderDetails(res))
        .finally(() => dispatch(setIsLoading("fulfilled")));
    }
  }, [location.state, navigate, order_id,dispatch]);
  return (
    <>
      {isLoading === "initial" || isLoading === "pending" ? (
        <Loading />
      ) : (
        <div className="flex-1 p-8 flex flex-col items-center gap-y-16">
          <h2 className="text-3xl text-center">SİPARİŞİNİZ TAMAMLANDI</h2>
          <ul>
            {orderDetails?.map((item) => {
              return (
                <li
                  className="flex flex-col items-center justify-center"
                  key={item._id}
                >
                  <label className="text-2xl p-2 text-golden">
                    Sipariş Numaranız:
                  </label>
                  <span className="text-xl">{item._id}</span>
                  <label className="text-2xl p-2 text-golden">
                    Sipariş Oluşturulma Tarihi:
                  </label>
                  <span className="text-xl">{item.createdAt.slice(0, 10)}</span>
                  <label className="text-2xl p-2 text-golden">Ürünler:</label>
                  <ul className="text-xl flex flex-col">
                    {item.products.map((product) => (
                      <li key={product._id}>
                        {product.color} -- {product.title} x {product.quantity}
                      </li>
                    ))}
                  </ul>
                  <label className="text-2xl p-2 text-golden">
                    Sipariş Durumu:
                  </label>
                  <span className="text-xl">
                    {item.status === "pending" && "Sipariş Hazırlanıyor"}
                  </span>
                  <label className="text-2xl p-2 text-golden">
                    Toplam Tutar:{" "}
                  </label>
                  <span className="text-xl">₺{item.totalPrice}.00</span>
                </li>
              );
            })}
          </ul>
          <button
            onClick={() => navigate("/")}
            className="rounded-lg p-4 mx-1 bg-golden text-white font-bold"
          >
            ALIŞVERİŞE DEVAM ET
          </button>
        </div>
      )}
    </>
  );
};

export default Success;
