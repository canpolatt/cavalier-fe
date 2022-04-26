import { getOrder } from "../api/getOrderApi";
import { useEffect, useState } from "react";

const MyOrders = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getOrder("").then((res) => setData(res));
  }, []);

  return (
    <>
      {console.log(data)}
      {!data ? (
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
