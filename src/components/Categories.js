import { getAllCategories } from "../api/categoryApi";
import { useState, useEffect } from "react";
import { Autoplay } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

const Categories = ({slidesPerView}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then((res) => setCategories(res))
      .catch((e) => console.log(e));
  }, []);

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 5000 }}
      slidesPerView={slidesPerView}
    >
      {categories?.map((category, idx) => (
        <SwiperSlide key={idx} className="flex flex-col items-center gap-y-1 py-8">
          <img
            src={category.image + ".jpeg"}
            alt={idx}
            className="w-12 h-12 md:w-24 md:h-24 rounded-full border border-gray-200 hover:brightness-90 hover:cursor-pointer"
          />
          <h4 className="text-center text-slate-600 text-xs md:text-md">{category.name}</h4>
        </SwiperSlide>
      ))}
    </Swiper>
    // <ul className="grid grid-flow-col overflow-x-auto auto-cols-[25%] gap-4 p-4 snap-mandatory snap-x">
    //   {categories.map((category, idx) => (
    //     <li
    //       key={idx}
    //       className=" flex items-center justify-center p-4 snap-center"
    //     >
    //       <span>
    //         <img
    //           src={category.image + ".jpeg"}
    //           alt={category._id}
    //           className="w-24 h-24 rounded-full border border-gray-400 "
    //         />
    //         <h4 className="text-center text-slate-600">{category.name}</h4>
    //       </span>
    //     </li>
    //   ))}
    // </ul>
  );
};

export default Categories;
