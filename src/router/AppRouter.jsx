import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import MainLayout from "../layouts/MainLayout";

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<SearchPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
