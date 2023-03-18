import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../css/header.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import Nav from "./Nav";


function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout(event) {
    if (event.target.innerText === "Log out") {
      setUser({});
      localStorage.clear();
    } else if (event.target.innerText === "Log in") {
      navigate("/login");
    }
  }
  return (
    <Row id='header'>
      <Col sm={4}>
        <Link className='text-decoration-none text-start text-white' to='/'>
          <h1>North News</h1>
        </Link>
      </Col>
      <Col className='text-start' sm={4}>
        <Nav />
      </Col>
      <Col sm={2} className='text-end'>
        {" "}
        <p className='username-label text-capitalize pt-3 text-white'>
          {" "}
          {user?.username !== undefined
            ? `Hello: ${user.username}`
            : `Hello Guest!`}
        </p>
      </Col>
      <Col sm={2}>
        <button className='text-white pt-3 ' onClick={handleLogout}>
          {user ? "Log out" : "Log in"}
        </button>
      </Col>
    </Row>
  );
}

export default Header;
