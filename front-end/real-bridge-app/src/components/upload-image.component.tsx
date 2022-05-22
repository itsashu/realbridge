import { ReactElement, useState } from "react";
import { ImageType } from "../types/types";
import "./card.css";

export type UploadImagePropsType = {
  addImageCallback: (image: ImageType) => void;
};

export const UploadImage = ({
  addImageCallback,
}: UploadImagePropsType): ReactElement<UploadImagePropsType> => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const uploadImage = () => {
    if (selectedImage) {
      const newImage: ImageType = {
        Title: title,
        Description: description,
        Image: selectedImage,
      };
      try {
        addImageCallback(newImage);
        setSelectedImage(null);
        setDescription("");
        setTitle("");
      } catch (err) {}
    }
  };

  return (
    <div className="container">
      <div>
        <label htmlFor="upload">Upload image</label>
        <input
          id="upload"
          type="file"
          name="newImage"
          accept="image/*"
          onChange={(event) => {
            if (event.target.files) {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }
          }}
        />
      </div>
      {selectedImage && (
        <div className="upload-inputs">
          <img
            className="upload-image"
            alt="not found"
            src={URL.createObjectURL(selectedImage)}
          />
          <div className="inputs">
            <label htmlFor="upload-title">Title*: </label>
            <input
              required={true}
              id="upload-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="inputs">
            <label htmlFor="upload-description">Description: </label>
            <input
              id="upload-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="inputs">
            <input
              type="button"
              disabled={title.length === 0}
              onClick={uploadImage}
              value="Upload Image"
            />
            <input
              type="button"
              onClick={() => setSelectedImage(null)}
              value="Remove"
            />
          </div>
        </div>
      )}
    </div>
  );
};
