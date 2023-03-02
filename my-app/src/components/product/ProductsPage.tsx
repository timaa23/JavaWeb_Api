import qs from "qs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import http from "../../http_common";
import { ProductActionTypes } from "./store/types";

const ProductsPage = () => {
  const location = useLocation();
  const { list } = useTypedSelector((store) => store.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const catId = qs.parse(location.search, { ignoreQueryPrefix: true });

    console.log(catId.categoryId);
    http.get(`/api/products/byCategory/${catId.categoryId}`).then((resp) => {
      dispatch({ type: ProductActionTypes.PRODUCT_LIST, payload: resp.data });
    });
  }, []);

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
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    // testImage
                    src="https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png"
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.name}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
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
export default ProductsPage;
