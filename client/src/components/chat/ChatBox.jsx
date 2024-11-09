import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import InputEmoji from "react-input-emoji";
import sendIcon from "../../assets/send-fill.svg";
import moment from "moment";
import "moment/dist/locale/vi";
moment.locale("vi");

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && textMessage.trim() !== "") {
      e.preventDefault(); 
      sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
    }
  };

  console.log("text", textMessage);

  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        Ở đây vắng vẻ quá... Hãy chọn 1 đoạn chat bất kỳ nhé!
      </p>
    );

  if (isMessagesLoading)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        Đang tải đoạn chat...
      </p>
    );

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages &&
          messages.map((message, index) => (
            <Stack
              key={index}
              className={`${
                message?.senderId === user?._id
                  ? "message self align-self-end flex-grow-0"
                  : "message align-self-start flex-grow-0"
              }`}
            >
              <span>{message.text}</span>
              <span className="message-footer">
                {moment(message.createdAt).calendar()}
              </span>
            </Stack>
          ))}
      </Stack>
      <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="Montserrat"
          borderColor="rgba(72, 112, 22, 0.2)"
          language="vi"
          placeholder="Nhắn tin"
          onKeyDown={handleKeyDown}
        />
        <button
          className="send-btn"
          onClick={() =>
            sendTextMessage(textMessage, user, currentChat._id, setTextMessage)
          }
          tabIndex="0"
        >
          <img src={sendIcon} height="16px" background-color="white" />
        </button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
