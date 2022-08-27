import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
  Alert,
  Container,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faLock, faUndo } from "@fortawesome/free-solid-svg-icons";
import {
  isAuthenticated,
  validatePassword,
  writePassword,
} from "../../utils/Authentication";

const Login = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [show, setShow] = useState(true);

  const validateCredentials = () => {
    try {
      if (validatePassword(password)) {
        writePassword(password);
        resetLoginForm();
        navigate("/");
      } else {
        setError("Invalid credential, try again!!!");
        setShow(true);
        resetLoginForm();
      }
    } catch (err) {
      setError(err.message);
      setShow(true);
      resetLoginForm();
    }
  };

  const resetLoginForm = () => {
    setPassword("");
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={5}>
          {show && error && (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              {error}
            </Alert>
          )}
          <Card className={"border border-dark"}>
            <Card.Header className="text-center fs-4">
              Provide credential
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroup.Text>
                    <FormControl
                      required
                      autoComplete="off"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                    />
                  </InputGroup>
                </Form.Group>
                <input type="submit" style={{ display: "none" }} disabled />
              </Form>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button
                className="me-3"
                size="sm"
                type="submit"
                variant="success"
                onClick={validateCredentials}
                disabled={password.length === 0}
              >
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </Button>
              <Button
                size="sm"
                type="button"
                variant="info"
                onClick={resetLoginForm}
                disabled={password.length === 0}
              >
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
