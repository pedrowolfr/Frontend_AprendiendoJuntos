import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, userData } from "../../pages/userSlice";
import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap/dist/css/bootstrap.min.css";


export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRdxData = useSelector(userData);

  const token = userRdxData?.credentials.token;
  const decoded = userRdxData?.credentials?.userData;

  const logMeOut = () => {
      dispatch(logout({ credentials: {} }));
      setTimeout(() => {
          navigate("/home");
      });
  };

  return (
    <Navbar style={{ backgroundColor: "#101010" }} variant="dark" expand="lg" className="text-light" id="navbar">
      <Container>
        <Navbar.Brand href="/">Aprendiendo Juntos</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="Subjects">Asignaturas</Nav.Link>
            <NavDropdown title="Mi cuenta" id="basic-nav-dropdown">
              {!token ? (
                <>
                  <NavDropdown.Item href="login">Inicio</NavDropdown.Item>
                  <NavDropdown.Item href="register">Registrate</NavDropdown.Item>
                </>
              ) : decoded.userRoles === "super_admin" ? (
                <>
                  <NavDropdown.Item href="profile">Perfil</NavDropdown.Item>
                  <NavDropdown.Item href="users">Usuarios</NavDropdown.Item>
                  <NavDropdown.Item href="allsubjects">Asignaturas</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/" onClick={() => logMeOut()}>Desconectar</NavDropdown.Item>
                </>
              ) : decoded.userRoles === "teachers" ? (
                <>
                  <NavDropdown.Item href="profile">Perfil</NavDropdown.Item>
                  <NavDropdown.Item href="mystudents">Estudiantes</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/" onClick={() => logMeOut()}>Desconectar</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item href="profile">Perfil</NavDropdown.Item>
                  <NavDropdown.Item href="subjects">Asignar revisión</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/" onClick={() => logMeOut()}>Desconectar</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};