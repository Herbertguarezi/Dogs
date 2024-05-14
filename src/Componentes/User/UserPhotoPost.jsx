import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import Input from "../Forms/Input";
import Error from "../Helper/Error";
import React from "react";
import styles from "./UserPhotoPost.module.css";
import { PHOTO_POST } from "../../api";
import { useNavigate } from "react-router-dom";

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm("number");
  const idade = useForm("number");
  const [img, setImg] = React.useState({});
  const { data, error, loading, request } = useFetch();
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate("/conta");
  }, [data, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formaData = new FormData();
    formaData.append("img", img.raw);
    formaData.append("nome", nome.value);
    formaData.append("peso", peso.value);
    formaData.append("idade", idade.value);
    const { url, options } = PHOTO_POST(formaData, token);
    request(url, options);
  }

  function handleImgChange({ target }) {
    setImg({
      raw: target.files[0],
      preview: URL.createObjectURL(target.files[0]),
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input type="text" label="Nome" id="nome" {...nome} />
        <Input type="number" label="Peso" id="peso" {...peso} />
        <Input type="number" label="Idade" id="idade" {...idade} />
        <input
          className={styles.file}
          type="file"
          name="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        {error && <Error erro={error} />}
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
