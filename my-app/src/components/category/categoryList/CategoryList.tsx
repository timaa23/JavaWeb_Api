import qs from "qs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IMAGES_FOLDER_HIGH } from "../../../constants/imgFolderPath";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import http from "../../../http_common";
import { CategoryActionTypes, ICategoryItem } from "../store/types";

const CategoryList = () => {
  const { list } = useTypedSelector((store) => store.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    http.get<Array<ICategoryItem>>("api/categories").then((resp) => {
      dispatch({ type: CategoryActionTypes.CATEGORY_LIST, payload: resp.data });
    });
  }, []);

  const onClickDeleteHandle = (category_id: number) => {
    http.delete(`api/categories/${category_id}`).then((resp) => {
      dispatch({
        type: CategoryActionTypes.CATEGORY_DELETE,
        payload: resp.data,
      });
    });
  };

  const onClickhandle = (category_id: number) => {
    const testString = qs.stringify({ categoryId: category_id });
    navigate(`/products?` + testString);
  };

  return (
    <>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-4 sm:py-8 lg:max-w-none lg:py-16">
            <h2 className="text-2xl font-bold text-gray-900">Категорії</h2>

            <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {list
                .sort((a, b) => (a.id < b.id ? 1 : -1))
                .map((callout) => (
                  <div key={callout.id} className="group relative">
                    <div
                      className="relative h-80 mt-8 w-full overflow-hidden rounded-lg bg-white cursor-pointer hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1"
                      onClick={() => onClickhandle(callout.id)}
                    >
                      <img
                        src={IMAGES_FOLDER_HIGH + callout.image}
                        alt={callout.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-2 text-sm text-gray-500">
                      <Link to="/">{callout.name}</Link>
                    </h3>
                    <p className="text-base font-semibold text-gray-900">
                      {callout.description}
                    </p>

                    <button
                      onClick={() => onClickDeleteHandle(callout.id)}
                      type="button"
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 my-2"
                    >
                      Видалити
                    </button>
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
