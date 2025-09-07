import axios from "axios";
import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import i18next from "i18next";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useNavigate();
  const isRTL = i18next.dir() === "rtl";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(i18next.t("login.requiredFields"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(i18next.t("login.invalidEmail"));
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_ROOT_URL}/login`,
        { email, password }
      );

      toast.success(response.data.message, {
        duration: 2000,
        position: "top-center",
        icon: "😍",
      });

      setTimeout(() => {
        router("/");
      }, 2000);
    } catch (err) {
      const message = err?.response?.data?.message || err.message;
      setError(message);
      toast.error(message, {
        duration: 3000,
        position: "top-center",
        icon: "😱",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="-translate-y-16 min-h-screen bg-[#030014] flex items-center mr-auto px-4 py-12 z-[52]"
    >
      <div className="h-full mr-auto w-full max-w-md bg-[#0e0e2c] shadow-xl rounded-xl p-8 relative">
        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-sm shadow">
            {error}
          </div>
        )}

        <h2 className="text-2xl font-semibold text-center text-gray-50 mb-1">
          {i18next.t("login.login")}
        </h2>
        <p className="text-center text-sm text-gray-300 mb-4">
          {i18next.t("login.welcome")}
        </p>

        <form onSubmit={handleLogin} className="space-y-2">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-100 mb-1"
            >
              {i18next.t("login.email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="z-[53] w-full rounded-md border border-gray-400 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0077b6] shadow-sm"
              placeholder={i18next.t("login.emailPlace")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-100 mb-1"
            >
              {i18next.t("login.password")}
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="z-[53] w-full rounded-md border border-gray-400 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0077b6] shadow-sm"
                placeholder={i18next.t("login.passwordPlace")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 end-2 flex items-center text-sm text-gray-600 hover:text-gray-400"
              >
                {showPassword ? i18next.t("login.hide") : i18next.t("login.show")}
              </button>
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0077b6] hover:bg-[#023e8a] text-white py-2 px-4 rounded-md font-medium transition-colors"
            >
              {isLoading
                ? i18next.t("login.loading")
                : i18next.t("login.login")}
            </button>
          </div>
        </form>

        {/* Signup Redirect */}
        <p className="text-center text-sm text-lime-200 mt-6">
          {i18next.t("login.account")}{" "}
          <NavLink
            to="/register"
            className="z-[53] text-[#a9ee8a] cursor-pointer hover:underline  font-medium"
          >
            {i18next.t("login.signup")}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
