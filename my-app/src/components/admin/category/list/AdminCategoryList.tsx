import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import { IMAGES_FOLDER_MEDIUM } from "../../../../constants/imgFolderPath";
import DeleteModal from "../../../common/modal/DeleteModal";

const AdminCategoryList = () => {
  const { list } = useTypedSelector((store) => store.category.categoryList);

  const { GetCategoryList, DeleteCategory } = useActions();

  const LoadCategories = async () => {
    try {
      await GetCategoryList();
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  useEffect(() => {
    document.title = "Адмін панель - Магазин";
    LoadCategories();
  }, []);

  const onClickDeleteHandle = (id: number) => {
    try {
      DeleteCategory(id, list);
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto mt-12 px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Категорії
            </h3>
          </div>
          <div className="mt-3 md:mt-0">
            <Link
              to="/admin/category/create"
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Додати категорію
            </Link>
          </div>
        </div>

        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Категорія</th>
                <th className="py-3 px-6">Опис</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {list.map((item, idx) => (
                <tr key={idx}>
                  <td className="lg:flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                    <img
                      alt={item.name + "'s image"}
                      src={IMAGES_FOLDER_MEDIUM + item.image}
                      className="w-48 rounded"
                    />
                    <div>
                      <span className="block text-gray-700 text-sm font-medium">
                        {item.name}
                      </span>
                      <span className="block text-gray-700 text-xs">
                        {"ID: " + item.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.description}
                  </td>
                  <td className="text-right px-6 whitespace-nowrap">
                    <Link
                      to=""
                      className="py-2 px-3 font-medium text-yellow-400 hover:text-yellow-300 duration-150 hover:bg-gray-50 rounded-lg"
                    >
                      Edit
                    </Link>
                    <DeleteModal
                      id={item.id}
                      title="Видалення"
                      text={`Ви дійсно хочете видалити категорію: ${item.name}?`}
                      buttonClassName="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                      deleteFunc={onClickDeleteHandle}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminCategoryList;
