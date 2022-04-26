import { getAllProducts } from "../api/productApi";
import { getFilteredProducts } from "../api/filteredProductApi";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import Categories from "../components/Categories";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../redux/loading/loadingSlice";
import Loading from "../components/Loading";
import {useNavigate, useParams} from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const {category} = useParams();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate("/products")
  }

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
          <div className="p-4 lg:flex lg:px-24 items-center justify-between">
            <input
              type="text"
              placeholder="search.."
              className="border p-2 mb-2 w-full lg:w-1/4"
            />
            <div className="flex items-center justify-center gap-2">
            <button onClick={handleClick}>Tüm ürünler</button>
              <LoadingButton loading variant="outlined" className="flex-1">
                Submit
              </LoadingButton>
              <LoadingButton loading variant="outlined" className="flex-1">
                Submit
              </LoadingButton>
            </div>
          </div>
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
