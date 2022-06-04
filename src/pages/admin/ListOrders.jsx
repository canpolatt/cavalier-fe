import { useEffect, useState } from "react";
import { getOrder } from "../../api/getAllOrders";

const ListOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrder().then((res) => setOrders(res));
  }, []);

  return (
    <div className="flex-1">
      <h2 className="text-center p-4 text-4xl">
        Siparişleriniz Aşağıda Görüntülenmektedir.
      </h2>
      <ul className="p-8">
        <div className="grid grid-cols-2">
          {orders.reverse().map((item, idx) => (
            <div className="col-span-1 border p-4">
              <li className="mb-10">
                <p>Müşteri numarası: {item.userId}</p>
                <p>Siparişte bulunan ürünler: </p>
                <div>
                  {item.products.map((product, idx) => (
                    <div className="border mb-5 p-8">
                      <p>Adet: {product.quantity}</p>
                      <p
                        className="w-5 h-5"
                        style={{ backgroundColor: `${product.color}` }}
                      ></p>
                      <p>Boyut: {product.size}</p>
                      <img className="w-96" src={product.image} alt={idx} />
                      <p>Ürün başlığı: {product.title}</p>
                      <p>Ürün açıklaması: {product.description}</p>
                      <p>Ürün fiyatı: {product.price}$</p>
                      <p>Ürün numarası: {product._id}</p>
                    </div>
                  ))}
                </div>
                <p>Toplam yapılan ödeme: {item.totalPrice}$</p>
                <p>Sipariş tarihi: {item.createdAt}</p>
                <p>Kullanıcı adres bilgileri:</p>

                <div>
                  <p>Kullanıcı adı: {item.address.name}</p>
                  <p>Kullanıcı soy adı: {item.address.surname}</p>
                  <p>Kullanıcı eposta adresi: {item.address.email}</p>
                  <p>Kullanıcı telefon numarası: {item.address.phone}</p>
                  <p>Kullanıcı adresi: {item.address.address}</p>
                </div>
              </li>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default ListOrders;
