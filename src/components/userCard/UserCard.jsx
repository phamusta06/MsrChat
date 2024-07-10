import { useSelector } from "react-redux";
import userImg from "../../assets/user.png";
 import doubleCheck from "../../assets/double-check.png";
 import correct from "../../assets/correct.png";
import { useEffect,  useState } from "react";
 
const UserCard = (params) => {
   const userOnline=useSelector(state=>state?.user?.onlineUser)
  const user=useSelector(state=>state?.user)
  const[seen,setSeen]=useState(params.seen)

  useEffect(() => {
    setSeen(params.seen);
  }, [params.seen]);
 
  const isOnline=userOnline.includes(params.id)
   return (
    <div className="flex items-center gap-2 p-3  rounded-md  cursor-pointer">
      <div className="relative">
        <div className=""> <img
          src={params.profile_pic ? params.profile_pic : userImg}
          
          className="w-12 h-12   rounded-full "
        />
        </div>
       
     
        {isOnline &&(
          <span className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-[2px] border-white" />
        )  }
      </div>

      <div className="space-y-1">
        <p className="font-semibold text-sm text-start">{params?.name&&params.name===user.name?"you": params.name}</p>
        <p className="flex gap-1 text-black/60 text-sm text-start  ">
    
          {params.message&&user._id===params.msgByUserId&&params.name!==user.name&&
          
         
       <img src={seen?doubleCheck:correct} className="w-4" />
    }
          {params.message&&params.message.length > 12
            ? params.message.substring(0, 12) + "..."
            : params.message}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
