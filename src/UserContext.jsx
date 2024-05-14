import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";
import React from "react";
import { useNavigate } from "react-router-dom";

//cria um contexto global com as informações e métodos de login do usuário
export const UserContext = React.createContext(null);

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  // realiza o logout do usuário e já manda ele para a página de login novamente
  const userLogout = React.useCallback(async function () {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem("token");
  }, []);

  // puxa, da API, as informações do usuário, de acordo com o token que foi fornecido
  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const userJson = await (await fetch(url, options)).json();
    setData(userJson);
    setLogin(true);
  }

  // faz o login do usuário
  async function userLogin(username, password) {
    // tentativa de login
    try {
      // limpa os estados de erro e de loading
      setError(null);
      setLoading(true);
      // faz o fetch do token do usuário
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      // caso a resposta não retorne como 'ok', coloca um erro
      if (!response.ok) throw new Error("Usuário ou senha inválido");
      // se a resposta for 'ok', pega o token e guarda ele no LocalStorage
      const { token } = await response.json();
      window.localStorage.setItem("token", token);
      // com o token declarado, executa a funçãi getUser com o token de argumento
      await getUser(token);
      // envia o usuário para a página de conta
      navigate("/conta");
    } catch (err) {
      // se houver um erro, coloca a variável error como a mensagem passada anteriormente
      setError(err.message);
      setLogin(false);
    } finally {
      // em todos os casos, o loading retorna como falso
      setLoading(false);
    }
  }

  // efeito para realizar o login automático quando o componente monta
  React.useEffect(() => {
    // função de login automático
    async function autoLogin() {
      // pega o token armazenado no LocalStorage
      const token = window.localStorage.getItem("token");
      // caso exita o token executa o login
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token inválido");
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
