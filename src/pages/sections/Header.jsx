import React, { useEffect, useState } from "react";
import SearchForm from "../../components/SearchForm";
import { useWeatherContext } from "../../contexts/WeatherContext";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../contexts/ThemeContext";

const Header = () => {
  const {
    data,
    fetchedKeyword,
    searchResult,
    selectedPlace,
    fetchWeatherDataByKeyword,
    fetchSearchResult,
    resetSearchResult,
    resetSearch,
    previousSearchedData,
  } = useWeatherContext();
  const { theme, changeTheme } = useThemeContext();
  const [newKeyword, setNewKeyword] = useState(selectedPlace);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data && fetchedKeyword) {
      fetchWeatherDataByKeyword(fetchedKeyword, selectedPlace);
      setNewKeyword(selectedPlace);
    }
  }, [fetchedKeyword]);

  useEffect(() => {
    if (data) {
      changeTheme(data.current.is_day);
    }
  }, [data]);

  const handleBackToSearchPage = () => {
    resetSearch();
    resetSearchResult();
    navigate(`/`);
  };

  const handleOnSearchChange = (e) => {
    setNewKeyword(e.target.value);
    fetchSearchResult(e.target.value);
  };

  const handleSelectCity = (keyword, city) => {
    setNewKeyword(city);
    fetchWeatherDataByKeyword(keyword, city);
    resetSearchResult();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newKeyword &&
      fetchedKeyword &&
      fetchedKeyword.toLowerCase() !== newKeyword.toLowerCase()
    ) {
      fetchWeatherDataByKeyword(newKeyword, newKeyword);
    }
  };

  const backgroundColour =
    (data && data.current.is_day === 0) ||
    (previousSearchedData && previousSearchedData.day === 0)
      ? "bg-blue"
      : "bg-light-sky-blue";

  return (
    <div
      className={`flex justify-center items-center ${backgroundColour} text-off-white font-primary z-10`}
    >
      <div className="flex flex-col w-4xl md:flex-row md:items-baseline md:space-x-5">
        <button onClick={handleBackToSearchPage}>
          <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
        </button>
        <SearchForm
          handleSubmit={handleSubmit}
          handleOnChange={handleOnSearchChange}
          value={newKeyword}
          searchResult={searchResult}
          resetSearchResult={resetSearchResult}
          handleSelectCity={handleSelectCity}
        />
      </div>
    </div>
  );
};

export default Header;
