import ButtonGradient from "./assets/svg/ButtonGradient";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Roadmap from "./components/Roadmap";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import FooterLogin from "./components/FooterLogin";
import SidebarAi from "./components/SidebarAi";
import AiChat from "./components/AiChat";
import ContextProvider from "./context/Context";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
              <Header />
              <Hero />
              <Benefits />
              <Collaboration />
              <Services />
              <Pricing />
              <Roadmap />
              <Footer />
              <ButtonGradient />
            </div>
          }
        />

        <Route
          path="/login"
          element={
            <div className="h-screen w-screen overflow-hidden">
              <div className="pt-[0.75rem] lg:pt-[2.5rem] max-w-full max-h-full">
                <Login />
                <FooterLogin />
              </div>
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className="h-screen w-screen overflow-hidden">
              <div className="pt-[0.75rem] lg:pt-[2.5rem] max-w-full max-h-full">
                <Register />
                <FooterLogin />
              </div>
            </div>
          }
        />
        <Route
          path="/prompt"
          element={
            <div className="h-screen w-screen overflow-hidden">
              <div className="flex max-w-full max-h-full">
                <ContextProvider>
                  <SidebarAi />
                  <AiChat />
                </ContextProvider>
              </div>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;
