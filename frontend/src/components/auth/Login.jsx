import React, { useContext, useState } from "react";
import loginImg from "../../assets/loginImg.jpg";
import codeImg from "../../assets/codeImg.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthContext";

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLogging, setIsLogging] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid.";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required.";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLogging(true);
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLogging(false);
      return;
    }

    try {
      await loginUser({
        emailID: formData.email,
        password: formData.password,
      });
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={loginImg}
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 min-h-screen md:min-h-full px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center w-full max-w-md py-8">
          {/* Logo and website name  */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <img
              src={codeImg}
              alt="logo"
              className="w-10 h-10 mix-blend-multiply"
            />
            <h1 className="text-[28px] font-[700]">SnipVault</h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full p-6 sm:p-8 bg-white rounded-lg shadow-md flex flex-col items-start"
          >
            <h2 className="text-2xl font-bold self-center">Login</h2>
            <p className="text-[17px] mb-5 self-center text-gray-600">
              Welcome back with us
            </p>

            <label className="floating-label mb-4 w-full">
              <span>Your Email</span>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="mail@site.com"
                className="input input-md w-full"
              />
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm mb-4 pl-1">{errors.email}</p>
            )}

            <label className="floating-label mb-4 w-full">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                className="input input-md w-full"
              />
            </label>
            {errors.password && (
              <p className="text-red-500 text-sm mb-4 pl-1">
                {errors.password}
              </p>
            )}

            <button
              type="submit"
              disabled={isLogging}
              className="btn bg-black text-white font-[500] hover:bg-gray-800 rounded-md w-full"
            >
              {isLogging ? (
                <span className="flex items-center gap-2 justify-center">
                  <span className="loading loading-spinner loading-sm"></span>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>

            <p className="text-[14px] mt-3 self-center">
              Don't have an account?{" "}
              <Link to={"/signup"}>
                <span className="font-[700] text-black cursor-pointer">
                  Sign Up
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
