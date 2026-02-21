import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import BaseLayout from "../layouts/BaseLayout";
import { useWeatherContext } from "../contexts/WeatherContext";
import FullLayout from "../layouts/FullLayout";

const AppRouter = () => {
  const { fetchedKeyword } = useWeatherContext();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<BaseLayout />}>
          <Route path="/search" element={<SearchPage />} />
        </Route>

        <Route element={<FullLayout />}>
          <Route path="/home" element={<HomePage />} />
        </Route>

        <Route
          path="/"
          element={
            fetchedKeyword ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/search" replace />
            )
          }
        />
      </>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
