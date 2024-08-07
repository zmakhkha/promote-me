import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ExplorePage from "./pages/ExplorePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import AboutPage from "./pages/AboutPage";
import SettingsPage from "./pages/SettingsPage";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
// import NotFound from './pages/NotFound'; // Assuming you have a NotFound component
import { Genre } from "./hooks/useGenres";
import { Platform } from "./hooks/useGames";

export interface UserQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutPage />} />
      {/* <Route path="*" element={<NotFound />} /> */}

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<ExplorePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
