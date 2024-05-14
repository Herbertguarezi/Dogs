import React from "react";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import Input from "../Forms/Input";
import Error from "../Helper/Error";
import { USER_POST } from "../../api";
import { UserContext } from "../../UserContext";
import useFetch from "../../Hooks/useFetch";

const LoginCriar = () => {
  const username = useForm();
  const email = useForm("email");
  const password = useForm();

  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    event.preventDefault();
    const { response } = await request(url, options);
    if (response.ok) userLogin(username.value, password.value);
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input type="text" id="usuario" label="Usuário" {...username} />
        <Input type="email" id="email" label="E-mail" {...email} />
        <Input type="password" id="password" label="Senha" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        {error && <Error erro={error} />}
      </form>
    </section>
  );
};

export default LoginCriar;
