import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";

const GoogleAuth = () => {
  const navigate = useNavigate();

  const { GoogleAuth } = useActions();

  const handleGoogleLogin = async (resp: any) => {
    const token: string = resp.credential;
    try {
      await GoogleAuth({
        token: token,
        // Справжня captcha тут не працює, тому зробив так
        reCaptchaToken: "DefaultGoogleAuthWithNoToken",
      });

      navigate("/");
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  useEffect(() => {
    //global google
    window.google.accounts!.id.initialize({
      client_id:
        "917043886980-gadmoelkrqe7t42antc7cisjeej6m3au.apps.googleusercontent.com",
      callback: handleGoogleLogin,
    });
    window.google.accounts!.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );
  }, []);

  return (
    <>
      <div id="signInDiv" className="flex justify-center"></div>
    </>
  );
};
export default GoogleAuth;
