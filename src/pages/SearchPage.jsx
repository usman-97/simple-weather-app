import React, { useEffect, useState } from "react";
import weatherIcon from "../assets/icons/weather.png";
import weatherMobileIcon from "../assets/icons/weather-mobile.png";
import SearchForm from "../components/SearchForm";
import { useNavigate } from "react-router-dom";
import { useWeatherContext } from "../contexts/WeatherContext";

const SearchPage = () => {
  const [keyword, setKeyword] = useState(null);
  const {
    fetchWeatherDataByKeyword,
    searchResult,
    fetchSearchResult,
    resetSearchResult,
  } = useWeatherContext();
  const navigate = useNavigate();

  const handleOnSearchChange = (e) => {
    setKeyword(e.target.value);
    fetchSearchResult(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (keyword) {
      await fetchWeatherDataByKeyword(keyword);
      navigate(`/`);
    }
  };

  const handleSelectCity = (city) => {
    setKeyword(city);
    fetchWeatherDataByKeyword(city);
    resetSearchResult();
  };

  return (
    <div className="grid place-content-center gap-10 px-5 bg-sky-blue text-off-white font-primary md:px-0 md:gap-12">
      <div className="flex flex-col items-center space-y-6 md:flex-row md:space-x-20">
        <img src={weatherIcon} className="hidden w-100 md:block" />
        <img src={weatherMobileIcon} className="block w-50 md:hidden" />
        <div className="flex-col space-y-6 md:space-y-10">
          <h1 className="text-5xl font-extrabold text-center md:text-8xl font-secondary">
            Simple Weather App
          </h1>
          <SearchForm
            handleSubmit={handleSubmit}
            handleOnChange={handleOnSearchChange}
            value={keyword}
            searchResult={searchResult}
            resetSearchResult={resetSearchResult}
            handleSelectCity={handleSelectCity}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
