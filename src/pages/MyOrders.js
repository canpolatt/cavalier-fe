import { getOrder } from "../api/getOrderApi";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { setIsLoading } from "../redux/loading/loadingSlice";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const MyOrders = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
          <ul className="grid grid-cols-2">
            {data?.map((item, idx) => (
              <li key={idx} className="col-span-1 flex flex-col items-center justify-center border m-4">
                <p>{t("Order No")} : {item._id}</p>
                <p>{t("Order Date")} : {item.createdAt.slice(0,10)}</p>
                <p>{t("Total")}: {item.totalPrice}₺</p>
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
