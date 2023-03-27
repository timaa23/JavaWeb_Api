import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IMAGES_FOLDER_HIGH } from "../../../constants/imgFolderPath";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import DeleteModal from "../../common/modal/DeleteModal";

const CategoryList = () => {
  const { list } = useTypedSelector((store) => store.category.categoryList);

  const [reload, setReload] = useState(false);

  const { GetCategoryList, DeleteCategory } = useActions();

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

  const onClickDeleteHandle = (id: number) => {
    try {
      DeleteCategory(id, list);
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  return (
    <>
      <div className="bg-gray-100">
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

                      <DeleteModal
                        id={callout.id}
                        title="Видалення"
                        text={`Ви дійсно хочете видалити категорію: ${callout.name}?`}
                        buttonClassName="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 my-2"
                        deleteFunc={onClickDeleteHandle}
                      />
                    </div>
                  ))}
              </div>
            ) : (
              <h3 className="text-4xl tracking-tight text-gray-900 py-64 text-center">
                Категорій не знайдено
              </h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
