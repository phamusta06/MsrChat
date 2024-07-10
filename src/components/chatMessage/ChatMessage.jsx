/* eslint-disable react/prop-types */

import { useSelector } from "react-redux"

const ChatMessage = ({ message, idMessage }) => {
     const user = useSelector((state) => state.user);

  

    return (
        idMessage === user?._id ? (
            <div className="flex justify-end">
                <div className="bg-[#D9FDD3] rounded-lg
                 px-4  py-2 max-w-[80%]">
                    <p className="text-black text-m">{message}</p>
                </div>
            </div>
        ) : (
            <div className="flex justify-start">
                <div className="bg-white rounded-lg px-4 py-2 max-w-[80%]">
                    <p className="text-black text-m">{message}</p>
                </div>
            </div>
        )
    );
}

export default ChatMessage;
