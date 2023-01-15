import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/UserReducer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);

  const dispatch = useDispatch();

  function onLogin() {
    dispatch(setUser(`${firstname}  ${lastname}`));
  }

  return (
    <div className="container">
      <div className="row ">
        <div className="col">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>FirstName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Firstname"
                onChange={(e) => setFirstname(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your data with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Lastname"
                onChange={(e) => setLastname(e.target.value)}
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
