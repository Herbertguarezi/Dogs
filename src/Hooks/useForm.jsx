import React from "react";

// parãmetros de validação pré-definidos
const validacao = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    erro: "Preencha um e-mail válido",
  },
  number: {
    regex: /[0-9]/,
    erro: "Preencha um número válido",
  },
};

const useForm = (type) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);

  function validate(value) {
    if (type === false) return true; // caso não exista o argumento type, irá considerar como true
    if (value.length === 0) {
      // caso for uma string vazia, irá pedir um valor
      setError("Preencha um valor");
      return false;
    } else if (validacao[type] && !validacao[type].regex.test(value)) {
      //faz a validação de acordo com o type que foi passado no hook useForm
      setError(validacao[type].erro);
      return false;
    } else {
      //caso o value passe na verificação, coloca o erro como null
      setError(null);
      return true;
    }
  }
  function onChange({ target }) {
    setValue(target.value);
    if (error) {
      validate(value);
    }
  }
  //executa a verificação, quando troca o foco do elemento
  function onBlur() {
    validate();
    console.log(error);
  }

  return {
    value,
    setValue,
    error,
    onChange,
    onBlur: () => validate(value),
    validate: () => validate(value),
  };
};

export default useForm;
