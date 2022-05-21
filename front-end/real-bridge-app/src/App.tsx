import { ReactElement, useCallback, useEffect, useState } from "react";
import {
  deleteImageApi,
  getAllImagesApi,
} from "./api-service/images.api-service";
import { ImagesGallery } from "./components/images.gallery.component";
import { TopNavBar } from "./components/top.navbar.component";
import { ImageInfoType, ImageType } from "./types/types";
import "./App.css";

export const App = (): ReactElement => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    getAllImages();
  }, []);

  const addImageCallback = useCallback(
    (image: ImageType) => {
      setImages([...images, image]);
    },
    [images]
  );

  const updateImageCallback = useCallback(
    (updatedImage: ImageInfoType) => {
      const updatedImages: ImageType[] = images.map((image) =>
        image.Id === updatedImage.Id ? { ...image, ...updatedImage } : image
      );
      setImages(updatedImages);
    },
    [images]
  );

  const deleteImageCallback = useCallback(
    async (imageId: number) => {
      try {
        await deleteImageApi(imageId);
        const updatedImages: ImageType[] = images.filter(
          (image) => image.Id !== imageId
        );
        setImages(updatedImages);
      } catch (ex) {
        setError("Unable to delete image.");
      }
    },
    [images]
  );

  const getAllImages = async () => {
    try {
      const listOfImages: ImageType[] = await getAllImagesApi();
      setImages(listOfImages);
    } catch (ex) {
      setError("Unable to fetch Images");
    }
  };

  const getSearchedImages = (): ImageType[] =>
    images.filter(
      (image) =>
        image.Title.toLowerCase().includes(searchText) ||
        image.Description.toLowerCase().includes(searchText)
    );

  return (
    <div className="App">
      <TopNavBar
        searchText={searchText}
        currentPage={page}
        totalPages={Math.ceil(images.length / 5)}
        setSearchText={setSearchText}
        setPage={setPage}
      />
      <div className="gallery">
        <ImagesGallery
          images={getSearchedImages()}
          page={page}
          addImageCallback={addImageCallback}
          updateImageCallback={updateImageCallback}
          deleteImageCallback={deleteImageCallback}
        />
      </div>
      {error}
    </div>
  );
};

export default App;
