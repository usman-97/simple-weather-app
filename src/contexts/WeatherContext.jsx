import {
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from "react";

import SunnyIcon from "../assets/icons/sunny.png";
import CloudyIcon from "../assets/icons/cloudy.png";
import MoonIcon from "../assets/icons/moon.png";
import FogIcon from "../assets/icons/fog.png";
import RainIcon from "../assets/icons/rainy.png";
import SnowIcon from "../assets/icons/snowy.png";

const WeatherContext = createContext(null);

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider.");
  }
  return context;
};

export const WeatherProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [fetchedKeyword, setFetchedKeyword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get keyword from local storage
  useEffect(() => {
    const savedKeyword = localStorage.getItem("weatherKeyword");
    if (savedKeyword) {
      setFetchedKeyword(savedKeyword);
    }
  }, []);

  const fetchWeatherDataByKeyword = useCallback(async (keyword) => {
    // If provided keyword is same as the one stored in local storage then we don't need to proceed any further
    if (keyword === fetchedKeyword) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `http://localhost:8085/v1/weather/details/${keyword}`
      );
      if (!res.ok) {
        setError("Failed to fetch weather data");
        throw new Error(error);
      }
      const responseData = await res.json();
      setData(responseData);
      setFetchedKeyword(keyword);
      localStorage.setItem("weatherKeyword", keyword);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const showIconBasedOnCode = () => {
    let weatherIcon = SunnyIcon;
    if (data) {
      const isDay = data.current.is_day === 1;
      const weatherCode = data.current.condition.code;

      if (weatherCode >= 1003 && weatherCode <= 1087) {
        weatherIcon = CloudyIcon;
      } else if (
        (weatherCode >= 1114 && weatherCode <= 1117) ||
        (weatherIcon >= 1210 && weatherCode <= 1237) ||
        (weatherCode >= 1255 && weatherCode <= 1264) ||
        (weatherCode >= 1279 && weatherCode <= 1282)
      ) {
        weatherIcon = SnowIcon;
      } else if (weatherCode >= 1135 && weatherCode <= 1147) {
        weatherIcon = FogIcon;
      } else if (
        (weatherCode >= 1150 && weatherCode <= 1027) ||
        (weatherCode >= 1240 && weatherCode <= 1252) ||
        weatherCode === 1276
      ) {
        weatherIcon = RainIcon;
      } else if (weatherCode === 1000 && !isDay) {
        weatherIcon = MoonIcon;
      }
    }
    return weatherIcon;
  };

  const value = useMemo(
    () => ({
      data,
      fetchedKeyword,
      loading,
      error,
      fetchWeatherDataByKeyword,
      showIconBasedOnCode,
    }),
    [
      data,
      fetchedKeyword,
      loading,
      error,
      fetchWeatherDataByKeyword,
      showIconBasedOnCode,
    ]
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
