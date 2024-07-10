import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "../userCard/UserCard";


// eslint-disable-next-line react/prop-types
const Chat = ({ setSelectUser }) => {
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const user = useSelector((state) => state.user);
  const [userConversation, setUserConversation] = useState([]);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("sidebar", user._id);

      socketConnection.on("conversation", (data) => {
        const conversationUserData = data.map((conversationUser) => {
          if (
            conversationUser?.sender?._id === conversationUser?.receiver?._id
          ) {
            return {
              ...conversationUser,
              userDetails: conversationUser?.sender,
            };
          } else if (conversationUser?.receiver?._id !== user?._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser.receiver,
            };
          } else {
            return {
              ...conversationUser,
              userDetails: conversationUser.sender,
            };
          }
        });

        setUserConversation(conversationUserData);
      });
    }
  }, [socketConnection, user]);
  return (
    <div className="flex flex-col gap-5 w-56 overflow-hidden mt-6 sm:mx-auto pl-5 sm:pl-0">
      <h1 className="font-bold text-2xl text-black/70">Chats</h1>
      <div className="w-full flex-grow h-screen pb-32 overflow-scroll scrollbar-thin scrollbar-thumb-black/80 scrollbar-track-transparent your-scroll-container">

        {userConversation.map((conversation, index) => (

          <button
            key={index}
            onClick={() => {
              const userSelected=conversation.userDetails

              setSelectUser(userSelected);


            }}
          >
            <UserCard
              profile_pic={conversation.userDetails.profile_pic}
              name={conversation.userDetails.name}
              message={conversation.lastMsg.text}
              id={conversation.receiver._id}
              msgByUserId={conversation.lastMsg.msgByUserId}
              seen={conversation.lastMsg.seen}

            />

          </button>


        ))}
      </div>
    </div>
  );
};

export default Chat;
