import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import http from "../../../http_common";
import { CategoryActionTypes, ICategoryCreate } from "../store/types";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddCategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modelInitValues: ICategoryCreate = {
    name: "",
    description: "",
    image: "",
  };
  const categoryCreateSchema = Yup.object().shape({
    name: Yup.string().required("*Обов'язкове поле"),
    description: Yup.string().required("*Обов'язкове поле"),
    image: Yup.string().required("*Обов'язкове поле"),
  });

  const onSubmitHandler = async (model: ICategoryCreate) => {
    try {
      const item = http.post("/api/categories", model).then((res) => {
        dispatch({
          type: CategoryActionTypes.CATEGORY_CREATE,
          payload: res.data,
        });

        navigate("/");
      });
    } catch (error: any) {
      console.log("Something went wrong, ", error);
    }
  };

  const onFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (readfile) => {
        const result = readfile.target?.result as string;
        setFieldValue("image", result);
      };
    }
  };

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
    isValid,
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
            />
            {touched.image && errors.image ? (
              <div className="my-2 mx-2" style={{ color: "red" }}>
                {errors.image}
              </div>
            ) : null}
          </div>
        </div>
        <div className="mt-10">
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Додати
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddCategoryPage;
