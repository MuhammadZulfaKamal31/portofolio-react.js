import { useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState, useEffect } from "react";
import axios from "axios";

const Header = () => {
  const pathname = useLocation();
  const navigate = useNavigate();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");

      if (token) {
        await axios.post(
          "http://localhost:8000/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
      toggleNavigation();
      window.location.reload();
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img src={brainwave} width={190} height={40} alt="Brainwave" />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[4.5rem] left-0 right-0 -bottom-1 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row lg:justify-start">
            {navigation
              .filter((item) => {
                // Hide "New account" and "Sign in" if authenticated, and show "Logout" in mobile
                if (
                  isAuthenticated &&
                  (item.title === "New account" || item.title === "Sign in")
                ) {
                  return false;
                }
                return true;
              })
              .map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  onClick={handleClick}
                  className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 
                  ${item.onlyMobile ? "lg:hidden" : ""}
                  px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                    item.url === pathname.hash
                      ? "z-2 lg:text-n-1"
                      : "lg:text-n-1/50"
                  } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                >
                  {item.title}
                </a>
              ))}

            {/* Show Logout option in mobile navigation if authenticated */}
            {isAuthenticated && (
              <a
                onClick={() => {
                  handleLogout();
                }}
                className="block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 lg:hidden px-6 py-6 md:py-8 lg:text-xs lg:font-semibold lg:leading-5 xl:px-12"
              >
                {loading ? "Signing out..." : "Sign out"}
              </a>
            )}
          </div>

          <HamburgerMenu />
        </nav>

        <div className="flex items-center space-x-6">
          {!isAuthenticated ? (
            <>
              <a
                href="/register"
                className="button hidden text-n-1/50 transition-colors hover:text-n-1 lg:block"
              >
                New account
              </a>
              <Button className="hidden lg:flex" href="/login">
                Sign in
              </Button>
            </>
          ) : (
            <Button className="hidden lg:flex" onClick={handleLogout}>
              {loading ? "Signing out..." : "Sign out"}
            </Button>
          )}

          <Button
            className="ml-auto lg:hidden"
            px="px-3"
            onClick={toggleNavigation}
          >
            <MenuSvg openNavigation={openNavigation} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;