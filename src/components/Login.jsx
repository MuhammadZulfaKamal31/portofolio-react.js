import React, { useState } from "react";
import Section from "./Section";
import axios from "axios";
import Button from "./Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading indicator

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email: email,
        password: password,
      });

      const token = response.data.data.token;
      localStorage.setItem("authToken", token);

      setMessage("Login successful!");

      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || "Login failed!");
      } else {
        setMessage("An error occurred!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section
      className="px-4 mt-0 xl:mt-4 lg:mt4"
      crosses
      lg
      customPaddings="py-[5rem] sm:py-[5rem] lg:py-[3.6rem]"
    >
      <div className="max-w-md mx-auto">
        <div className="w-[19rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-3 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 [&>h4]:first:text-color-2 [&>h4]:even:text-color-1 [&>h4]:last:text-color-3">
          <div className="p-8">
            <h2 className="text-center text-2xl sm:text-3xl lg:text-3xl font-extrabold text-white">
              Welcome Back
            </h2>
            <p className="mt-2 sm:mt-8 lg:mt-8 text-center text-gray-400">
              Sign in to continue
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm">
                <div>
                  <label className="sr-only" for="email">
                    Email address
                  </label>
                  <input
                    placeholder="Email address"
                    className="appearance-none relative block w-full px-3 py-1 sm:py-3 lg:py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-n-1 focus:border-n-4 focus:z-10 text-[0.7rem] sm:text-sm"
                    required
                    autocomplete="email"
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label className="sr-only" for="password">
                    Password
                  </label>
                  <input
                    placeholder="Password"
                    className="appearance-none relative block w-full px-3 py-1 sm:py-3 lg:py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-n-1 focus:border-n-4 focus:z-10 text-[0.7rem] sm:text-sm"
                    required
                    autocomplete="current-password"
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Button
                  className="mt-6 group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-n-1 bg-none border-n-1"
                  type="submit"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </div>
            </form>
            <div className="text-[0.7rem] text-center mt-3">
              <a
                className="font-medium text-indigo-500 hover:text-indigo-400"
                href="/register"
              >
                Doesnt have an account?
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Login;
