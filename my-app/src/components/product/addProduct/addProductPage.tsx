import { ChangeEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import http from "../../../http_common";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IProductCreate, ProductActionTypes } from "../store/types";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { CategoryActionTypes, ICategoryItem } from "../../category/store/types";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const modelInitValues: IProductCreate = {
  name: "",
  price: 0,
  description: "",
  images: [],
  categoryId: 0,
};

const productCreateSchema = Yup.object().shape({
  name: Yup.string().required("*Обов'язкове поле"),
  price: Yup.number()
    .typeError("Ціна має бути цифрою")
    .min(1, "Ціна має бути більше 0")
    .required("*Обов'язкове поле"),
  description: Yup.string(),
  images: Yup.mixed(),
  categoryId: Yup.number()
    .typeError("Ціна має бути цифрою")
    .required("*Обов'язкове поле")
    .min(1, "Ціна має бути більше 0"),
});

const AddProductPage = () => {
  const { list } = useTypedSelector((store) => store.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    http.get<Array<ICategoryItem>>("api/categories").then((resp) => {
      dispatch({
        type: CategoryActionTypes.CATEGORY_LIST,
        payload: resp.data,
      });
    });
  }, []);

  const createProduct = async (product: IProductCreate) => {
    try {
      const response = await http
        .post("/api/products", product, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((resp) => {
          dispatch({
            type: ProductActionTypes.PRODUCT_CREATE,
            payaload: resp.data,
          });
          navigate("/");
        });
      console.log(response);
    } catch (error) {
      console.error("Something went wrong, ", error);
    }
  };

  const onSubmitHandler = async (model: IProductCreate) => {
    createProduct(model);
  };

  const onFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFieldValue("images", e.target.files);
    }
  };

  const onHandleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setFieldValue("categoryId", e.target.value);
    }
  };

  const formik = useFormik<IProductCreate>({
    initialValues: modelInitValues,
    validationSchema: productCreateSchema,
    onSubmit: onSubmitHandler,
  });

  const {
    handleSubmit,
    values,
    handleChange,
    setFieldValue,
    errors,
    touched,
    handleBlur,
    isValid,
  } = formik;

  return (
    <div className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Додати продукт
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Ви на сторінці для додавання продукту
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
          {/* Поле "Назва" */}
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Назва
            </label>
            <div className="mt-2.5">
              <input
                onChange={handleChange}
                value={values.name}
                onBlur={handleBlur}
                type="text"
                name="name"
                id="name"
                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
              {touched.name && errors.name ? (
                <div className="my-2 mx-2" style={{ color: "red" }}>
                  {errors.name}
                </div>
              ) : null}
            </div>
          </div>

          {/* Поле "Опис" */}
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Опис
            </label>
            <div className="mt-2.5">
              <textarea
                onChange={handleChange}
                value={values.description}
                onBlur={handleBlur}
                name="description"
                id="description"
                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
              {touched.description && errors.description ? (
                <div className="my-2 mx-2" style={{ color: "red" }}>
                  {errors.name}
                </div>
              ) : null}
            </div>
          </div>

          {/* Поле "Ціна" */}
          <div className="sm:col-span-2">
            <label
              htmlFor="price"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Ціна
            </label>
            <div className="mt-2.5">
              <input
                onChange={handleChange}
                value={values.price}
                onBlur={handleBlur}
                type="number"
                name="price"
                min={0}
                step={0.01}
                id="price"
                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
              {touched.price && errors.price ? (
                <div className="my-2 mx-2" style={{ color: "red" }}>
                  {errors.price}
                </div>
              ) : null}
            </div>
          </div>

          {/* Поле "Категорія" */}
          <div className="sm:col-span-2">
            <label
              htmlFor="categorySelect"
              className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Оберіть категорію
            </label>
            <div className="mt-2.5">
              <select
                onChange={onHandleCategoryChange}
                value={values.categoryId}
                id="categorySelect"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option defaultValue={""} className="font-semibold">
                  Категорія
                </option>
                {list.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {touched.categoryId && errors.categoryId ? (
                <div className="my-2 mx-2" style={{ color: "red" }}>
                  {errors.categoryId}
                </div>
              ) : null}
            </div>
          </div>

          {/* Поле "Фото" */}
          <div className="mb-3 w-96">
            <label
              htmlFor="formFile"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Фото
            </label>
            <input
              className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded-md border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out 
              file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] 
              hover:file:bg-neutral-200 
              focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
              name="file"
              type="file"
              id="formFile"
              accept="image/*"
              onChange={onFileHandler}
              multiple
            />
            {touched.images && errors.images ? (
              <div className="my-2 mx-2" style={{ color: "red" }}>
                {errors.images.toString()}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-10">
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className={classNames(
              !(formik.isValid && formik.dirty)
                ? "rounded-md bg-indigo-400"
                : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
              "block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm"
            )}
          >
            Додати
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddProductPage;
