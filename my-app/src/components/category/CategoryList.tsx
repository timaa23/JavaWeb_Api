import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { IMAGES_FOLDER } from "../../constants/imgFolderPath";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import http from "../../http_common";
import { ICategoryItem } from "./store/types";

const CategoryList = () => {
  const { list } = useTypedSelector((store) => store.category);
  const dispatch = useDispatch();

  useEffect(() => {
    http.get<Array<ICategoryItem>>("api/categories").then((resp) => {
      dispatch({ type: "CATEGORY_LIST", payload: resp.data });
    });
  }, []);

  return (
    <>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-4 sm:py-8 lg:max-w-none lg:py-16">
            <h2 className="text-2xl font-bold text-gray-900">Категорії</h2>

            <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {list.map((callout) => (
                <div key={callout.id} className="group relative">
                  <div className="relative h-80 mt-8 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                    <img
                      src={IMAGES_FOLDER + callout.image}
                      alt={callout.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-2 text-sm text-gray-500">
                    <a href="#">
                      <span className="absolute inset-0" />
                      {callout.name}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">
                    {callout.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
