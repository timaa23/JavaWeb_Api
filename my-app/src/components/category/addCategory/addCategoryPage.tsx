import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ICategoryCreate } from "../store/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useActions } from "../../../hooks/useActions";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const AddCategoryPage = () => {
  const { CreateCategory } = useActions();
  const navigate = useNavigate();

  const createCategory = async (category: ICategoryCreate) => {
    try {
      await CreateCategory(category);
      await navigate("/");
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  const onSubmitHandler = async (model: ICategoryCreate) => {
    createCategory(model);
  };

  const onFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let file = e.target.files[0];

      const fileType = file["type"];
      const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];

      if (validImageTypes.includes(fileType)) {
        setFieldValue("image", file);
      } else {
        console.error("Підтримуються тільки картинки!");
      }
    }
  };

  //Formik
  const modelInitValues: ICategoryCreate = {
    name: "",
    description: "",
    image: undefined,
  };

  const categoryCreateSchema = Yup.object().shape({
    name: Yup.string().required("*Обов'язкове поле"),
    description: Yup.string().required("*Обов'язкове поле"),
    image: Yup.mixed().required("*Обов'язкове поле"),
  });

  const formik = useFormik<ICategoryCreate>({
    initialValues: modelInitValues,
    validationSchema: categoryCreateSchema,
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
  } = formik;

  return (
    <div className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Додати категорію
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Ви на сторінці для додавання категорії
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
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
          <div className="sm:col-span-2">
            <div className="flex items-center">
              <div>
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                  Фото
                </label>

                <div className="mt-2.5">
                  <label
                    htmlFor="upload"
                    className="cursor-pointer text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    {values.image === undefined ? "Завантажити" : "Змінити"}
                    <input
                      type="file"
                      id="upload"
                      onChange={onFileHandler}
                      onBlur={handleBlur}
                      className="hidden"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                    />
                  </label>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {values.image !== undefined ? (
                    <div className="overflow-hidden relative">
                      <img
                        className="h-48 rounded-md object-cover object-center"
                        src={URL.createObjectURL(values.image)}
                        alt="file"
                      />
                    </div>
                  ) : null}
                </div>
                {touched.image && errors.image ? (
                  <div className="my-2 mx-2" style={{ color: "red" }}>
                    {errors.image.toString()}
                  </div>
                ) : null}
              </div>
            </div>
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
export default AddCategoryPage;
