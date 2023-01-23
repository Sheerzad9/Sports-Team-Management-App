import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import "./MainMenuBar.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/UserReducer";

const MainMenuBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(({ user }) => {
    return user;
  });

  function handleLogout() {
    dispatch(setUser(null));
    navigate("/login");
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="justify-content-start" href="/">
          Sport's Team Managment App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav className="main-menu-custom">
              <Link to={"/"}>Home</Link>
            </Nav>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {user ? (
            <>
              <Navbar.Text>
                Signed in as: <a href="#login">{user.name}</a>
              </Navbar.Text>
              <Navbar>
                <Button onClick={handleLogout} variant="danger">
                  Logout
                </Button>
              </Navbar>
            </>
          ) : (
            <>
              <Nav className="authenticate">
                <Link to={"/login"}>Log in</Link>
              </Nav>
              <Nav className="authenticate">
                <Link to={"/signup"}>Sign up!</Link>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainMenuBar;
