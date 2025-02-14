import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchAnimalsWithCategories } from "../store/AnimalsWithCategory/animalsWithCategory.thunk";

const AnimalsWithCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { animalsWithCategory, loading, error } = useSelector(
    (state: RootState) => state.animalsWCategory
  );
  console.log(animalsWithCategory);

  useEffect(() => {
    dispatch(fetchAnimalsWithCategories());
  }, [dispatch]);

  return (
    <div className="p-4 h-dvh">
      <h1 className="text-xl font-bold text-center py-20">
        Animals with Category
      </h1>

      {error && <p className="text-red-500">{error}</p>}
      <ul className="mt-4 space-y-2 flex gap-2 justify-center flex-wrap ">
        {animalsWithCategory.map((info) => (
          <li
            key={info._uuid}
            className="border p-2 rounded shadow flex gap-5 w-[25%] justify-center h-[50px] items-center"
          >
            <p>
              <strong>Name:</strong> {info.animal.name}
            </p>

            <p>
              <strong>Category:</strong> {info.category.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimalsWithCategory;
