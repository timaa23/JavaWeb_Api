import { useFormik } from "formik";
import { useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useActions } from "../../../hooks/useActions";
import { ILoginCredentials } from "../store/types";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import GoogleAuth from "../google/GoogleAuth";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const LoginPage = () => {
  const { user } = useTypedSelector((store) => store);

  const { Login } = useActions();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAuth) navigate("/");
    document.title = "Вхід - Магазин";
  }, []);

  const onSubmitHandler = async (model: ILoginCredentials) => {
    try {
      if (!executeRecaptcha) return;
      model.reCaptchaToken = await executeRecaptcha();

      await Login(model);
      navigate("/");
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  //Formik
  const modelInitValues: ILoginCredentials = {
    email: "",
    password: "",
    reCaptchaToken: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("*Це не схоже на email")
      .required("*Обов'язкове поле"),
    password: Yup.string().required("*Обов'язкове поле"),
  });

  const formik = useFormik<ILoginCredentials>({
    initialValues: modelInitValues,
    validationSchema: loginSchema,
    onSubmit: onSubmitHandler,
  });

  const { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    formik;

  return (
    <>
      <div className="flex items-center min-h-full bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div className="text-center">
              <h1 className="my-3 text-3xl font-semibold text-gray-700">
                Вхід
              </h1>
              <p className="text-gray-500">Ввійдіть у ваш аккаунт</p>
            </div>
            <div className="m-7">
              <form
                className="mt-8 space-y-6"
                onSubmit={handleSubmit}
                action="#"
                method="POST"
              >
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="you@company.com"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  {touched.email && errors.email && (
                    <div className="my-2 mx-2 text-red-600">{errors.email}</div>
                  )}
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-gray-600">
                      Пароль
                    </label>
                    <a
                      href="#"
                      className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500"
                    >
                      Забули пароль?
                    </a>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ваш пароль"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  {touched.password && errors.password && (
                    <div className="my-2 mx-2 text-red-600">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <button
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty)}
                    className={classNames(
                      !(formik.isValid && formik.dirty)
                        ? "bg-indigo-400"
                        : "bg-indigo-500 focus:bg-indigo-600 focus:outline-none",
                      "w-full px-3 py-3 text-white rounded-md"
                    )}
                  >
                    {user.loading && miniLoading()}
                    Вхід
                  </button>
                </div>

                <GoogleAuth />

                <p className="text-sm text-center text-gray-400">
                  Ще не маєте аккаунту?{" "}
                  <Link
                    to="/register"
                    className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500"
                  >
                    Зареєструйтеся
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

const miniLoading = () => (
  <svg
    className="inline float-left"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
      opacity=".25"
    />
    <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
      <animateTransform
        attributeName="transform"
        type="rotate"
        dur="0.75s"
        values="0 12 12;360 12 12"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);
