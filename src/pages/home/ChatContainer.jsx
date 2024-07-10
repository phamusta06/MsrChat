/* eslint-disable react/prop-types */
import attachIcon from "../../assets/attach.png";
import UserCard from "../../components/userCard/UserCard";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import ChatMessage from "../../components/chatMessage/ChatMessage";

const ChatContainer = ({ selectUser, setSelectUser }) => {
  const [messages, setMessages] = useState([]);
  const messageInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const socketConnection = useSelector((state) => state?.user?.socketConnection);
  const user = useSelector((state) => state?.user);

   const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

   useEffect(() => {
    scrollToBottom();
  }, [messages]);

   useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", selectUser?._id);
      socketConnection.emit("seen", selectUser._id);

      socketConnection.on("message", (data) => {
        setMessages(data);
      });

      
    }
  }, [socketConnection, selectUser?._id, user]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setSelectUser({});
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    const messageText = messageInputRef.current.value.trim();
    if (socketConnection && messageText !== "") {
      socketConnection.emit("new message", {
        sender: user?._id,
        receiver: selectUser?._id,
        text: messageText,
        imageUrl: "",
        videoUrl: "",
        msgByUserId: user?._id,
      });

       messageInputRef.current.value = "";
    }
  };

  return (
    <div
      className="relative flex flex-col grow   mx-auto   "
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="flex items-center gap-2 px-7 bg-[#FEFEFE] h-16 -translate-y-[0.7px]">
        <UserCard profile_pic={selectUser.profile_pic} name={selectUser.name} id={selectUser._id} />
      </div>
      <div className="relative grow overflow-y-scroll px-4 overflow-scroll pt-4  scrollbar-thin  scrollbar-thumb-black/80   scrollbar-track-transparent">
        <div className="flex flex-col mb-4 gap-1  ">
          {messages.map((item, index) => (
            <div key={index}>
              <ChatMessage message={item.text} idMessage={item.msgByUserId} />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="relative flex bg-[#FEFEFE] h-12 p-3 border-t-[1px] border-black/5 translate-y-[0.5px]">
        <form className="flex w-full" onSubmit={handleSendMessage}>
          <button type="button" className="w-6 absolute">
            <img src={attachIcon} alt="Attach" />
          </button>
          <input
            type="text"
            ref={messageInputRef}
            placeholder="Type your message"
            className="h-auto overflow-y-scroll  w-full outline-none pl-9 "
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage(e);
            }}
          />
          <button type="submit" className="mx-2">
            <BsSend size={21} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;
