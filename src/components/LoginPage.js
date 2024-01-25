import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { setLocaUser } from "../libs/localUserUtils";
import { loginUser } from "../apis/users";
import { useAuth } from "../AuthContext"

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async () => {
    const userDetails = { username, password };
    const loginResult = await loginUser(userDetails);
    if (loginResult?.Error) {
      setLoginError(loginResult.Error);
      setTimeout(() => {
        setLoginError(null);
      }, 3000);
    } else {
      setLocaUser(loginResult.data)
      login(loginResult.data)
      navigate("/");
    }
  };

  return (
    <div className="d-flex align-items-top justify-content-center vh-100">
      <Form className="w-50">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
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
