import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { getAllTopics } from "../api.js";
import "../css/nav.css";

function NavBootstrape() {
  const [topics, setTopics] = new useState([
    {
      slug: "coding",
      description: "Code is love, code is life",
    },
  ]);

  useEffect(() => {
    getAllTopics().then((res) => {
      setTopics(res.data.topics);
    });
  });

  return (
    <Row id='nav'>
      <Navbar bg='light' expand='md'>
        <Container className='flex-column'>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              {topics.map((topic, index) => {
                return (
                  <Nav.Link key={index} herf={`#${topic.slug}`}>
                    {topic.slug}
                  </Nav.Link>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Row>
  );
}

export default NavBootstrape;
