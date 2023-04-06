import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import ImageSlider from "../../../common/imageSlider/ImageSlider";
import DeleteModal from "../../../common/modal/DeleteModal";

const productSize = {
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
};
const reviews = { href: "#", average: 4, totalCount: 117 };

const AdminProductPage = () => {
  const { product } = useTypedSelector((store) => store.product.product);
  const { list } = useTypedSelector((store) => store.product.productList);
  const { category } = useTypedSelector((store) => store.category.category);

  const { id } = useParams();

  const { GetProduct, DeleteProduct, GetCategory } = useActions();

  const [selectedSize, setSelectedSize] = useState(productSize.sizes[2]);

  const navigate = useNavigate();
  const location = useLocation();

  const LoadProduct = async (productId: number) => {
    try {
      const prodResp: any = await GetProduct(productId);
      await GetCategory(prodResp.categoryId);
      document.title = prodResp.name + " - Магазин";
    } catch (error) {
      console.error("Щось пішло не так, ", error);
      navigate("not_found");
    }
  };

  useEffect(() => {
    var productId = parseInt(id?.toString() ?? "0");

    LoadProduct(productId);
  }, []);

  const onClickEditHandle = (id: number) => {
    navigate("/admin/products/edit/" + id);
  };

  const onClickDeleteHandle = async (id: number) => {
    try {
      await DeleteProduct(id, list);
      await navigate("/");
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <Link
                  to={"/admin/products/list/"}
                  className="mr-2 text-sm font-medium text-gray-900"
                >
                  {category.name}
                </Link>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li className="text-sm">
              <Link
                to={location.search}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </Link>
            </li>
          </ol>
        </nav>

        {/* Image slider  */}
        <ImageSlider images={product.images} />

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>
          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Інформація про продукт</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ${product.price}
            </p>
            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={
                        reviews.average > rating
                          ? "text-gray-900 h-5 w-5 flex-shrink-0"
                          : "text-gray-200 h-5 w-5 flex-shrink-0"
                      }
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>
            <form className="mt-10">
              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                </div>

                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    {" "}
                    Choose a size{" "}
                  </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {productSize.sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active }) =>
                          (size.inStock
                            ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                            : "cursor-not-allowed bg-gray-50 text-gray-200") +
                          (active ? "ring-2 ring-indigo-500" : "") +
                          "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">
                              {size.name}
                            </RadioGroup.Label>
                            {size.inStock ? (
                              <span
                                className={
                                  (active ? "border" : "border-2") +
                                  (checked
                                    ? "border-indigo-500"
                                    : "border-transparent") +
                                  "pointer-events-none absolute -inset-px rounded-md"
                                }
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line
                                    x1={0}
                                    y1={100}
                                    x2={100}
                                    y2={0}
                                    vectorEffect="non-scaling-stroke"
                                  />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Додати в корзину
              </button>
              <button
                onClick={() => onClickEditHandle(product.id)}
                className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-400 py-3 px-8 text-base font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
              >
                Редагувати
              </button>
              <DeleteModal
                id={product.id}
                text="Видалення"
                title={`Ви дійсно хочете видалити продукт: ${product.name}?`}
                buttonClassName="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 py-3 px-8 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                deleteFunc={onClickDeleteHandle}
              />
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Опис</h3>
              <div
                className="space-y-6"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminProductPage;
