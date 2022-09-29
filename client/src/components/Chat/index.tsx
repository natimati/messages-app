import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useQuery, useMutation } from '@tanstack/react-query'
import { getAllUsers, sendMessage } from "../../api";
import { Button, Container } from "react-bootstrap";

type User = { id: string; username: string };
interface Props {
  userId: string
}

function Chat(props: Props) {
  const [singleSelections, setSingleSelections] = useState<User[]>([]);
  const [title, setTitle] = useState("");
  const [messageBody, setMessageBody] = useState("");

  const { mutate, isLoading: isSendingMessages, error: messageSendError } = useMutation(({ senderId, recipientId, title, messageBody }: { senderId: string, recipientId: string, title: string, messageBody: string }) => {
    return sendMessage({
      senderId,
      recipientId,
      title,
      messageBody
    })
      .then(() => {
        setSingleSelections([]);
        setTitle("");
        setMessageBody("");
      })
  })
  const { isLoading, error, data } = useQuery<User[]>(['users'], () => getAllUsers())
  const users = data || [];

  const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => setTitle(event.target.value);
  const onMessageBodyChange: React.ChangeEventHandler<HTMLInputElement> = (event) => setMessageBody(event.target.value);

  const onSubmit: React.FormEventHandler = (event) => {
    event?.preventDefault();
    if (singleSelections[0] && title && messageBody) {
      mutate({
        senderId: props.userId,
        recipientId: singleSelections[0].id,
        title,
        messageBody
      });
    }
  };

  return (
    <Container>
      <Form.Label as="h1">Let's send your message</Form.Label>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>To</Form.Label>
          <Typeahead
            labelKey="username"
            id="users_list"
            onChange={(selected) => setSingleSelections(selected as User[])}
            options={users}
            placeholder="To"
            selected={singleSelections}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="title"
            placeholder="Title"
            onChange={onTitleChange}
            value={title}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Your message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={messageBody}
            onChange={onMessageBodyChange} />
        </Form.Group>
        <Button variant="primary" type="submit" >
          Send
        </Button>
      </Form>
    </Container>
  );
}

export default Chat;