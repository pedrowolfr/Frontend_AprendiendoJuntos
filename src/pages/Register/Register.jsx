import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { userLogin, userSignUp } from "../../Services/apiCalls";
import { jwtDecode } from "jwt-decode";
import { Alert, Button, Container, Form } from "react-bootstrap";
import "./Register.css";

export const Register = () => {
  const [signUpData, setSignUpData] = useState({
    nick_name: "",
    name: "",
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);

  const inputHandler = (event) => {
    setSignUpData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const dispatch = useDispatch();
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !signUpData.nick_name ||
      !signUpData.name ||
      !signUpData.email ||
      !signUpData.password
    ) {
      setShowError(true);
      return;
    }
    try {
      await userSignUp(signUpData);
      const credentials = {
        email: signUpData.email,
        password: signUpData.password,
      };
      const token = await userLogin(credentials);
      if (!token) {
        navigate("/login");
        return;
      }
      const decodedToken = jwtDecode(token);
      const data = {
        token: token,
        userData: decodedToken,
      };
      dispatch(login({ credentials: data }));
      setTimeout(() => {
        navigate("/profile");
      });
    } catch (error) {
      console.error("Ha ocurrido un error", error);
    }
  };

  return (
    <div className="body">
      <Container>
        <div id="signUpBox" className="p-4">
          <h1 className="mb-4">Registro</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNickName">
              <Form.Label>Apodo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escribe un apodo"
                name="nick_name"
                value={signUpData.nick_name}
                onChange={inputHandler}
                required
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escribe tu nombre"
                name="name"
                value={signUpData.name}
                onChange={inputHandler}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="Introduce tu correo"
                name="email"
                value={signUpData.email}
                onChange={inputHandler}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Introduce Contraseña"
                name="password"
                value={signUpData.password}
                onChange={inputHandler}
                required
              />
            </Form.Group>
            {showError && (
              <Alert
                variant="danger"
                onClose={() => setShowError(false)}
                dismissible
              >
                Por favor rellena todos los campos
              </Alert>
            )}

            <Button variant="primary" type="submit" className="w-100">
              Registrate
            </Button>
          </Form>
          <p className="mt-3">
            ¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a>
          </p>
        </div>
      </Container>
    </div>
  );
};
