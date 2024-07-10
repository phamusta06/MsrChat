import logo from "../../assets/logo.png";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { CiLogout } from "react-icons/ci";
import { logout } from "../../redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import userImg from "../../assets/user.png"

// eslint-disable-next-line react/prop-types
const NavBar = ({setSelect,setSelectUser}) => {
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const user=useSelector(state=>state.user);
  return (
    <div className="relative">
      <img src={logo} alt="logo" className="absolute w-36 scale-150 left-1 top-2" />
      <span className="absolute left-12 top-3 text-[0.7rem] font-semibold  ">MsrChat</span>

      <div className=" flex flex-col gap-1 overflow-hidden pt-44 w-10 items-center  container bg-transparent h-full  ">
        <button className=' hover:bg-white/60 hover:after:content-[""]  hover:after:bg-black hover:shadow-xl  px-2 py-1 '
        onClick={() => {
          setSelectUser({})
          setSelect("chat")          
        }
        }
        >
          <IoChatbubbleEllipsesOutline size={19} />
        </button>
        <button className=' hover:bg-white/60 hover:after:content-[""]  hover:after:bg-black hover:shadow-xl  px-2 py-1 '
        onClick={() => {setSelectUser({});setSelect("user")
    
          
        }
        }
        >
          <IoPersonAddOutline size={19} />
          
        </button>
       
        <span className="absolute flex flex-col items-center  space-y-7 bottom-5">
        <button onClick={() => {
          dispatch(logout())
          localStorage.removeItem('token');
          navigate('/login')



          
        }
        }>
        <CiLogout size={20}/>
        </button>
           <img src={`${user.profile_pic||userImg}`}   className=" w-9 h-9 object-cover mx-auto" /> 
          
        
        </span>
      </div>
    </div>
  );
};

export default NavBar;
