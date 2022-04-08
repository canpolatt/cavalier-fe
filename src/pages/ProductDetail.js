import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { findProduct } from "../api/productDetailApi";

const ProductDetail = () => {
  const { product_id } = useParams();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    findProduct(product_id).then((res) => setDetails(res));
  }, [product_id]);

  return (
    <div>
      <h3>{details.title}</h3>
      <p>{details.description}</p>
      <img src={details.image} alt={details._id} />
      <ul>
        {details?.categories?.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <ul>

      </ul>
    </div>
  );
};

export default ProductDetail;
