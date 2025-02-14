import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../store/category/category.thunk";
import { AppDispatch, RootState } from "../store";
import { ICategory } from "../store/category/category.slice";

const CategoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { category, loading, error } = useSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  if (loading)
    return <div className="text-center text-xl mt-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 text-lg mt-10">
        Error: {error}
      </div>
    );
  if (!category.length)
    return (
      <div className="text-center text-gray-500 text-lg mt-10">
        No pets available.
      </div>
    );

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6 bg-gray-100 min-h-screen">
      {category.map((categoryInfo: ICategory) => (
        <div
          key={categoryInfo._uuid}
          className="h-[400px] bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl w-full sm:w-1/2 lg:w-1/3"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Category Name : {categoryInfo.name}
          </h3>
          <p className="text-gray-600 text-sm text-center mb-4">
            <b> Category Description:</b> {categoryInfo.description}
          </p>
        </div>
      ))}{" "}
    </div>
  );
};

export default CategoryPage;
