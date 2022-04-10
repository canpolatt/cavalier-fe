import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { findProduct } from "../api/productDetailApi";
import Loading from "../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../redux/loading/loadingSlice";

const ProductDetail = () => {
  const { product_id } = useParams();
  const [details, setDetails] = useState([]);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading("pending"))
    findProduct(product_id)
      .then((res) => setDetails(res))
      .finally(() => dispatch(setIsLoading("fulfilled")));
  }, [product_id, dispatch]);

  return (
    <>
      {isLoading && console.log(isLoading)}
      {isLoading === "initial" || isLoading === "pending" ? (
        <Loading />
      ) : (
        <div className="z-50 bg-slate-50 flex-1 py-4 flex flex-col items-center justify-center">
          <div className="lg:w-10/12 p-4">
            <div className="bg-slate-200 p-4 flex items-center justify-center">
              <img
                className="object-cover max-w-xs"
                src={details.image}
                alt={details._id}
              />
            </div>
            <div className="py-4 lg:text-xl">
              <h3 className="text-xl border-b-2 lg:text-4xl">
                {details.title}
              </h3>
              <p className="py-2">{details.description}</p>
              <ul className="py-2">
                {details?.size?.map((item, idx) => (
                  <li key={idx}>
                    Ürün Tipi: {item.name} - {item.height} X {item.width} X{" "}
                    {item.depth}
                  </li>
                ))}
              </ul>
              <p className="py-1">{details.brand}</p>
              <p className="py-1">Stok adedi : {details.stock}</p>
              <p className="py-1">{details.inStock && "Stok durumu : var"}</p>
              <ul className="flex items-center py-2">
                <label>Renk Seçenekleri:</label>
                {details?.color?.map((item, idx) => (
                  <li
                    className={`bg-${item}-100 rounded-full border-2 w-8 h-8 ml-2`}
                    key={idx}
                  ></li>
                ))}
              </ul>
              <ul className="flex flex-wrap py-2">
                {details?.categories?.map((item, idx) => (
                  <li
                    className="text-sm border p-1 rounded-xl border-slate-300 mr-2 mb-2"
                    key={idx}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-tl-lg rounded-tr-lg drop-shadow-2xl fixed bottom-0 bg-neutral-800 w-full flex items-center h-14">
            <p className="flex-1 text-center p-2 mx-1 font-bold text-white">
              ₺{details.price}
            </p>
            <button className="rounded-lg flex-[2_2_0%] p-2 mx-1 bg-lime-600 text-white font-bold">
              {" "}
              SEPETE EKLE{" "}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
