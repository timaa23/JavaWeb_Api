import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
import http from "../../../http_common";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import {
  IMAGES_FOLDER_HIGH,
  IMAGES_FOLDER_MEDIUM,
  IMAGES_FOLDER_VERY_HIGH,
} from "../../../constants/imgFolderPath";
import { ICategoryItem } from "../../category/store/types";
import { useActions } from "../../../hooks/useActions";
import Lightbox from "react-spring-lightbox";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

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

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState(productSize.sizes[2]);
  const { product } = useTypedSelector((store) => store.product);
  const [currentImageIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState<Array<ICategoryItem>>([]);
  const { GetProduct, DeleteProduct } = useActions();

  const navigate = useNavigate();
  const location = useLocation();

  const LoadProduct = async (productId: number) => {
    try {
      //Отримую категорії та записую breadcrumb в state
      const prodResp: any = await GetProduct(productId);

      http.get<Array<ICategoryItem>>(`api/categories`).then((resp) => {
        setBreadcrumb(
          resp.data.filter((item) => item.id === prodResp.categoryId)
        );
      });
    } catch (error) {
      console.error("Щось пішло не так, ", error);
      navigate("not_found");
    }
  };

  useEffect(() => {
    const prodId = qs.parse(location.search, { ignoreQueryPrefix: true });
    var productId = parseInt(prodId.product?.toString() ?? "0");

    LoadProduct(productId);
  }, []);

  const onClickEditHandle = async (id: number) => {
    const idString = qs.stringify({ product: id });
    navigate(`/product/edit?` + idString);
  };

  const onClickDeleteHandle = (id: number) => {
    try {
      DeleteProduct(id);
      navigate("/");
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  const setIsOpenHandle = (id: any) => {
    setIsOpen(true);
    setCurrentIndex(id);
  };

  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < product.images.length &&
    setCurrentIndex(currentImageIndex + 1);

  return (
    <div className={isOpen === true ? "bg-white blur-sm" : "bg-white"}>
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {breadcrumb.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <Link
                    to={
                      "/products?" + qs.stringify({ category: breadcrumb.id })
                    }
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
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
            ))}
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
        <div className="flex justify-center items-center my-6">
          <div className="flex flex-col items-center overflow-auto overscroll-none scroll-pt-1 snap-y max-h-[37.5rem] scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-indigo-300 scrollbar-thumb-rounded-md scrollbar-track-rounded-md">
            {product.images.slice(1).map((image, index) => (
              <div className="snap-start">
                <img
                  key={image.id}
                  src={IMAGES_FOLDER_MEDIUM + image.name}
                  alt={image.name}
                  className="transition duration-200 ease-out h-24 max-w-max rounded-sm my-1.5 mx-2 cursor-pointer border border-black hover:ring-black hover:ring-2 hover:brightness-75"
                  onClick={() => setIsOpenHandle(index + 1)}
                />
              </div>
            ))}
          </div>
          <img
            src={
              product.images.length > 0
                ? IMAGES_FOLDER_HIGH + product.images[0].name
                : ""
            }
            style={{ display: "inline-block" }}
            alt={product.images.length > 0 ? product.images[0].name : ""}
            className="transition duration-200 ease-out max-h-[37.5rem] rounded-lg mx-6 cursor-pointer hover:brightness-95"
            onClick={() => setIsOpenHandle(0)}
          />
        </div>

        <Lightbox
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onPrev={gotoPrevious}
          onNext={gotoNext}
          images={product.images.map((image) => ({
            key: image.id,
            src: IMAGES_FOLDER_VERY_HIGH + image.name,
            alt: image.name,
            className: "rounded-lg",
          }))}
          currentIndex={currentImageIndex}
          singleClickToZoom
          renderPrevButton={() => (
            <>
              {currentImageIndex !== 0 ? (
                <ArrowLeftIcon
                  width={50}
                  onClick={gotoPrevious}
                  className="cursor-pointer z-[100] ml-10 hidden md:block"
                />
              ) : null}
            </>
          )}
          renderNextButton={() => (
            <>
              {currentImageIndex !== product.images.length - 1 ? (
                <ArrowRightIcon
                  width={50}
                  onClick={gotoNext}
                  className="cursor-pointer z-[100] mr-10 hidden md:block"
                />
              ) : null}
            </>
          )}
          renderImageOverlay={() => (
            <>
              <div className="absolute top-3 right-3 bg-gray-400 p-2 rounded-lg opacity-60">
                <p className="font-semibold">
                  {currentImageIndex + 1} / {product.images.length}
                </p>
              </div>
            </>
          )}
        />

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
                Add to bag
              </button>
              <button
                onClick={() => onClickEditHandle(product.id)}
                className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-400 py-3 px-8 text-base font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
              >
                Edit product
              </button>
              <button
                onClick={() => onClickDeleteHandle(product.id)}
                className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 py-3 px-8 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Remove product
              </button>
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
export default ProductPage;
