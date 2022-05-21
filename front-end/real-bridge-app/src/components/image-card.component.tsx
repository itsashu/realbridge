import { ReactElement, useState } from "react";
import { updateImageApi } from "../api-service/images.api-service";
import { ImageInfoType, ImageType } from "../types/types";
import "./card.css";

export type ImageCardPropsType = {
  imageFile: ImageType;
  updateImageCallback: (updatedImage: ImageInfoType) => void;
};

export const ImageCard = ({
  imageFile,
  updateImageCallback,
}: ImageCardPropsType): ReactElement => {
  const [edit, setEdit] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [title, setTitle] = useState<string>(imageFile.Title ?? "");
  const [description, setDescription] = useState<string>(
    imageFile.Description ?? ""
  );

  const updateImage = async () => {
    const updatedImage: ImageInfoType = {
      Id: imageFile.Id,
      Title: title,
      Description: description,
    };

    try {
      await updateImageApi(updatedImage);
      updateImageCallback(updatedImage);
      setError("");
    } catch (ex) {
      setError("Failed to update image");
    }
  };

  return (
    <div className="container">
      <img
        className="image"
        alt="not found"
        src={`data:image/*;base64,${imageFile.Image}`}
      />
      <div className="inputs">
        <label htmlFor="title">Title: </label>
        <input
          disabled={!edit}
          id="title"
          value={title}
          placeholder="Image Title"
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className="inputs">
        <label htmlFor="description">Description: </label>
        <input
          disabled={!edit}
          id="description"
          value={description}
          placeholder="Image Description"
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div className="inputs">
        <input
          type="button"
          disabled={!edit}
          onClick={updateImage}
          title="Update Image Details"
          value="Update Image Details"
        />
        <input
          type="button"
          onClick={() => setEdit(!edit)}
          title={edit ? "Cancel" : "Edit Details"}
          value={edit ? "Cancel" : "Edit Details"}
        />
      </div>
      {error}
    </div>
  );
};
