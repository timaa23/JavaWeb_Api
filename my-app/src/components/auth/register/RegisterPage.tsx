import { useFormik } from "formik";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useActions } from "../../../hooks/useActions";
import { IRegisterValidate } from "../store/types";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import PhoneInput, { CountryData } from "react-phone-input-2";
import GoogleAuth from "../google/GoogleAuth";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import "react-phone-input-2/lib/bootstrap.css";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const RegisterPage = () => {
  const { user } = useTypedSelector((store) => store);

  const { Register } = useActions();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAuth) navigate("/");
    document.title = "Реєстрація - Магазин";
  }, []);

  const onSubmitHandler = async (model: IRegisterValidate) => {
    try {
      if (!executeRecaptcha) return;
      var reCaptchaToken = await executeRecaptcha();

      const prodResp: any = await Register(model, reCaptchaToken);
      navigate("/");
      console.log(prodResp);
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  //Formik
  const modelInitValues: IRegisterValidate = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
  };

  const registerSchema = Yup.object().shape({
    firstname: Yup.string().required("*Обов'язкове поле"),
    lastname: Yup.string().required("*Обов'язкове поле"),
    email: Yup.string()
      .email("*Це не схоже на email")
      .required("*Обов'язкове поле"),
    phone: Yup.string().max(20),
    password: Yup.string()
      .min(6, "Пароль занадто короткий")
      .required("*Обов'язкове поле"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Паролі не співпадають")
      .required("Підтвердіть пароль"),
  });

  const formik = useFormik<IRegisterValidate>({
    initialValues: modelInitValues,
    validationSchema: registerSchema,
    onSubmit: onSubmitHandler,
  });

  const onPhoneHandle = (
    value: string,
    data: {} | CountryData,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => {
    setFieldValue("phone", formattedValue);
  };

  const {
    handleSubmit,
    setFieldValue,
    values,
    handleChange,
    errors,
    touched,
    handleBlur,
  } = formik;

  return (
    <>
      <div className="flex items-center min-h-full bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div className="text-center">
              <h1 className="my-3 text-3xl font-semibold text-gray-700">
                Реєстрація
              </h1>
              <p className="text-gray-500">Зареєструйтеся на сайті</p>
            </div>
            <div className="m-7">
              <form
                className="mt-8 space-y-6"
                onSubmit={handleSubmit}
                action="#"
                method="POST"
              >
                <div className="mb-6 flex space-x-3">
                  <div className="">
                    <label
                      htmlFor="firstname"
                      className="block mb-2 text-sm text-gray-600"
                    >
                      Ім'я
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      value={values.firstname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Іван"
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                    {touched.firstname && errors.firstname && (
                      <div className="my-2 mx-2 text-red-600">
                        {errors.firstname}
                      </div>
                    )}
                  </div>
                  <div className="">
                    <label
                      htmlFor="lastname"
                      className="block mb-2 text-sm text-gray-600"
                    >
                      Прізвище
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      value={values.lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Мельник"
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                    {touched.lastname && errors.lastname && (
                      <div className="my-2 mx-2 text-red-600">
                        {errors.lastname}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Телефон
                  </label>
                  <PhoneInput
                    country={"ua"}
                    inputClass="h-10 "
                    value={values.phone}
                    onChange={onPhoneHandle}
                    inputStyle={{ width: "inherit" }}
                    enableSearch
                  />
                  {touched.phone && errors.phone && (
                    <div className="my-2 mx-2 text-red-600">{errors.phone}</div>
                  )}
                </div>
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
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="passwordConfirmation"
                      className="text-sm text-gray-600"
                    >
                      Підтвердіть пароль
                    </label>
                  </div>
                  <input
                    type="password"
                    name="passwordConfirmation"
                    id="passwordConfirmation"
                    value={values.passwordConfirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Підтвердіть ваш пароль"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  {touched.passwordConfirmation &&
                    errors.passwordConfirmation && (
                      <div className="my-2 mx-2 text-red-600">
                        {errors.passwordConfirmation}
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
                    Реєстрація
                  </button>
                </div>

                <GoogleAuth />

                <p className="text-sm text-center text-gray-400">
                  Вже є аккаунт?{" "}
                  <Link
                    to="/login"
                    className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500"
                  >
                    Ввійдіть
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

export default RegisterPage;

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
