import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const Authform = ({ currentForm }) => {
  const [activeForm, setActiveForm] = useState(currentForm);

  return (
    <div className="flex justify-center h-screen bg-gray-50 items-center">
      <div className="p-8 shadow-md bg-black rounded-md w-96">
        <div className="flex justify-between mb-4">
          <img src="/xtwitter.png" alt="X" className="w-7 h-7" />
          <div>
            <button
              className={`text-sm pr-2 font-medium ${
                activeForm === "signUp" ? "text-blue-500" : "text-white"
              }`}
              onClick={() => setActiveForm("signUp")}
            >
              Sign Up
            </button>
            <button
              className={`text-sm font-medium ${
                activeForm === "signIn" ? "text-blue-500" : "text-white"
              }`}
              onClick={() => setActiveForm("signIn")}
            >
              Sign In
            </button>
          </div>
        </div>
        {activeForm === "signUp" ? <SignUpForm /> : <SignInForm />}
      </div>
    </div>
  );
};

export default Authform;
