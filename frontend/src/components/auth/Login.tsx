import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { handleUserLogin } from "../../reducers/UserReducer";
import { useNavigate } from "react-router-dom";
import store from "../../store";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  // Subcribing so we can redirect after successful login
  store.subscribe(() => {
    const { user } = store.getState();
    if (user) navigate("/");
  });

  function onLogin() {
    dispatch(handleUserLogin({ username, password }));
  }

  return (
    <div className="container">
      <div className="row ">
        <div className="col">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your data with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={onLogin}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
