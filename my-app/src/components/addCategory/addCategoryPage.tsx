import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import http from "../../http_common";
import { CategoryActionTypes } from "../category/store/types";

const AddCategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputRefName = useRef<HTMLInputElement>(null);
  const inputRefdescription = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const category = {
      name: inputRefName.current?.value,
      description: inputRefdescription.current?.value,
    };

    http.post("/api/categories", category).then((res) => {
      dispatch({
        type: CategoryActionTypes.CATEGORY_CREATE,
        payload: res.data,
      });

      navigate("/");
    });
  };

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
              Назава
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="name"
                id="name"
                ref={inputRefName}
                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
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
              <input
                type="text"
                name="description"
                id="description"
                ref={inputRefdescription}
                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
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
