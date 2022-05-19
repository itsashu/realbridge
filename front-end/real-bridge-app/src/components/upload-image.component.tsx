import { ReactElement, useState } from "react";
import { saveNewImageApi } from "../api-service/images.api-service";
import { ImageType } from "../types/types";

export const UploadImage = (): ReactElement => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageDescription, setImageDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  const uploadImage = async () => {
    if (selectedImage) {
      const newImage: ImageType = {
        title: selectedImage?.name,
        description: imageDescription,
        image: selectedImage,
      };

      try {
        await saveNewImageApi(newImage);
        setSelectedImage(null);
        setImageDescription("");
        setError("");
      } catch (ex) {
        setError("failed to upload image");
      }
    }
  };

  return (
    <div>
      <h1>Upload image</h1>
      <input
        type="file"
        name="newImage"
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
            value={imageDescription}
            placeholder="Image Description"
            onChange={(event) => setImageDescription(event.target.value)}
          />
          <br />
          <button onClick={uploadImage}>Upload Image</button>
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}
      {error}
    </div>
  );
};
