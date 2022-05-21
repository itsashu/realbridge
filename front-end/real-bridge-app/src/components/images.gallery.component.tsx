import { ReactElement } from "react";
import { ImageInfoType, ImageType } from "../types/types";
import { ImageCard } from "./image-card.component";
import { UploadImage } from "./upload-image.component";
import "./card.css";

export type ImagesGalleryPropsType = {
  images: ImageType[];
  page: number;
  addImageCallback: (image: ImageType) => void;
  updateImageCallback: (updatedImage: ImageInfoType) => void;
};

export const ImageGallery = ({
  images = [],
  page,
  addImageCallback,
  updateImageCallback,
}: ImagesGalleryPropsType): ReactElement<ImagesGalleryPropsType> => (
  <div className="gallery">
    {images.length > 0 &&
      images.map((image: ImageType, index: number) => {
        if (index >= page * 5 && index < (page + 1) * 5)
          return (
            <ImageCard
              key={image.Id}
              imageFile={image}
              updateImageCallback={updateImageCallback}
            />
          );
      })}
    <UploadImage addImageCallback={addImageCallback} />
  </div>
);
