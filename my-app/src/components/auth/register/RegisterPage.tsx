import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { IRegisterCredentials } from "../store/types";
import { useActions } from "../../../hooks/useActions";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const RegisterPage = () => {
  const { Register } = useActions();

  const navigate = useNavigate();

  const onSubmitHandler = (model: IRegisterCredentials) => {
    try {
      const prodResp: any = Register(model);
      console.log(prodResp);
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  //Formik
  const modelInitValues: IRegisterCredentials = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const registerSchema = Yup.object().shape({
    firstname: Yup.string().required("*Обов'язкове поле"),
    lastname: Yup.string().required("*Обов'язкове поле"),
    email: Yup.string().required("*Обов'язкове поле"),
    password: Yup.string().required("*Обов'язкове поле"),
  });

  const formik = useFormik<IRegisterCredentials>({
    initialValues: modelInitValues,
    validationSchema: registerSchema,
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
              Створіть новий аккаунт
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              або{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                ввійдіть у вже існуючий
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
                <label htmlFor="firstname" className="sr-only">
                  Ім'я
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Ім'я"
                />
              </div>
              <div>
                <label htmlFor="lastname" className="sr-only">
                  Прізвище
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Прізвище"
                />
              </div>
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
                  autoComplete="email"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 mt-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                  autoComplete="current-password"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Пароль"
                />
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
                Зареєструватися
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default RegisterPage;
