import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { login } from "../../api";

interface Props {
  setUserId: (userId: string) => void,
}

function Login(props: Props) {
  const [username, setUsername] = useState('');

  const onUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUsername(event.target.value);
  };

  const onSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    const loginResault = await login({ username })
    if (!loginResault) {
      alert('something go wrong')
    } else {
      props.setUserId(loginResault.id);
    }
  }

  return (
    <Container>
      <Card className="mt-5">
        <Card.Header as="h1">Login</Card.Header>
        <Card.Body>
          <Form className="w-100" onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter name"
                onChange={onUsernameChange}
                value={username}
              />
            </Form.Group>
            <Button
              className="d-inline-flex gap-1"
              variant="primary"
              type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
};

export default Login;