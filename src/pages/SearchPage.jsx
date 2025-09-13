import React, { useEffect, useState } from "react";
import weatherIcon from "../assets/icons/weather.png";
import weatherMobileIcon from "../assets/icons/weather-mobile.png";
import SearchForm from "../components/SearchForm";
import { useNavigate } from "react-router-dom";
import { useWeatherContext } from "../contexts/WeatherContext";
import Spinner from "../components/Spinner";

const SearchPage = () => {
  const [keyword, setKeyword] = useState(null);
  const {
    fetchWeatherDataByKeyword,
    searchResult,
    fetchSearchResult,
    resetSearchResult,
    loading,
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

  const handleSelectCity = (keyword, city) => {
    setKeyword(city);
    fetchWeatherDataByKeyword(keyword, city);
    resetSearchResult();
  };

  return (
    <div className="grid place-content-center gap-10 px-5 pb-50 bg-sky-blue text-off-white font-primary overflow-hidden md:px-0 md:gap-12">
      <div className="flex flex-col space-y-6 relative">
        <h1 className="text-5xl font-extrabold text-center md:text-8xl font-secondary md:mb-10">
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
        <div
          className={`flex flex-col items-center mt-5 px-5 py-6 text-center rounded-3xl md:mt-0 md:text-left`}
        >
          <Spinner loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
