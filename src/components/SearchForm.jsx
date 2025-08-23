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
  const [isClickingButton, setIsClickingButton] = useState(false);

  const handleFocusOut = () => {
    if (!isClickingButton) {
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
              onMouseDown={() => setIsClickingButton(true)}
              onMouseUp={() => setIsClickingButton(false)}
              value={value}
            />
            <div className="block md:hidden">
              <SearchResultsList
                results={searchResult}
                handleSelectCity={handleSelectCity}
              />
            </div>
            <input
              type="submit"
              value="Search"
              className="mt-1 py-2 px-5 bg-custom-black text-xl font-medium cursor-pointer rounded-3xl md:mt-0 md:rounded-none md:rounded-r-3xl"
            />
          </div>
          <div className="hidden md:block">
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
