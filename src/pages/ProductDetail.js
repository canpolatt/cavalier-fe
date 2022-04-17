import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { findProduct } from "../api/productDetailApi";
import Loading from "../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../redux/loading/loadingSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { addCart } from "../redux/shoppingCart/shoppingCartSlice";
import { ProductObj } from "../utils/productObj";
import {useNavigate} from "react-router-dom";

const ProductDetail = () => {
  const { product_id } = useParams();
  const [details, setDetails] = useState([]);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Validation schema
  const validate = Yup.object({
    size: Yup.string().required("Size required"),
    color: Yup.string().required("Color required"),
  });

  const formik = useFormik({
    initialValues: {
      size: "",
      color: "",
    },
    validationSchema: validate,
    onSubmit: () => {
      addToCart();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  //Set formik values
  const setInputValue = (key, value) => {
    formik.setValues({
      ...formik.values,
      [key]: value,
    });
  };

  const addToCart = () => {
    const obj = new ProductObj(
      formik.values.color,
      formik.values.size,
      1,
      details._id,
      details.price,
      details.image,
      details.description,
      details.title
    );
    dispatch(addCart({ ...obj }));
  };

  useEffect(() => {
    dispatch(setIsLoading("pending"));
    findProduct(product_id)
      .then((res) => setDetails(res))
      .finally(() => dispatch(setIsLoading("fulfilled")));
  }, [product_id, dispatch]);

  useEffect(() => {
    if(details.status === 500)
    navigate("/404")
  },[navigate,details.status])

  return (
    <>
      {isLoading === "initial" || isLoading === "pending" ? (
        <Loading />
      ) : (
        <div className="flex-1 bg-slate-50">
        <form onSubmit={formik.handleSubmit}>
          <div className="z-50 bg-slate-50 flex-1 py-4 flex flex-col items-center justify-center">
            <div className="lg:w-10/12 p-4">
              <div className="bg-slate-200 p-2 flex items-center justify-center">
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
                <span className="flex gap-x-2 items-center">
                  <h1>Ürün tipi: </h1>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    className="h-10"
                    value={formik.values.size}
                    onChange={(e) => setInputValue("size", e.target.value)}
                  >
                    {details?.size?.map((item, idx) => (
                      <MenuItem
                        value={
                          item.name +
                          " - " +
                          item.height +
                          " x " +
                          item.width +
                          " " +
                          item.depth
                        }
                        id={idx}
                        key={idx}
                      >
                        {item.name +
                          " - " +
                          item.height +
                          " x " +
                          item.width +
                          " " +
                          item.depth}
                      </MenuItem>
                    ))}
                  </Select>
                  <small className="text-red-400 font-semibold">
                    {formik.errors.size}
                  </small>
                </span>
                <p className="py-1">Marka : {details.brand}</p>
                <p className="py-1">Stok adedi : {details.stock}</p>
                <p className="py-1">{details.inStock && "Stok durumu : var"}</p>
                <ul className="flex items-center py-2">
                  <label>Renk Seçenekleri:</label>
                  {details?.color?.map((item, idx) => (
                    <li
                      className={`rounded-full  w-8 h-8 ml-2 hover:cursor-pointer ${
                        formik.values.color === item
                          ? "border-2 border-slate-600"
                          : ""
                      }`}
                      key={idx}
                      value={item}
                      style={{ backgroundColor: `${item}` }}
                      onClick={() => setInputValue("color", item)}
                    ></li>
                  ))}
                  <small className="ml-2 text-red-400 font-semibold">
                    {formik.errors.color}
                  </small>
                </ul>
                <ul className="flex flex-wrap py-4">
                  {details?.categories?.map((item, idx) => (
                    <li
                      onClick={()=>navigate("/products/filter/"+item)}
                      className="text-sm border p-1 rounded-xl border-slate-300 mr-2 mb-2 hover:cursor-pointer"
                      key={idx}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rounded-tl-lg rounded-tr-lg drop-shadow-2xl fixed bottom-0 bg-jet w-full flex items-center h-14">
              <p className="flex-1 text-center p-2 mx-1 font-bold text-white">
                ₺{details.price}
              </p>
              <button
                type="submit"
                className="rounded-lg flex-[2_2_0%] p-2 mx-1 bg-golden text-white font-bold"
              >
                {" "}
                SEPETE EKLE{" "}
              </button>
            </div>
          </div>
        </form>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
