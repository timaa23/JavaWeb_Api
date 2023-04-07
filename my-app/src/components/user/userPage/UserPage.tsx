import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import defaultUserImg from "../../../assets/img/default_user.png";
import { IMAGES_FOLDER_MEDIUM } from "../../../constants/imgFolderPath";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ChangeEvent } from "react";
import { useActions } from "../../../hooks/useActions";

const UserPage = () => {
  const { user, loading } = useTypedSelector((store) => store.user);

  const { ChangeUserImage } = useActions();

  const onFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const { token } = localStorage;
    if (e.target.files) {
      let file = e.target.files[0];

      const fileType = file["type"];
      const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];

      if (validImageTypes.includes(fileType)) {
        try {
          ChangeUserImage({ token: token, image: file });
        } catch (error) {
          console.error("Щось пішло не так, ", error);
        }
      } else {
        console.error("Підтримуються тільки картинки!");
      }
    }
  };

  return (
    <>
      <section className="pt-16 bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                    {}
                    <label htmlFor="upload">
                      <img
                        id="pfp"
                        alt="..."
                        src={
                          user?.image
                            ? IMAGES_FOLDER_MEDIUM + user.image
                            : defaultUserImg
                        }
                        className={
                          (loading
                            ? "brightness-75"
                            : "hover:brightness-75 hover:cursor-pointer") +
                          " transition shadow-xl rounded-full h-40 w-40 align-middle object-cover object-center border-none absolute -m-16 -ml-20 lg:-ml-16"
                        }
                        style={{ maxWidth: "150px", maxHeight: "150px" }}
                      />
                      {loading && miniLoading()}
                    </label>
                    <input
                      type="file"
                      id="upload"
                      onChange={onFileHandler}
                      className="hidden"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                    />
                  </div>
                </div>

                <div className="w-full px-4 text-center mt-20">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        0
                      </span>
                      <span className="text-sm text-blueGray-400">Відгуки</span>
                    </div>
                    <div className="p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        0
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Оголошення
                      </span>
                    </div>
                    <div className="p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        0
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Коментарі
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                  {user?.firstname + " " + user?.lastname}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {user?.roles.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </div>
                <div className="flex justify-center items-center mb-6 text-blueGray-600 mt-10">
                  <EnvelopeIcon className="w-5 mr-3" />
                  {user?.email}
                </div>
                <div className="flex justify-center items-center mb-6 text-blueGray-600">
                  <PhoneIcon className="w-5 mr-3" />
                  {user?.phone}
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      *Опис*
                    </p>
                    <p className="font-normal text-pink-500">Більше</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserPage;

const miniLoading = () => (
  <svg
    className=" absolute"
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
