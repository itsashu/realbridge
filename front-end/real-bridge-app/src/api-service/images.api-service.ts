import { WEBAPI_DOMAIN_ADDRESS } from "../configs/app.config";
import { ImageInfoType, ImageType } from "../types/types";

export const CONTROLLER: string = "images";

const url: string = `${WEBAPI_DOMAIN_ADDRESS}/${CONTROLLER}`;

export const saveNewImageApi = async (image: FormData): Promise<any> =>
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      // "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      // type: "formData",
      // enctype: "multipart/form-data",
    },
    body: image,
  });

export const updateImageApi = async (image: ImageInfoType): Promise<any> =>
  await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(image),
  });

export const getAllImagesApi = async (): Promise<ImageType[]> => {
  const response = await fetch(url, {
    method: "GET",
  });
  const images: ImageType[] = await response.json();
  return images;
};

export const getImagesByIdApi = async (imageId: number): Promise<ImageType> => {
  const response = await fetch(`${url}?imageId=${imageId}`, {
    method: "GET",
  });
  const image: ImageType = await response.json();
  console.dir("users \n" + JSON.stringify(image));
  return image;
};

export const deleteImageApi = async (imageId: number): Promise<any> =>
  await fetch(url, {
    method: "DELETE",
  });
