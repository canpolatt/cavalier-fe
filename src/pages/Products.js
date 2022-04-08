import { getAllProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import Categories from "../components/Categories";
import LoadingButton from "@mui/lab/LoadingButton";

const Products = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((res) => setData(res))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Categories slidesPerView={5} />
      <div className="p-4">
        <input type="text" placeholder="search.." className="border p-2 mb-2 w-full" />
        <div className="flex items-center justify-center gap-2">
          <LoadingButton loading variant="outlined" className="flex-1">
            Submit
          </LoadingButton>
          <LoadingButton loading variant="outlined" className="flex-1">
            Submit
          </LoadingButton>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(123px,_1fr))] md:grid-cols-[repeat(auto-fit,minmax(320px,_1fr))] p-4 md:p-8 md:px-24 gap-2 md:gap-8">
        {data?.map((item, idx) => (
          <ProductCard key={idx} item={item} />
        ))}
      </div>
    </>
  );
};

export default Products;
