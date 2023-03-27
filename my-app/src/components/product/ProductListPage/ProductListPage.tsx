import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IMAGES_FOLDER_HIGH } from "../../../constants/imgFolderPath";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const ProductListPage = () => {
  const { list } = useTypedSelector((store) => store.product.productList);
  const { category } = useTypedSelector((store) => store.category.category);

  const { id } = useParams();

  const { GetProductList, GetCategory } = useActions();

  const navigate = useNavigate();

  const LoadProducts = async (categoryId: number) => {
    try {
      //Отримую категорії та записую назву категорії в state
      const resp: any = await GetProductList(categoryId);
      if (resp === "AUTH_ERROR") {
        console.log(resp);
        navigate("/");
        return;
      }

      const catResp: any = await GetCategory(categoryId);
      document.title = catResp.name + " - Магазин";
    } catch (error) {
      console.error("Щось пішло не так, ", error);
      //navigate("not_found");
    }
  };

  useEffect(() => {
    var categoryId = parseInt(id?.toString() ?? "0");
    LoadProducts(categoryId);
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {category.name}
        </h2>

        {list.length !== 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {list.map((product) => (
              <div key={product.id} className="group relative">
                <Link to={"/products/view/" + product.id}>
                  <div className="transition duration-200 ease-out min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden cursor-pointer rounded-md bg-gray-200 hover:opacity-75 lg:aspect-none lg:h-80">
                    <img
                      src={
                        product.images.length > 0
                          ? IMAGES_FOLDER_HIGH + product.images[0].name
                          : ""
                      }
                      alt={product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </Link>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={"/products/view/" + product.id}>
                        {product.name}
                      </Link>
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
