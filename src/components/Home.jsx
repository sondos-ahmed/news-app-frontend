import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "../css/home.css";
import Main from "./Main";
import Sports from "./Sports";
import Cooking from "./Cooking";
import Footer from "./Footer";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";

function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <Container className='home'>
      <Row id='main'>
        <Main setLoading={setLoading} loading={loading} />
      </Row>
      <Row id='football'>
        <Sports setLoading={setLoading} loading={loading} />
      </Row>
      <Row id='cooking'>
        {" "}
        <Cooking setLoading={setLoading} loading={loading} />
      </Row>
      <Row id='footer'>
        <Footer />
      </Row>
    </Container>
  );
}

export default Home;
