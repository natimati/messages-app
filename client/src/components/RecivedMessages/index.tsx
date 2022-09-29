import { useQuery } from '@tanstack/react-query'
import { getMessages } from "../../api";
import Accordion from 'react-bootstrap/Accordion';
import { Container } from "react-bootstrap";
import moment from "moment";

type Message = {
  id: string,
  title: string;
  messageBody: string,
  senderId: string,
  recipentId: string,
  createdAt: number,
  sender: { username: string }
}
interface Props {
  userId: string
};

function RecivedMessages(props: Props) {
  const { isLoading, error, data } = useQuery<Message[]>(['messages'], () => getMessages(props.userId), {
    refetchInterval: 5000,
  });

  const usersMessages = data || [];
  const wasCreated = (messageDate: number) => moment(messageDate).format('llll');

  const renderMessages = () => {
    return usersMessages.map(message => {
      return (
        <Accordion.Item eventKey={message.id} key={message.id}>
          <Accordion.Header>
            <div className='container'>
            <div className='d-flex align-items-center justify-content-between'>
                <span>From: {message.sender.username}</span>
              <span>{wasCreated(message.createdAt)}</span>
            </div>
              <div>Title: {message.title}</div>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            {message.messageBody}
          </Accordion.Body>
        </Accordion.Item>)
    });
  }

  return (
    <Container>
      <Accordion defaultActiveKey={usersMessages[0]?.id}>
        {renderMessages()}
      </Accordion>
    </Container>
  );
};

export default RecivedMessages;