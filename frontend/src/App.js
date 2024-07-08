import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatbot from "./components/chatbot";

// import Switch from 'react-router-dom'
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
// import LoadingPage from "./LoadingPage";
import Homepage from "./components/Homepage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: "/Home",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Navbar />
          <About />
        </>
      ),
    },
    {
      path: "/Services",
      element: (
        <>
          <Navbar />
          <Services />
        </>
      ),
    },
    {
      path: "/Homepage",
      element: (
        <>
          <Navbar />
          <Homepage />
        </>
      ),
    },
  ]);
  document.documentElement.style.overflow = "hidden";

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
