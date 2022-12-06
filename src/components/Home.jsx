import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "../css/home.css";
import Main from "./Main";
import Sports from "./Sports";
import Cooking from "./Cooking";
import Footer from "./Footer";

function Home() {
  return (
    <Container className='home'>
      <Row id='main'>
        <Main />
      </Row>
      <Row id='football'>
        <Sports />
      </Row>
      <Row id='cooking'>
        {" "}
        <Cooking />
      </Row>
      <Row id='footer'>
        <Footer />
      </Row>
    </Container>
  );
}

export default Home;
