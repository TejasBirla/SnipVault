import React, { useContext, useState } from "react";
import loginImg from "../../assets/loginImg.jpg";
import codeImg from "../../assets/codeImg.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthContext";

export default function Signup() {
  const { registerUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Name is required.";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid.";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsSignup(true);
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsSignup(false);
        return;
      } else {
        setErrors({});
        const signupData = {
          userName: formData.fullName,
          emailID: formData.email,
          password: formData.password,
        };
        await registerUser(signupData);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsSignup(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={loginImg}
          alt="Signup Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 min-h-screen md:min-h-full px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center w-full max-w-md py-8">
          {/* Logo and website name */}
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
            <h2 className="text-2xl font-bold self-center">Register</h2>
            <p className="para-text text-[17px] mb-5 self-center">
              Let's begin saving code snippets
            </p>

            <label className="floating-label mb-4 w-full">
              <span>Your Name</span>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="input input-md w-full"
              />
            </label>
            {errors.fullName && (
              <p className="text-red-500 text-sm mb-4 pl-1">
                {errors.fullName}
              </p>
            )}

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
              disabled={isSignup}
              className="btn bg-black text-white font-[500] hover:bg-gray-800 rounded-md w-full"
            >
              {isSignup ? (
                <span className="flex items-center gap-2 justify-center">
                  <span className="loading loading-spinner loading-sm"></span>
                  Signing...
                </span>
              ) : (
                "Signup"
              )}
            </button>

            <p className="text-[14px] mt-3 self-center">
              Already have an account?{" "}
              <Link to={"/login"}>
                <span className="font-[700] text-black cursor-pointer">
                  Login
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
