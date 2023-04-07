import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import { IMAGES_FOLDER_MEDIUM } from "../../../../constants/imgFolderPath";
import DeleteModal from "../../../common/modal/DeleteModal";

const AdminCategoryList = () => {
  const [productCategory, setProductCategory] = useState("Всі");
  const { list } = useTypedSelector((store) => store.product.productList);
  const { categoryList } = useTypedSelector((store) => store.category);

  const {
    GetAllProductList,
    GetProductList,
    GetCategoryList,
    GetCategory,
    DeleteProduct,
  } = useActions();

  const navigate = useNavigate();

  const LoadProducts = async () => {
    try {
      //Отримую категорії та записую назву категорії в state
      const resp: any = await GetAllProductList();
      if (resp === "AUTH_ERROR") {
        console.log(resp);
        navigate("/");
        return;
      }

      GetCategoryList();
      document.title = "Адмін панель - Магазин";
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  useEffect(() => {
    LoadProducts();
  }, []);

  const onHandleCategoryChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    try {
      if (e.target.value) {
        if (e.target.value === "all") {
          await GetAllProductList();
          setProductCategory("Всі");
        } else {
          var id = Number.parseInt(e.target.value);
          await GetProductList(id);
          var category: any = await GetCategory(id);
          setProductCategory(category.name);
        }
      }
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  const onClickEditHandle = (id: number) => {
    navigate("/admin/products/edit/" + id);
  };

  const onClickDeleteHandle = async (id: number) => {
    try {
      await DeleteProduct(id, list);
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  const getCategoryNameById = (id: number) => {
    return categoryList.list.find((value) => value.id === id)?.name;
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto mt-12 px-4 md:px-8">
        <div className="grid-cols-6 justify-items-end items-center md:grid">
          <div className="max-w-lg col-start-1 col-span-4 justify-self-start">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Продукти в категорії: {productCategory}
            </h3>
          </div>
          <div className="mt-3 md:mt-0">
            <select
              onChange={onHandleCategoryChange}
              id="categorySelect"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option defaultValue="all" value="all" className="font-semibold">
                Всі категорії
              </option>
              {categoryList.list.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3 md:mt-0">
            <Link
              to="/admin/products/create"
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Додати продукт
            </Link>
          </div>
        </div>

        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Продукт</th>
                <th className="py-3 px-6">Опис</th>
                <th className="py-3 px-6">Категорія</th>
                <th className="py-3 px-6">Ціна</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {list.map((item, idx) => (
                <tr key={idx}>
                  <td className="xl:flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                    <img
                      alt={item.name + "'s image"}
                      src={IMAGES_FOLDER_MEDIUM + item.images[0].name}
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
                    *short description*
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getCategoryNameById(item.categoryId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {"$" + item.price}
                  </td>
                  <td className="text-right px-6 whitespace-nowrap">
                    <Link
                      to={"/admin/products/view/" + item.id}
                      className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                    >
                      Перейти
                    </Link>

                    <button
                      onClick={() => onClickEditHandle(item.id)}
                      className="py-2 px-3 font-medium text-yellow-400 hover:text-yellow-300 duration-150 hover:bg-gray-50 rounded-lg"
                    >
                      Edit
                    </button>

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
