import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await axios.post("/auth/signup", {
        username,
        email,
        password,
      });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailed());
    }
  };

  return (
    <div className="flex justify-center bg-black items-center">
      <form
        className="bg-black p-8 shadow-md rounded-md w-96"
        onSubmit={handleSignUp}
      >
        <h2 className="text-2xl text-white font-semibold mb-4">Sign Up</h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-white text-sm font-medium mb-1"
          >
            UserName
          </label>
          <input
            type="text"
            id="username"
            className="w-full border bg-gray-50 text-white rounded-md p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-white text-sm font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border bg-gray-50 text-white rounded-md p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-white text-sm font-medium mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border bg-gray-50 text-white rounded-md p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
