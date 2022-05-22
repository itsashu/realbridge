import { ReactElement, useCallback, useEffect, useState } from "react";
import {
  deleteImageApi,
  getAllImagesApi,
  saveNewImageApi,
  updateImageApi,
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllImages();
  }, []);

  const updateImageCallback = useCallback(
    async (updatedImage: ImageInfoType) => {
      try {
        setLoading(true);
        await updateImageApi(updatedImage);
        const updatedImages: ImageType[] = images.map((image) =>
          image.Id === updatedImage.Id ? { ...image, ...updatedImage } : image
        );
        setImages(updatedImages);
      } catch (ex) {
        setError("Failed to update Image");
      } finally {
        setLoading(false);
      }
    },
    [images]
  );

  const addImageCallback = useCallback(async (image: ImageType) => {
    setLoading(true);
    const newImage = new FormData();
    newImage.append("Title", image.Title);
    newImage.append("Description", image.Description);
    newImage.append("Image", image.Image);

    try {
      const newImages = await saveNewImageApi(newImage);
      setImages(newImages);
      setError("");
    } catch (ex) {
      setError("Failed to upload image");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteImageCallback = useCallback(
    async (imageId: number) => {
      try {
        setLoading(true);
        await deleteImageApi(imageId);
        const updatedImages: ImageType[] = images.filter(
          (image) => image.Id !== imageId
        );
        setImages(updatedImages);
      } catch (ex) {
        setError("Unable to delete image.");
      } finally {
        setLoading(false);
      }
    },
    [images]
  );

  const getAllImages = async () => {
    try {
      setLoading(true);
      const listOfImages: ImageType[] = await getAllImagesApi();
      setImages(listOfImages);
    } catch (ex) {
      setError("Unable to fetch Images");
    } finally {
      setLoading(false);
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
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="gallery">
          <ImagesGallery
            images={getSearchedImages()}
            page={page}
            addImageCallback={addImageCallback}
            updateImageCallback={updateImageCallback}
            deleteImageCallback={deleteImageCallback}
          />
        </div>
      )}
      {error}
    </div>
  );
};

export default App;
