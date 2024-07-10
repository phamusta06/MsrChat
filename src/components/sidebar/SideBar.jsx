import SearchUser from "./SearchUser";
import Chat from "./Chat";

// eslint-disable-next-line react/prop-types
const SideBar = ({select,setSelectUser}) => {
  
  return (
    <div className="  h-screen-64 -translate-x-[1px] -translate-y-[1px] scale-x-[101%] overflow-hidden w-full sm:w-64 bg-[#FEFEFE] rounded-ss-xl border-[1px] border-black/5 ">
      {select==="user"?
        <SearchUser setSelectUser={setSelectUser}/>
      :<Chat setSelectUser={setSelectUser}/>}
    </div>
  );
};

export default SideBar;
