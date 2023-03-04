import qs from "qs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IMAGES_FOLDER_HIGH } from "../../../constants/imgFolderPath";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import http from "../../../http_common";
import {
  IProductImageItem,
  IProductListItem,
  ProductListActionTypes,
} from "./store/types";

const ProductListPage = () => {
  const location = useLocation();
  const { list } = useTypedSelector((store) => store.productList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const catId = qs.parse(location.search, { ignoreQueryPrefix: true });

    //Отримуємо продукти по категорії та додаємо до них головне фото
    const getProductsList = async () => {
      try {
        const response = await http.get(
          `/api/products/byCategory/${catId.categoryId}`
        );
        const products: IProductListItem[] = response.data;

        const promises = products.map(async (product) => {
          const photoResponse = await http.get<IProductImageItem[]>(
            `/api/productImages/byProduct/${product.id}`
          );
          const photos = photoResponse.data;

          return { ...product, image: photos[0]?.name };
        });
        const productsWithPhotos = await Promise.all(promises);

        dispatch({
          type: ProductListActionTypes.PRODUCT_LIST,
          payload: productsWithPhotos,
        });
      } catch (error) {
        console.error(error);
      }
    };
    //

    getProductsList();
  }, []);

  const onClickhandle = (product_id: number) => {
    const testString = qs.stringify({ productId: product_id });
    navigate(`/product?` + testString);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Продукти
        </h2>

        {list.length !== 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {list.map((product) => (
              <div key={product.id} className="group relative">
                <div
                  onClick={() => onClickhandle(product.id)}
                  className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden cursor-pointer rounded-md bg-gray-200 hover:opacity-75 lg:aspect-none lg:h-80"
                >
                  <img
                    src={IMAGES_FOLDER_HIGH + product.image}
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
                      {product.description}
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
