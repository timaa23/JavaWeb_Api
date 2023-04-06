import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IMAGES_FOLDER_HIGH } from "../../../constants/imgFolderPath";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const CategoryList = () => {
  const { list, loading } = useTypedSelector(
    (store) => store.category.categoryList
  );

  const [reload, setReload] = useState(false);

  const { GetCategoryList } = useActions();

  const LoadCategories = async () => {
    try {
      await GetCategoryList();
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  useEffect(() => {
    document.title = "Магазин";
    LoadCategories();
  }, [reload]);

  const whileLoading = () => {
    const elements = [];
    for (var i = 0; i < 5; i++) {
      elements.push(
        <div className="w-full" key={i}>
          <div className="w-full h-64 mt-8 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

          <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
          <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
        </div>
      );
    }
    return (
      <div className="animate-pulse">
        <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          {elements}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-4 sm:py-8 lg:max-w-none lg:py-16 ">
            <div className="flex items-center relative ">
              <h2 className="text-2xl font-bold text-gray-900">Категорії</h2>
              <ArrowPathRoundedSquareIcon
                className="w-6 h-6 ml-4 hover:cursor-pointer absolute right-0"
                onClick={() => setReload(!reload)}
              >
                Reload
              </ArrowPathRoundedSquareIcon>
            </div>
            {loading ? (
              whileLoading()
            ) : (
              <>
                {list.length !== 0 ? (
                  <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                    {list
                      .sort((a, b) => (a.id < b.id ? 1 : -1))
                      .map((callout) => (
                        <div key={callout.id} className="group relative">
                          <Link to={"/products/list/" + callout.id}>
                            <div className="transition duration-200 ease-out relative h-80 mt-8 w-full overflow-hidden rounded-lg bg-white cursor-pointer hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                              <div className="picture-main">
                                <img
                                  src={IMAGES_FOLDER_HIGH + callout.image}
                                  alt={callout.name}
                                  className="picture-container h-full object-cover object-center"
                                />
                              </div>
                            </div>
                          </Link>
                          <h3 className="mt-2 text-sm text-gray-500">
                            <p>{callout.name}</p>
                          </h3>
                          <p className="text-base font-semibold text-gray-900">
                            {callout.description}
                          </p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <h3 className="text-4xl tracking-tight text-gray-900 py-64 text-center">
                    Категорій не знайдено
                  </h3>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
