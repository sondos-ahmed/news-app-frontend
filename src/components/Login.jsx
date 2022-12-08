import { useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { searchUser } from "../api";

function Login() {
  const [username, setUsername] = useState("");
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  function handelUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handelLoginSubmit(event) {
    event.preventDefault();

    searchUser(username)
      .then((user) => {
        console.log(user);
        setUser(user);

        // This is to persist the logged in user after page reload
        localStorage.setItem("user", JSON.stringify(user));
        setUsername("");
        return user;
      })
      .then((user) => {
        if (user) {
          navigate("/");
        }
      });
  }

  return (
    <section className='mt-5'>
      <Card className='w-50 shadow p-6 m-auto bg-white rounded'>
        <Card.Title>Login Page</Card.Title>
        <Card.Body>
          <Form onSubmit={handelLoginSubmit}>
            <Form.Label htmlFor='login-username'>
              Enter your username
            </Form.Label>
            <br />
            <Form.Control
              id='login-username'
              value={username}
              onChange={handelUsernameChange}
            ></Form.Control>

            <br />
            <Button type='submit'>Log in</Button>
            <br />
          </Form>
        </Card.Body>
      </Card>
    </section>
  );
}

export default Login;
