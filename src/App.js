import "./css/App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Article from "./components/Article";
import Articles from "./components/Articles";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Container className='App' fluid>
      <Header />
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/articles/:article_id' element={<Article />} />
        <Route path='/articles' element={<Articles />} />
      </Routes>
    </Container>
  );
}

export default App;
