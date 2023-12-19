import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import NavLink from 'react-bootstrap/NavLink'
import Form from "react-bootstrap/Form";

const LoginPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // In a real application, you'd perform server-side authentication here
    // For simplicity, we'll use a basic check in this example
    if (
      username === process.env.REACT_APP_USERNAME &&
      password === process.env.REACT_APP_PASSWORD
    ) {
      setIsAuthenticated(true);
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="d-flex align-items-top justify-content-center vh-100">
      <Form className="w-50">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username (admin)</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password (password)</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="button" onClick={handleLogin}>
          Submit
        </Button>
        <p className="mt-2">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} style={{ cursor: "pointer", color: "blue" }}>
            Sign up here
          </span>
        </p>
      </Form>
    </div>
  );
};

export default LoginPage;
