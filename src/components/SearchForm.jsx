import React from "react";

const SearchForm = ({ handleSubmit, handleOnChange }) => {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-3 md:flex-row md:space-y-0"
        action="POST"
      >
        <input
          type="text"
          name="searchCity"
          placeholder="Search City ..."
          className="pl-5 py-2 bg-off-white text-custom-black text-xl placeholder:text-light-grey rounded-3xl md:rounded-none md:rounded-l-3xl md:min-w-[90%]"
          onChange={handleOnChange}
        />
        <input
          type="submit"
          value="Search"
          className="py-2 px-5 bg-custom-black text-xl font-medium cursor-pointer rounded-3xl md:rounded-none md:rounded-r-3xl"
        />
      </form>
    </>
  );
};

export default SearchForm;
