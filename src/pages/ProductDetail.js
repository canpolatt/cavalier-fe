import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetail = () => {
  const { product_id } = useParams();
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    (async () => {
      await axios
        .get(process.env.REACT_APP_BASE_URL + "/api/products/find/" + product_id)
        .then((res) => res.data)
        .then((res) => setDetail(res))
    })();
  }, [product_id]);

  return <div>{JSON.stringify(detail)}</div>;
};

export default ProductDetail;
