import { ReactElement, useCallback, useEffect, useState } from "react";
import { getAllImagesApi } from "./api-service/images.api-service";
import { ImageGallery } from "./components/images.gallery.component";
import { TopNavBar } from "./components/top.navbar.component";
import { ImageInfoType, ImageType } from "./types/types";
import "./App.css";

export const App = (): ReactElement => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    getSearchedImages();
  }, [images]);

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

  const getSearchedImages = async () => {
    try {
      const listOfImages: ImageType[] = await getAllImagesApi();
      setImages(listOfImages);
    } catch (ex) {
      setError("Unable to fetch Images");
    }
  };

  const getImages = (): ImageType[] =>
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
        <ImageGallery
          images={getImages()}
          page={page}
          addImageCallback={addImageCallback}
          updateImageCallback={updateImageCallback}
        />
      </div>
      {error}
    </div>
  );
};

export default App;
