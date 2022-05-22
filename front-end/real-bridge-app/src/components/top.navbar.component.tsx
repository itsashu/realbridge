import * as React from "react";
import "./top.navbar.css";

export type TopNavBarPropsType = {
  currentPage: number;
  totalPages: number;
  searchText: string;
  setSearchText: (text: string) => void;
  setPage: (page: number) => void;
};

export const TopNavBar = ({
  currentPage,
  totalPages,
  searchText = "",
  setSearchText,
  setPage,
}: TopNavBarPropsType): React.ReactElement<TopNavBarPropsType> => (
  <div className="top-nav">
    <b>IMAGE GALLERY</b>
    <span className="search">
      <label htmlFor="search">Search Image: </label>
      <input
        type="text"
        placeholder="Search Image Title"
        value={searchText}
        onChange={(event) =>
          setSearchText(event.target.value?.toLocaleLowerCase())
        }
      ></input>
      {"   "}
      <input
        disabled={currentPage === 0}
        className="nav-buttons"
        type="button"
        value="Previous Page"
        onClick={() => {
          if (currentPage > 0) setPage(currentPage - 1);
        }}
      />{" "}
      Page {currentPage + 1}/{totalPages}{" "}
      <input
        disabled={currentPage + 1 === totalPages}
        className="nav-buttons"
        type="button"
        value="Next Page"
        onClick={() => {
          if (currentPage + 1 < totalPages) setPage(currentPage + 1);
        }}
      />
    </span>
  </div>
);
