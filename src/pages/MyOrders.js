import { getOrder } from "../api/getOrderApi";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { setIsLoading } from "../redux/loading/loadingSlice";
import { useSelector, useDispatch } from "react-redux";

const MyOrders = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading("pending"));
    getOrder("")
      .then((res) => setData(res))
      .finally(() => dispatch(setIsLoading("fulfilled")));
  }, [dispatch]);

  return (
    <>
      {(isLoading === "initial" || isLoading === "pending") && <Loading/>}
      {(!data && isLoading) === "fulfilled" ? (
        <div className="flex-1 flex items-center justify-center">
          Görüntülenecek siparişiniz bulunmamaktadır.
        </div>
      ) : (
        <div className="flex-1">
          <ul>
            {data?.map((item, idx) => (
              <li key={idx}>
                <p>Sipariş Numarası:{item._id}</p>
                <p>Sipariş Tarihi:{item.createdAt}</p>
                <p>
                  Sipariş Durumu:
                  {item.status === "pending" && "Sipariş Hazırlanıyor"}
                </p>
                <p>Sipariş Detayı:{item.products.length} ürün hazırlanıyor.</p>
                <p>Toplam:{item.totalPrice}₺</p>
                <hr></hr>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default MyOrders;
