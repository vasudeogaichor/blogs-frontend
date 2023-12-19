import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { loginUser } from "../apis/users";

const LoginPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async () => {
    const userDetails = { username, password };
    const loginResult = await loginUser(userDetails);
    console.log('loginResult - ', loginResult)
    if (loginResult?.Error) {
      setLoginError(loginResult.Error);
      setTimeout(() => {
        setLoginError(null);
      }, 3000);
    } else {
      setIsAuthenticated(true);
      navigate("/");
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
          <span
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Sign up here
          </span>
        </p>
        {loginError?.length && (
          <div className="alert alert-danger">{loginError}</div>
        )}
      </Form>
    </div>
  );
};

export default LoginPage;
