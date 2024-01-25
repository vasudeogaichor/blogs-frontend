import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { signupUser } from "../apis/users";
import { setLocaUser } from "../libs/localUserUtils";
import { useLocalStorage } from "../hooks/useLocalStorage";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [email, setEmail] = useState("");
  const [signupError, setSignupError] = useState(null);
  const [user, setUser] = useLocalStorage('user', null);

  const handleSignUp = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    setPasswordMatchError(false);
    const userDetails = { username, password, email };
    const signupResult = await signupUser(userDetails);

    if (signupResult?.Error) {
      setSignupError(signupResult.Error);
      setTimeout(() => {
        setSignupError(null);
      }, 3000);
    } else {
      setLocaUser(signupResult.data)
      setUser({
        userId: signupResult.data.userId,
        username: signupResult.data.username,
        email: signupResult.data.email,
      })
      navigate("/");
    }
  };

  return (
    <div className="d-flex align-items-top justify-content-center vh-100">
      <Form className="w-50">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {passwordMatchError && (
            <Form.Text className="text-danger">
              Passwords do not match
            </Form.Text>
          )}
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleSignUp}>
          Sign Up
        </Button>

        <p className="mt-2">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Log in here
          </span>
        </p>
        {signupError?.length && (
          <div className="alert alert-danger">{signupError}</div>
        )}
      </Form>
    </div>
  );
};

export default SignUpPage;
