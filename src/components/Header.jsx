import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../css/header.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

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
      <Col sm={4}></Col>
      <Col sm={4}>
        <Link className='site-name' to='/'>
          <h1>North News</h1>
        </Link>
      </Col>
      <Col sm={4} className='d-flex justify-content-end'>
        {" "}
        <p className='username-label  m-4'>
          {" "}
          {user?.username !== undefined
            ? `Signed in as: ${user.username}`
            : `Hello Guest!`}
        </p>
        <button onClick={handleLogout}>{user ? "Log out" : "Log in"}</button>
      </Col>
    </Row>
  );
}

export default Header;
