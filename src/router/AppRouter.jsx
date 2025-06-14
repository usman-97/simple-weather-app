import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import MainLayout from "../layouts/MainLayout";
import { useWeatherContext } from "../contexts/WeatherContext";

const AppRouter = () => {
  const { fetchedKeyword } = useWeatherContext();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={fetchedKeyword ? <HomePage /> : <SearchPage />}
        ></Route>
        {fetchedKeyword && <Route path="/home" element={<HomePage />}></Route>}
        {fetchedKeyword && (
          <Route path="/search" element={<SearchPage />}></Route>
        )}
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
