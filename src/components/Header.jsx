import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../css/header.css";

function Header() {
  return (
    <Row id='header'>
      <Col sm={8}>
        <h1>North News</h1>
      </Col>
      <Col sm={4}>
        {" "}
        <p>username</p>
      </Col>
    </Row>
  );
}

export default Header;
