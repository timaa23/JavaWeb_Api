import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import http from "../../../http_common";
import {
  IUserTokenState,
  ILoginCredentials,
  UserActionTypes,
} from "../store/types";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const LoginPage = () => {
  const dispatch = useDispatch();

  const onSubmitHandler = (model: ILoginCredentials) => {
    http.post<IUserTokenState>(`/account/login`, model).then((resp) => {
      dispatch({ type: UserActionTypes.LOGIN, payload: resp.data.token });
    });
  };

  //Formik
  const modelInitValues: ILoginCredentials = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Це не схоже на email")
      .required("*Обов'язкове поле"),
    password: Yup.string().required("*Обов'язкове поле"),
  });

  const formik = useFormik<ILoginCredentials>({
    initialValues: modelInitValues,
    validationSchema: loginSchema,
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
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Ввійдіть у ваш аккаунт
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              або{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                зареєструйтеся
              </Link>
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Пароль
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Пароль"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Запам'ятати мене
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Забули пароль?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                className={classNames(
                  !(formik.isValid && formik.dirty)
                    ? "bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                  "group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white"
                )}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Ввійти
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
