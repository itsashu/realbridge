import { ReactElement, useState } from "react";
import { saveNewImageApi } from "../api-service/images.api-service";
import { ImageType } from "../types/types";
import "./card.css";

export type UploadImagePropsType = {
  addImageCallback: (image: ImageType) => void;
};

export const UploadImage = ({
  addImageCallback,
}: UploadImagePropsType): ReactElement => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  const uploadImage = async () => {
    if (selectedImage) {
      const newImage = new FormData();
      newImage.append("Title", title);
      newImage.append("Description", description);
      newImage.append("Image", selectedImage);

      try {
        await saveNewImageApi(newImage);
        setSelectedImage(null);
        setDescription("");
        setTitle("");
        addImageCallback({
          Title: title,
          Description: description,
          Image: selectedImage,
        });
        setError("");
      } catch (ex) {
        setError("Failed to upload image");
      }
    }
  };

  return (
    <div className="container">
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
      <br />
      <br />
      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <input
            required
            value={title}
            placeholder="Title"
            onChange={(event) => setTitle(event.target.value)}
          />
          <br />
          <input
            value={description}
            placeholder="Image Description"
            onChange={(event) => setDescription(event.target.value)}
          />
          <br />
          <input type="button" onClick={uploadImage} value="Upload Image" />
          <br />
          <input
            type="button"
            onClick={() => setSelectedImage(null)}
            value="Remove"
          />
        </div>
      )}
      {error}
    </div>
  );
};
