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
      <Col sm={4} className='text-start'>
        <Link  to='/'>
          <img src={logo} alt="North News Logo" height="150px" width="150px"/>
        </Link>
      </Col>
      <Col className='text-start ' sm={4}>
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
        <button className='text-white ' onClick={handleLogout}>
          {user ? "Log out" : "Log in"}
        </button>
      </Col>
    </Row>
  );
}

export default Header;
