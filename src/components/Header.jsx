import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../css/header.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import Nav from "./Nav";
import logo from "../assets/logo.png"


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
    <Row id='header' className="align-items-center">
    <Col xs={12} sm={12} md={2} className='text-start mb-2 mb-md-0'>
      <Link to='/'>
        <img src={logo} alt="North News Logo" height="150px" width="150px" />
      </Link>
    </Col>
    <Col className='text-start fs-5 fw-bold ' xs={12} sm={4} md={6}>
      <Nav />
    </Col>
    <Col sm={4} md={3} xs={12} className='text-end text-xs-start'>
      <p className='username-label fs-5 fw-bold text-capitalize pt-3 text-white'>
        {user?.username !== undefined ? `Hello: ${user.username}` : `Hello Guest!`}
      </p>
    </Col>
    <Col sm={4} md={1} xs={12} className='text-end text-xs-start'>
      <button className='text-white fs-5 fw-bold' onClick={handleLogout}>
        {user ? "Log out" : "Log in"}
      </button>
    </Col>
  </Row>
  );
}

export default Header;
