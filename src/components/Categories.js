import { getAllCategories } from "../api/categoryApi";
import { useState, useEffect } from "react";
import { Autoplay } from "swiper";
import { useNavigate } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

const Categories = ({ slidesPerView }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories()
      .then((res) => setCategories(res))
      .catch((e) => console.log(e));
  }, []);

  const handleClick = (category) => {
    navigate("/products/filter/" + category.name);
  };

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 5000 }}
      slidesPerView={slidesPerView}
    >
      {categories?.map((category, idx) => (
        <SwiperSlide
          onClick={() => handleClick(category)}
          key={idx}
          className="flex flex-col items-center gap-y-1 py-8"
        >
          <img
            src={category.image + ".jpeg"}
            alt={idx}
            className="w-12 h-12 md:w-24 md:h-24 rounded-full border border-gray-200 hover:brightness-90 hover:cursor-pointer"
          />
          <h4 className="text-center text-slate-600 text-xs md:text-md">
            {category.name}
          </h4>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Categories;
