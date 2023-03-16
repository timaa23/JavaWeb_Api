import qs from "qs";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IMAGES_FOLDER_HIGH } from "../../../constants/imgFolderPath";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import http from "../../../http_common";
import { ICategoryItem } from "../../category/store/types";

const ProductListPage = () => {
  const { list } = useTypedSelector((store) => store.productList);
  const [category, setCategory] = useState("");
  const location = useLocation();
  const { GetProductList } = useActions();
  const navigate = useNavigate();

  const LoadProducts = async (categoryId: number) => {
    try {
      //Отримую категорії та записую назву категорії в state
      await GetProductList(categoryId);

      await http.get<Array<ICategoryItem>>(`api/categories`).then((resp) => {
        setCategory(resp.data.filter((item) => item.id === categoryId)[0].name);
      });
    } catch (error) {
      console.error("Щось пішло не так, ", error);
      navigate("not_found");
    }
  };

  useEffect(() => {
    const catId = qs.parse(location.search, { ignoreQueryPrefix: true });
    var categoryId = parseInt(catId.category?.toString() ?? "0");

    LoadProducts(categoryId);
  }, []);

  const onClickhandle = (product_id: number) => {
    const idString = qs.stringify({ product: product_id });
    navigate(`/product?` + idString);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {category}
        </h2>

        {list.length !== 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {list.map((product) => (
              <div key={product.id} className="group relative">
                <div
                  onClick={() => onClickhandle(product.id)}
                  className="transition duration-200 ease-out min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden cursor-pointer rounded-md bg-gray-200 hover:opacity-75 lg:aspect-none lg:h-80"
                >
                  <img
                    src={
                      product.images.length > 0
                        ? IMAGES_FOLDER_HIGH + product.images[0].name
                        : ""
                    }
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={"/" + location.search}>{product.name}</Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Description tmp
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    $ {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3 className="text-4xl tracking-tight text-gray-900 py-64 text-center">
            Продуктів не знайдено
          </h3>
        )}
      </div>
    </div>
  );
};
export default ProductListPage;
