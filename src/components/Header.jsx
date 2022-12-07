import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../css/header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Row id='header'>
      <Col sm={4}></Col>
      <Col sm={4}>
        <Link className='site-name' to='/'>
          <h1>North News</h1>
        </Link>
      </Col>
      <Col sm={4}>
        {" "}
        <p class='username-label'>username</p>
      </Col>
    </Row>
  );
}

export default Header;
