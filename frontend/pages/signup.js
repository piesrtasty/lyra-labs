import React from "react";
import LoggedOutHeader from "@components/header/logged-out";
import AuthForm from "@components/auth-form";

const Signup = () => {
  return (
    <div className="bg-white">
      <LoggedOutHeader />
      <AuthForm isSignup={true} />
    </div>
  );
};

export default Signup;
