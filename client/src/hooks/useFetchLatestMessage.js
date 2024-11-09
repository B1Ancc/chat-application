import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchLatestMessage = (chat) => {
  const { newMessage, notifications } = useContext(ChatContext);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      const response = await getRequest(`${baseUrl}/tin-nhan/${chat?._id}`);

      if (response.error) {
        return console.log(
          "Đã có lỗi xảy ra trong quá trình tải tin nhắn.",
          error
        );
      }

      const latestMessage = response[response?.length - 1];

      setLatestMessage(latestMessage);
    };
    getMessages();
  }, [newMessage, notifications]);

  return { latestMessage };
};
