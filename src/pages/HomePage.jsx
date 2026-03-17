import { useWeatherContext } from "../contexts/WeatherContext";
import Spinner from "../components/Spinner";
import NoResultIcon from "../assets/icons/no-result.png";
import { motion } from "motion/react";
import { useThemeContext } from "../contexts/ThemeContext";
import { useEffect } from "react";

const HomePage = () => {
  const {
    data,
    loading,
    error,
    selectedPlace,
    showIconBasedOnCode,
    previousSearchedData,
  } = useWeatherContext();
  const { theme } = useThemeContext();

  const bgColour =
    previousSearchedData && previousSearchedData.day === 0
      ? "bg-dark-blue"
      : "bg-sky-blue";
  const dataBgColour =
    previousSearchedData && previousSearchedData.day === 0
      ? "bg-blue"
      : "bg-light-sky-blue";

  if (loading) {
    return (
      <div
        className={`grid place-content-center gap-10 px-5 py-8 ${bgColour} text-off-white font-primary md:px-0 md:py-0 md:gap-12`}
      >
        <div className="flex flex-col md:w-4xl md:space-y-5">
          <div
            className={`flex flex-col items-center mt-5 px-5 py-6 ${dataBgColour} text-center rounded-3xl md:mt-0 md:text-left`}
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
        className={`grid place-content-center gap-10 px-5 py-8 ${bgColour} text-off-white font-primary md:px-0 md:py-0 md:gap-12`}
      >
        <div className="flex flex-col md:w-4xl md:space-y-5">
          <div
            className={`flex flex-col items-center mt-5 px-5 py-6 ${dataBgColour} text-center rounded-3xl md:mt-0 md:text-left`}
          >
            <div className="flex items-center space-x-10">
              <img src={NoResultIcon} className="w-30" />
              <p>
                No weather data found for <b>{selectedPlace}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const backgroundColour = data.current.is_day === 0 ? "#0073ff" : "#41ceff";
  const dataBackgroundColour =
    data.current.is_day === 0 ? "bg-blue" : "bg-light-sky-blue";

  return (
    <motion.div
      initial={false}
      animate={{ backgroundColor: theme.background }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`grid place-content-center gap-10 relative px-5 py-8 text-off-white font-primary md:px-0 md:py-0 md:gap-12`}
    >
      <div className="flex flex-col mb-2 md:w-4xl md:space-y-5">
        <motion.div
          initial={false}
          animate={{ backgroundColor: theme.card }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`flex flex-col items-center px-15 py-6 ${dataBackgroundColour} text-center rounded-3xl md:px-5 md:text-left`}
        >
          <div className="flex flex-col items-center space-y-3">
            <h2 className="text-2xl font-bold">{`${data.location.name}, ${data.location.country}`}</h2>
            <span className="text-lg font-light">
              {data.location.localtime}
            </span>
          </div>
          <div className="flex flex-col pt-8 md:flex-row md:items-start md:space-x-20">
            <div className="flex flex-col items-center space-y-3">
              <img
                src={showIconBasedOnCode()}
                className="w-40 h-40 md:w-80 md:h-80"
              />
              <span className="font-light text-2xl">
                {data.current.condition.text}
              </span>
            </div>
            <div className="flex flex-col space-y-15 md:space-y-25">
              <div className="flex flex-col pt-15 space-y-4 md:space-y-2">
                <span className="text-5xl font-extrabold md:text-7xl">{`${data.current.temp_c}℃`}</span>
                <span className="pl-4 text-xl font-light md:text-lg">
                  {`Feels like ${data.current.feelslike_c}℃`}
                </span>
              </div>
              <div className="flex flex-row justify-center md:justify-between">
                <div className="flex flex-col items-center pr-8 py-5 space-y-2 border-r-1 border-off-white">
                  <span className="text-md">Humidity</span>
                  <span className="text-2xl md:text-3xl font-medium">{`${data.current.humidity}%`}</span>
                </div>
                <div className="flex flex-col items-center pl-8 py-5 space-y-2">
                  <span className="text-md">Wind</span>
                  <span className="text-2xl md:text-3xl font-medium">{`${data.current.wind_kph} kph`}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;
