import React from "react";

const SearchResultsList = ({ results, handleSelectCity }) => {
  if (!results || results.length === 0) {
    return;
  }

  return (
    <div className="flex flex-col absolute px-5 w-full bg-off-white text-custom-black rounded-bl-xl rounded-br-xl">
      {results.map((city, i) => {
        return (
          <button
            key={i}
            className="py-3 text-left hover:font-semibold"
            type="button"
            onClick={() => handleSelectCity(city.name)}
          >
            {city.name}, {city.country}
          </button>
        );
      })}
    </div>
  );
};

export default SearchResultsList;
