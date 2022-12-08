import "./css/App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Article from "./components/Article/Article";
import Articles from "./components/Articles";
import { UserContext } from "./contexts/User";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import { useEffect, useContext } from "react";

function App() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

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
