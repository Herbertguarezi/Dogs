import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginCriar from "./LoginCriar";
import LoginPerdeuSenha from "./LoginPerdeuSenha";
import LoginReset from "./LoginReset";
import { UserContext } from "../../UserContext";
import styles from "./Login.module.css";

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login === true) return <Navigate to="/conta" />;
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/criar" element={<LoginCriar />} />
          <Route path="/perdeu" element={<LoginPerdeuSenha />} />
          <Route path="/resetar" element={<LoginReset />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
