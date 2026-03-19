import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import {useSelector} from "react-redux";
import { Navigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)

  
  const { handleLogin } = useAuth();

  if(!loading && user) {
    return <Navigate to="/home" replace></Navigate>
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log({
    //   email,
    //   password,
    // });

    const res = await handleLogin({email, password});

    if(res?.success) {

      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 px-4">
      <div
        className="w-full max-w-5xl grid md:grid-cols-2 rounded-2xl overflow-hidden 
shadow-[0_0_25px_rgba(99,102,241,0.6),0_0_60px_rgba(79,70,229,0.4)] 
bg-white dark:bg-slate-800 transition-all duration-300 ease-in-out"
      >
        {/* LEFT IMAGE SECTION */}
        <div className="hidden dark:bg-slate-900 md:flex items-center justify-center overflow-hidden">
          <div className="rounded-xl flex items-center justify-center">
            <img
              className="h-107 w-full object-cover transition-all duration-300 ease-in-out"
              src="./login-img.png"
              alt="login image"
            />
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
              Welcome Back
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Enter your credentials to continue
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  autoComplete="true"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out"
                  />

                  {/* Eye Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-100 cursor-pointer transition-all duration-200 ease-in-out outline-none"
                  >
                    {showPassword ? <EyeClosed /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 ease-in-out text-white font-semibold outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
            </form>

            <p className="text-sm text-center text-slate-500 dark:text-slate-400 mt-6">
              Don’t have an account?{" "}
              <Link to="/register" className="text-indigo-600 dark:text-indigo-400 cursor-pointer transition-all duration-200 ease-in-out hover:text-indigo-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;