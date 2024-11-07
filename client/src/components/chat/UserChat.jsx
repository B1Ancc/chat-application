import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/person-circle.svg"

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
    >
        <div className="d-flex">
            <div className="me-2">
                <img src={avatar} height="35px" background-color="white"/>
            </div>
            <div className="text-content">
                <div className="name">{recipientUser?.name}</div>
                <div className="text">Tin nhắn</div>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end">
            <div className="date">8/11/2024</div>
            <div className="this-user-notifications">2</div>
            <span className="user-online"></span>
        </div>
    </Stack>
  );
};

export default UserChat;
