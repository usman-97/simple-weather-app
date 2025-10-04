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
import {
  setWithExpiry,
  getWithExpiry,
  removeFromStorage,
} from "../util/LocalStorageUtil";
import { WEATHER_API_URL, CLIENT_ID } from "../config/config.js";
import { getToken } from "../client/AuthenticationClient.js";

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
  const [searchResult, setSearchResult] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Get keyword from local storage
  useEffect(() => {
    const savedKeyword = getWithExpiry("weatherKeyword");
    if (savedKeyword) {
      setFetchedKeyword(savedKeyword);
    }
  }, []);

  const fetchWeatherDataByKeyword = useCallback(
    async (keyword, selectedPlace = "") => {
      // If provided keyword is same as the one stored in local storage then we don't need to proceed any further
      if (keyword === fetchedKeyword) {
        return;
      }

      setLoading(true);
      setError(null);
      let token = await getToken();
      if (!token) {
        setError("Unauthorised access...");
        throw new Error(error);
      }
      try {
        const res = await fetch(
          `${WEATHER_API_URL}/v1/weather/details?k=${keyword}`,
          {
            headers: {
              "X-Client-Id": CLIENT_ID,
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          setError("Failed to fetch weather data");
          throw new Error(error);
        }
        const responseData = await res.json();
        setData(responseData);
        setFetchedKeyword(keyword);
        const oneHour = 60 * 60 * 1000;
        setWithExpiry("weatherKeyword", keyword, oneHour);
        if (selectedPlace) {
          setSelectedPlace(selectedPlace);
          setWithExpiry("selectedPlace", selectedPlace, oneHour);
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchSearchResult = useCallback(async (keyword) => {
    let token = await getToken();
    if (!token) {
      setError("Unauthorised access...");
      throw new Error(error);
    }

    try {
      const res = await fetch(
        `${WEATHER_API_URL}/v1/weather/search?k=${keyword}`,
        {
          headers: {
            "X-Client-Id": CLIENT_ID,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setSearchResult(data);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
      setSearchResult([]);
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
        (weatherCode >= 1150 && weatherCode <= 1207) ||
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

  const resetSearchResult = () => {
    setSearchResult([]);
  };

  const resetSearch = () => {
    clearWeatherDataFromLocalStorage();
    resetState();
  };

  const resetState = () => {
    setFetchedKeyword(null);
    setSelectedPlace(null);
    setData(null);
  };

  const clearWeatherDataFromLocalStorage = () => {
    removeFromStorage("weatherKeyword");
    removeFromStorage("selectedPlace");
  };

  const value = useMemo(
    () => ({
      data,
      fetchedKeyword,
      loading,
      error,
      searchResult,
      selectedPlace,
      fetchWeatherDataByKeyword,
      fetchSearchResult,
      showIconBasedOnCode,
      resetSearchResult,
      resetSearch,
    }),
    [
      data,
      fetchedKeyword,
      loading,
      error,
      searchResult,
      selectedPlace,
      fetchWeatherDataByKeyword,
      fetchSearchResult,
      showIconBasedOnCode,
      resetSearchResult,
      resetSearch,
    ]
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
