import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IProductEdit, IProductImageItem } from "../store/types";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Editor } from "@tinymce/tinymce-react";
import qs from "qs";
import { IMAGES_FOLDER_MEDIUM } from "../../../constants/imgFolderPath";
import { useActions } from "../../../hooks/useActions";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const EditProductPage = () => {
  const [productImages, setProductImages] = useState<Array<IProductImageItem>>(
    []
  );
  const [removeFiles, setRemoveFiles] = useState<Array<string>>([]);
  const { list } = useTypedSelector((store) => store.category);
  const { product } = useTypedSelector((store) => store.product);

  const { GetCategoryList, GetProduct, EditProduct } = useActions();

  const navigate = useNavigate();
  const location = useLocation();

  const LoadProductInfo = async (id: number) => {
    try {
      const resp: any = await GetProduct(id);

      setFieldValue("name", resp.name);
      setFieldValue("price", resp.price);
      setFieldValue("description", resp.description);
      setFieldValue("categoryId", resp.categoryId);

      setProductImages(resp.images);
    } catch (error) {
      console.error(error);
      navigate("not_found");
    }
  };

  useEffect(() => {
    const prodId = qs.parse(location.search, { ignoreQueryPrefix: true });
    var productId = parseInt(prodId.product?.toString() ?? "0");

    LoadProductInfo(productId);
    GetCategoryList();
  }, []);

  const editProduct = async (model: IProductEdit) => {
    try {
      await EditProduct(product.id, model);
      await navigate("/");
    } catch (error) {
      console.error("Something went wrong, ", error);
    }
  };

  const onSubmitHandler = async (model: IProductEdit) => {
    editProduct(model);
  };

  const onFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    let newFiles: Array<File> = [];

    if (files) {
      for (var i = 0; i < files.length; i++) {
        const fileType = files[i]["type"];
        const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];

        if (validImageTypes.includes(fileType)) {
          newFiles.push(files[i]);
        } else {
          console.error("Файл " + files[i].name + ", не є картинкою");
        }
      }
      setFieldValue("files", [...values.files, ...newFiles]);
    }
  };

  const onEditorChange = (content: string, editor: any) => {
    setFieldValue("description", content);
  };

  const onHandleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setFieldValue("categoryId", e.target.value);
    }
  };

  const onRemoveImageHandler = (fileName: string, isAdded: boolean) => {
    if (isAdded === true) {
      setFieldValue(
        "files",
        values.files.filter((x) => x.name !== fileName)
      );
    } else {
      setRemoveFiles([...removeFiles, fileName]);
      setProductImages(productImages.filter((x) => x.name !== fileName));
      setFieldValue("removeFiles", [...values.removeFiles, fileName]);
    }
  };

  // Formik
  const modelInitValues: IProductEdit = {
    name: "",
    price: 0,
    description: "",
    files: [],
    removeFiles: [],
    categoryId: 0,
  };

  const productCreateSchema = Yup.object().shape({
    name: Yup.string().required("*Обов'язкове поле"),
    price: Yup.number()
      .typeError("Ціна має бути цифрою")
      .min(1, "Ціна має бути більше 0")
      .required("*Обов'язкове поле"),
    description: Yup.string(),
    files: Yup.array(),
    removeFiles: Yup.array(),
    categoryId: Yup.number()
      .typeError("Ціна має бути цифрою")
      .required("*Обов'язкове поле")
      .min(1, "Ціна має бути більше 0"),
  });

  const formik = useFormik<IProductEdit>({
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
  } = formik;

  // Show images
  const dataOldFileView = productImages.map((file, key) => {
    return (
      <div key={key} className="overflow-hidden relative">
        <XMarkIcon
          height={"26px"}
          width={"26px"}
          onClick={() => {
            onRemoveImageHandler(file.name, false);
          }}
          className="absolute mt-1.5 mr-1.5 right-0 cursor-pointer border-2 border-black rounded-md hover:text-white hover:border-white"
        ></XMarkIcon>

        <img
          className="h-36 rounded-md object-cover object-center"
          src={IMAGES_FOLDER_MEDIUM + file.name}
          alt="file"
        />
      </div>
    );
  });

  const dataNewFileView = values.files.map((file, key) => {
    return (
      <div key={key} className="overflow-hidden relative">
        <XMarkIcon
          height={"26px"}
          width={"26px"}
          onClick={() => {
            onRemoveImageHandler(file.name, true);
          }}
          className="absolute mt-1.5 mr-1.5 right-0 cursor-pointer border-2 border-black rounded-md hover:text-white hover:border-white"
        ></XMarkIcon>

        <img
          className="h-36 rounded-md object-cover object-center"
          src={URL.createObjectURL(file)}
          alt="file"
        />
      </div>
    );
  });

  return (
    <div className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Редагувати продукт
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Ви на сторінці для редагування продукту
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
              <Editor
                apiKey="t2jaitu3vx9z1gsu1y2q8vv19tktion5xhz80ssx7w83om8p"
                onEditorChange={onEditorChange}
                value={values.description}
                onBlur={handleBlur}
                id="description"
                init={{
                  height: 500,
                  plugins:
                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss",
                  toolbar:
                    "undo redo | fontsize | align lineheight | link image media | blocks fontfamily | bold italic underline strikethrough | removeformat | table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | checklist numlist bullist indent outdent | emoticons charmap",
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",
                  mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                  ],
                }}
              />
              {touched.description && errors.description ? (
                <div className="my-2 mx-2" style={{ color: "red" }}>
                  {errors.description}
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
                {list.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Поле "Фото" */}
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
                    Завантажити
                    <input
                      type="file"
                      id="upload"
                      onChange={onFileHandler}
                      onBlur={handleBlur}
                      className="hidden"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      multiple
                    />
                  </label>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {dataOldFileView}
                  {dataNewFileView}
                </div>
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
export default EditProductPage;
