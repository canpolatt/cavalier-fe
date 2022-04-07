import { getAllProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";

const Products = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((res) => setData(res))
      .catch((e) => console.log(e));
  }, []);

  return (
      <div className="flex flex-wrap gap-16 p-8">
        {data?.map((item, idx) => (
          <ProductCard key={idx} item={item} />
        ))}
      </div>
  );
};

export default Products;
