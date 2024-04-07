import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, userData } from "../../pages/userSlice";
import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../../assets/logo_page.png';
import "./Header.css";


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
    <Navbar style={{ backgroundColor: "#fb9431" }} expand="lg" className="text-light" id="navbar">
      <Container>
        <Navbar.Brand href="/"> <img src={logo} alt="logo" style={{width:"20%", objectFit:'cover'}}/> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="navbar-link">Home</Nav.Link>
            <Nav.Link href="Subjects" className="navbar-link">Asignaturas</Nav.Link>
            <Nav.Link href="About" className="navbar-link">Nosotros</Nav.Link>
            <Nav.Link href="Contact" className="navbar-link">Contáctanos</Nav.Link>
            <NavDropdown title="¡Comencemos!" className="navbar-link" id="basic-nav-dropdown">
              {!token ? (
                <>
                  <NavDropdown.Item href="login" className="navbar-link">Inicio</NavDropdown.Item>
                  <NavDropdown.Item href="register" className="navbar-link">Registrate</NavDropdown.Item>
                </>
              ) : decoded.userRoles === "super_admin" ? (
                <>
                  <NavDropdown.Item href="profile" className="navbar-link">Perfil</NavDropdown.Item>
                  <NavDropdown.Item href="users" className="navbar-link">Usuarios</NavDropdown.Item>
                  <NavDropdown.Item href="allsubjectspage" className="navbar-link">Asignaturas</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/" onClick={() => logMeOut()} className="navbar-link">Desconectar</NavDropdown.Item>
                </>
              ) : decoded.userRoles === "teacher" ? (
                <>
                  <NavDropdown.Item href="profile" className="navbar-link">Perfil</NavDropdown.Item>
                  <NavDropdown.Item href="allstudents" className="navbar-link">Estudiantes</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/" onClick={() => logMeOut()} className="navbar-link">Desconectar</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item href="profile" className="navbar-link">Perfil</NavDropdown.Item>
                  <NavDropdown.Item href="enrollment" className="navbar-link">Matricula</NavDropdown.Item>
                  <NavDropdown.Item href="mysubjects" className="navbar-link">Asignaturas</NavDropdown.Item>
                  <NavDropdown.Item href="activities" className="navbar-link">Actividades</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/" onClick={() => logMeOut()} className="navbar-link">Desconectar</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};