import { getAllCategories } from "../api/categoryApi";
import { useState, useEffect } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then((res) => setCategories(res))
      .catch((e) => console.log(e));
  });

  return (
    <ul className="grid grid-flow-col overflow-x-auto auto-cols-[50%] gap-4 p-4 snap-mandatory snap-x">
      {categories.map((category, idx) => (
        <li
          key={idx}
          className=" bg-slate-600 flex items-center justify-center p-4 snap-center"
        >
          <span>
            <img
              src={category.image + ".jpeg"}
              alt={category._id}
              className="w-24 h-24 rounded-full"
            />
            <h4 className="text-center text-slate-100">{category.name}</h4>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
