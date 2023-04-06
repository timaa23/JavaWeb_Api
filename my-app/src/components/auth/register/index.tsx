import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import RegisterPage from "./RegisterPage";

const Register = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6Ldb4kAlAAAAAP4PddQUIGM-mAgktMK139fO6FIZ">
      <RegisterPage />
    </GoogleReCaptchaProvider>
  );
};

export default Register;
