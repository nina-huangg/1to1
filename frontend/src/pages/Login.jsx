import Form from "../components/Form";
import React from "react";
import { Link } from "react-router-dom";
import LoginHeader from "../components/LoginHeader";

function Login() {
  return (
    <>
      <LoginHeader />
      <Form route="login/" method="post" />
    </>
  );
}

export default Login;
