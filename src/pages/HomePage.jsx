import React, { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import { useWeatherContext } from "../contexts/WeatherContext";
import Spinner from "../components/Spinner";
import NoResultIcon from "../assets/icons/no-result.png";

const HomePage = () => {
  const {
    data,
    fetchedKeyword,
    loading,
    error,
    fetchWeatherDataByKeyword,
    showIconBasedOnCode,
  } = useWeatherContext();
  const [newKeyword, setNewKeyword] = useState(fetchedKeyword);

  useEffect(() => {
    if (!data && fetchedKeyword) {
      fetchWeatherDataByKeyword(fetchedKeyword);
    }
  }, [fetchedKeyword]);

  const handleOnSearchChange = (e) => {
    setNewKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newKeyword &&
      fetchedKeyword &&
      fetchedKeyword.toLowerCase() !== newKeyword.toLowerCase()
    ) {
      fetchWeatherDataByKeyword(newKeyword);
    }
  };

  if (loading) {
    return (
      <div
        className={`grid place-content-center gap-10 px-5 py-8 bg-sky-blue text-off-white font-primary md:px-0 md:py-0 md:gap-12`}
      >
        <div className="flex flex-col md:w-4xl md:space-y-5">
          <SearchForm
            handleSubmit={handleSubmit}
            handleOnChange={handleOnSearchChange}
            value={newKeyword}
          />
          <div
            className={`flex flex-col items-center mt-5 px-5 py-6 bg-light-sky-blue text-center rounded-3xl md:mt-0 md:text-left`}
          >
            <Spinner loading={loading} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        className={`grid place-content-center gap-10 px-5 py-8 bg-sky-blue text-off-white font-primary md:px-0 md:py-0 md:gap-12`}
      >
        <div className="flex flex-col md:w-4xl md:space-y-5">
          <SearchForm
            handleSubmit={handleSubmit}
            handleOnChange={handleOnSearchChange}
            value={newKeyword}
          />
          <div
            className={`flex flex-col items-center mt-5 px-5 py-6 bg-light-sky-blue text-center rounded-3xl md:mt-0 md:text-left`}
          >
            <div className="flex items-center space-x-10">
              <img src={NoResultIcon} className="w-30" />
              <p>
                No weather data found for <b>{fetchedKeyword}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const backgroundColour =
    data.current.is_day === 0 ? "bg-dark-blue" : "bg-sky-blue";
  const dataBackgroundColour =
    data.current.is_day === 0 ? "bg-blue" : "bg-light-sky-blue";

  return (
    <div
      className={`grid place-content-center gap-10 px-5 py-8 ${
        data.current.condition.code !== 1000 ? "bg-dark-grey" : backgroundColour
      } text-off-white font-primary md:px-0 md:py-0 md:gap-12`}
    >
      <div className="flex flex-col md:w-4xl md:space-y-5">
        <SearchForm
          handleSubmit={handleSubmit}
          handleOnChange={handleOnSearchChange}
          value={newKeyword}
        />
        <div
          className={`flex flex-col items-center mt-5 px-5 py-6 ${
            data.current.condition.code !== 1000
              ? "bg-grey"
              : dataBackgroundColour
          } text-center rounded-3xl md:mt-0 md:text-left`}
        >
          <div className="flex flex-col items-center space-y-3">
            <h2 className="text-2xl font-bold">{`${data.location.name}, ${data.location.country}`}</h2>
            <span className="text-lg font-light">
              {data.location.localtime}
            </span>
          </div>
          <div className="flex flex-col pt-8 md:flex-row md:items-start md:space-x-20">
            <div className="flex flex-col items-center space-y-3">
              <img src={showIconBasedOnCode()} className="w-80" />
              <span className="font-light text-2xl">
                {data.current.condition.text}
              </span>
            </div>
            <div className="flex flex-col space-y-15 md:space-y-25">
              <div className="flex flex-col pt-15 space-y-4 md:space-y-2">
                <span className="text-7xl font-extrabold">{`${data.current.temp_c}℃`}</span>
                <span className="text-xl font-light md:text-lg">
                  {`Feels like ${data.current.feelslike_c}℃`}
                </span>
              </div>
              <div className="flex flex-row justify-center md:justify-between">
                <div className="flex flex-col items-center pr-8 py-5 space-y-2 border-r-1 border-off-white">
                  <span className="text-md">Humidity</span>
                  <span className="text-2xl font-medium">{`${data.current.humidity}%`}</span>
                </div>
                <div className="flex flex-col items-center pl-8 py-5 space-y-2">
                  <span className="text-md">Wind</span>
                  <span className="text-2xl font-medium">{`${data.current.wind_kph} kph`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
