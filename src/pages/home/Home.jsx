import { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import SideBar from "../../components/sidebar/SideBar";
import ChatContainer from "./ChatContainer";
import io from "socket.io-client";
import bgChat from "../../assets/backgroundchat.png";
import { useDispatch } from "react-redux";
import {
  logout,
  setOnlineUser,
  setSocketConnection,
  setUser,
} from "../../redux/AuthSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConversationNull from "../../components/emptyChat/EmptyChat";
import useWindowSize from "../../hooks/useWindowSize";

const Home = () => {
  const sizeWith=useWindowSize();
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectUser, setSelectUser] = useState({});
  const getUser = async () => {
    try {
      const URL = `${import.meta.env.VITE_API_URL}/api/user-details`;
      const response = await axios({
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response.data.data));

      if (response.data.data.logout) {
        dispatch(logout());
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_API_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });
    socketConnection.on("onlineUser", (res) => {
      dispatch(setOnlineUser(res));
    });
    dispatch(setSocketConnection(socketConnection));

    return () => {
      socketConnection.disconnect();
    };
  }, []);
  const [select, setSelect] = useState("chat");

  return (
    <div className="flex min-h-full rounded-ss-xl overflow-hidden max-w-[1390px] mx-auto ">
      <NavBar setSelect={setSelect} setSelectUser={setSelectUser}/>
      <div className="flex bg-white border-[1px]  border-black/5 mt-[38px]  w-full h-screen-64  rounded-ss-xl">
      {sizeWith <= 640 ? (
   !Object.keys(selectUser).length&& <SideBar select={select} setSelectUser={setSelectUser} />
) : (
  <SideBar select={select} setSelectUser={setSelectUser} />
)}
        <div
          className="h-full flex grow transitio-y-[1000px]"
          style={{
            backgroundImage: `url(${bgChat})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {!Object.values(selectUser).every((value) => !value) ? (
            <ChatContainer
              selectUser={selectUser}
              setSelectUser={setSelectUser}
            />
          ) : (
            <ConversationNull />
          )}
           
        </div>
      </div>
    </div>
  );
};

export default Home;
