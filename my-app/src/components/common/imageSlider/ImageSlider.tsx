import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Lightbox from "react-spring-lightbox";
import {
  IMAGES_FOLDER_HIGH,
  IMAGES_FOLDER_MEDIUM,
  IMAGES_FOLDER_VERY_HIGH,
} from "../../../constants/imgFolderPath";
import { IProductImageItem } from "../../product/store/types";

interface Props {
  images: Array<IProductImageItem>;
}

const ImageSlider: React.FC<Props> = ({ images }) => {
  const [_images, setImages] = useState<Array<IProductImageItem>>([]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setImages(images);
  }, [images]);

  const gotoPrevious = () => {
    currentImageIndex > 0 && setCurrentImageIndex(currentImageIndex - 1);
    scrollSmallImage();
  };

  const gotoNext = () => {
    currentImageIndex + 1 < _images.length &&
      setCurrentImageIndex(currentImageIndex + 1);
    scrollSmallImage();
  };

  const setIsOpenHandle = (id: any) => {
    setIsOpen(true);
    setCurrentImageIndex(id);
  };

  const scrollSmallImage = () => {
    var imgElement = document.getElementById(`img-${currentImageIndex}`);
    imgElement?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };
  return (
    <>
      <div
        className={
          isOpen ? "fixed inset-0 z-50 w-full h-full backdrop-blur-sm" : ""
        }
      />
      <div className="flex justify-center items-center mt-6 mb-2 ">
        <ChevronLeftIcon
          onClick={gotoPrevious}
          className={
            "mr-1 w-8 h-8 cursor-pointer select-none " +
            (currentImageIndex === 0
              ? "opacity-25"
              : "transition-transform active:scale-90")
          }
        />

        <div className="flex h-[37.5rem] w-[37.5rem]">
          <img
            src={
              _images.length > 0
                ? IMAGES_FOLDER_HIGH + _images[currentImageIndex].name
                : ""
            }
            alt={_images.length > 0 ? _images[currentImageIndex].name : ""}
            onClick={() => setIsOpenHandle(currentImageIndex)}
            className="picture-container transition duration-200 ease-out rounded-lg cursor-pointer hover:brightness-95"
          />
        </div>
        <ChevronRightIcon
          onClick={gotoNext}
          className={
            "ml-1 w-8 h-8 cursor-pointer select-none " +
            (currentImageIndex === _images.length - 1
              ? "opacity-25"
              : "transition-transform active:scale-90")
          }
        />
      </div>

      <div className="flex justify-center">
        <div className="flex w-[37.5rem] space-x-4 overflow-auto scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-indigo-300 scrollbar-thumb-rounded-md scrollbar-track-rounded-md select-none">
          {_images.map((image, index) => (
            <img
              key={image.id}
              src={IMAGES_FOLDER_MEDIUM + image.name}
              alt={image.name}
              id={`img-${index}`}
              className={
                "transition duration-200 ease-out h-24 max-w-max rounded ml-1 my-2 cursor-pointer border border-black " +
                (currentImageIndex === index
                  ? "ring-black ring-2 brightness-75 "
                  : "hover:ring-black hover:ring-2 hover:brightness-75 ")
              }
              onClick={() => setCurrentImageIndex(index)}
              style={_images.length === index + 1 ? { marginRight: "2px" } : {}}
            />
          ))}
        </div>
      </div>

      <Lightbox
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onPrev={gotoPrevious}
        onNext={gotoNext}
        images={_images.map((image) => ({
          key: image.id,
          src: IMAGES_FOLDER_VERY_HIGH + image.name,
          alt: image.name,
          className: "rounded-lg",
        }))}
        currentIndex={currentImageIndex}
        renderPrevButton={() => (
          <>
            {currentImageIndex !== 0 && (
              <ArrowLeftIcon
                width={50}
                onClick={gotoPrevious}
                className="w-12 transition-transform cursor-pointer z-[100] ml-10 hidden md:block active:scale-90"
              />
            )}
          </>
        )}
        renderNextButton={() => (
          <>
            {currentImageIndex !== _images.length - 1 && (
              <ArrowRightIcon
                onClick={gotoNext}
                className="w-12 transition-transform cursor-pointer z-[100] mr-10 hidden md:block active:scale-90"
              />
            )}
          </>
        )}
        renderImageOverlay={() => (
          <>
            <div className="absolute top-3 right-3 bg-gray-400 p-2 rounded-lg opacity-60">
              <p className="font-semibold">
                {currentImageIndex + 1} / {_images.length}
              </p>
            </div>
          </>
        )}
      />
    </>
  );
};
export default ImageSlider;
