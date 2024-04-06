import { useState } from "react";
import { LoginInput } from "../../Components/LoginInput/LoginInput";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { userLogin } from "../../Services/apiCalls";
import "./Login.css";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);

  const dispatch = useDispatch();
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  const inputHandler = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    userLogin(credentials)
      .then((token) => {
        if (!token) {
          setLoginError(true);
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
      })
      .catch((err) => {
        console.error("Ha ocurrido un error", err);
        setLoginError(true);
      });
  };

  return (
    <div className="body">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div id="logInBox" className="p-4">
              <h1>Bienvenid@</h1>
              <h2>Inicia sesión</h2>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <LoginInput
                    type={"email"}
                    name={"email"}
                    handler={inputHandler}
                    placeholder={"Email"}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <LoginInput
                    type={"password"}
                    name={"password"}
                    handler={inputHandler}
                    placeholder={"Contraseña"}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={buttonHandler}
                  className="btn-block"
                >
                  Iniciar sesión
                </Button>
              </Form>
              {loginError && (
                <Alert variant="danger" className="mt-3">
                  Correo electrónico o contraseña no válidos. Inténtalo de
                  nuevo.
                </Alert>
              )}
              <p className="mt-3">
                ¿No tienes una cuenta? <a href="/register">Registrate</a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
