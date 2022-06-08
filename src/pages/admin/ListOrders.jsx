import { useEffect, useState } from "react";
import { getOrder } from "../../api/getAllOrders";

const ListOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrder().then((res) => setOrders(res));
  }, []);

  return (
    <div className="flex-1 ">
      <h2 className="text-center p-4 text-4xl">
        Siparişleriniz Aşağıda Görüntülenmektedir.
      </h2>
      <ul className="p-8">
        <div className="grid grid-cols-2 gap-3">
          {orders?.reverse().map((item, idx) => (
            <div className="col-span-1 border-4 p-4">
              <li className="mb-10">
                <p><strong>Müşteri numarası: </strong>{item.userId}</p>
                <p><strong>Siparişte bulunan ürünler:</strong> </p>
                <div className="grid grid-cols-2">
                  {item.products.map((product, idx) => (
                    <div className="border mb-5 p-8">
                      <p><strong>Adet:</strong> {product.quantity}</p>
                      <p
                        className="w-5 h-5"
                        style={{ backgroundColor: `${product.color}` }}
                      ></p>
                      <p><strong>Boyut:</strong> {product.size}</p>
                      <img className="w-80 h-80 object-contain" src={product.image} alt={idx} />
                      <p><strong>Ürün başlığı:</strong> {product.title}</p>
                      <p><strong>Ürün açıklaması: </strong>{product.description}</p>
                      <p><strong>Ürün fiyatı: </strong>{product.price}$</p>
                      <p><strong>Ürün numarası: </strong>{product._id}</p>
                    </div>
                  ))}
                </div>
                <p><strong>Toplam yapılan ödeme: </strong>{item.totalPrice}$</p>
                <p><strong>Sipariş tarihi: </strong>{item.createdAt}</p>
                <p><strong>Kullanıcı adres bilgileri:</strong></p>

                <div>
                  <p><strong>Kullanıcı adı: </strong>{item.address.name}</p>
                  <p><strong>Kullanıcı soy adı: </strong>{item.address.surname}</p>
                  <p><strong>Kullanıcı eposta adresi: </strong>{item.address.email}</p>
                  <p><strong>Kullanıcı telefon numarası: </strong>{item.address.phone}</p>
                  <p><strong>Kullanıcı adresi: </strong>{item.address.address}</p>
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
