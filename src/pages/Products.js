import { getAllProducts } from "../api/productApi";
import { getFilteredProducts } from "../api/filteredProductApi";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import Categories from "../components/Categories";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../redux/loading/loadingSlice";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Products = () => {
  const [data, setData] = useState([]);
  const { category } = useParams();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  useEffect(() => {
    dispatch(setIsLoading("pending"));
    if (category?.length > 0 || category !== undefined) {
      getFilteredProducts(category)
        .then((res) => setData(res))
        .finally(() => dispatch(setIsLoading("fulfilled")))
        .catch((e) => console.log(e));
    } else {
      getAllProducts()
        .then((res) => setData(res))
        .finally(() => dispatch(setIsLoading("fulfilled")))
        .catch((e) => console.log(e));
    }
  }, [dispatch, category]);

  return (
    <>
    
      {isLoading === "initial" || isLoading === "pending" ? (
        <Loading />
      ) : (
        <div className="flex-1">
          <Categories slidesPerView={5} />
          <h3 className="p-4 md:p-12 md:px-28 lg:text-3xl md: text-xl">{category ?? t("All Products")}</h3>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(123px,_1fr))] lg:flex lg:flex-wrap p-4 md:p-8 md:px-24 gap-2 md:gap-8">
            {data?.map((item, idx) => (
              <ProductCard key={idx} item={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
