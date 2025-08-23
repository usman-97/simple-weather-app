import { useState } from "react";
import SearchResultsList from "./SearchResultsList";

const SearchForm = ({
  handleSubmit,
  handleOnChange,
  value = "",
  searchResult = [],
  resetSearchResult,
  handleSelectCity,
}) => {
  const handleFocusOut = () => {
    // Check if the element that gained focus is a child of the form.
    // This prevents the search results from being cleared when you click a button.
    if (!e.currentTarget.contains(e.relatedTarget)) {
      resetSearchResult();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} action="POST">
        <div className="w-full md:flex md:flex-col">
          <div className="flex flex-col md:flex-row md:space-y-0">
            <input
              type="text"
              name="searchCity"
              placeholder="Search City ..."
              className="w-full pl-5 py-2 bg-off-white text-custom-black text-xl placeholder:text-light-grey rounded-3xl md:rounded-none md:rounded-l-3xl md:min-w-[90%]"
              onChange={handleOnChange}
              onBlur={handleFocusOut}
              value={value}
            />
            <input
              type="submit"
              value="Search"
              className="mt-1 py-2 px-5 bg-custom-black text-xl font-medium cursor-pointer rounded-3xl md:mt-0 md:rounded-none md:rounded-r-3xl"
            />
          </div>
          <div>
            <SearchResultsList
              results={searchResult}
              handleSelectCity={handleSelectCity}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchForm;
