import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import LoginPage from "./LoginPage";

const Login = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6Ldb4kAlAAAAAP4PddQUIGM-mAgktMK139fO6FIZ">
      <LoginPage />
    </GoogleReCaptchaProvider>
  );
};

export default Login;
