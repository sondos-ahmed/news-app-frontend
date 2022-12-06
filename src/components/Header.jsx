import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../css/header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Row id='header'>
      <Col sm={8}>
        <Link className='site-name' to='/'>
          <h1>North News</h1>
        </Link>
      </Col>
      <Col sm={4}>
        {" "}
        <p>username</p>
      </Col>
    </Row>
  );
}

export default Header;
