import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import authoService from "./appwrite/Autho";
import { login, logout } from "./store/AuthSlice";

import { Header, Footer } from "./components";

export const App = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authoService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      <Header />

      <main className="flex-1 bg-gray-700">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};