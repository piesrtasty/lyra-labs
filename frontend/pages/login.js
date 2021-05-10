import React from "react";
import LoggedOutHeader from "@components/header/logged-out";
import AuthForm from "@components/auth-form";

const Login = () => {
  return (
    <>
      <LoggedOutHeader />
      <AuthForm />
    </>
  );
};

export default Login;
