import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", { username, password });
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
        onSubmit={handleSignIn}
      >
        <h2 className="text-2xl text-white font-semibold mb-4">Sign In</h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-white text-sm font-medium mb-1"
          >
            Username
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
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
