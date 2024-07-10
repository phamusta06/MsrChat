/* eslint-disable react/prop-types */
import { useState } from "react";
import useSearchUser from "../../hooks/useSearchUser";
import UserCard from "../userCard/UserCard";
 

const SearchUser = ({setSelectUser}) => {
  const [search, setSearch] = useState("");
  const { searchUser, loading } = useSearchUser(search);

  return (
    <div className="flex flex-col gap-5  overflow-hidden h-screen-64 mt-6 bg-[#FEFEFE] px-5 sm:px-0 w-full  sm:mx-auto sm:w-56">
      <div>
        <h1 className="font-bold text-2xl text-black/70">users</h1>
      </div>
      <div>
        <form className="  w-full">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-3 h-3 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              className="block w-full outline-none p-2 ps-10 text-sm text-gray-900 border border-gray-300/30 border-b-green-300 border-b-[2px] rounded-lg bg-[#FEFEFE]"
              placeholder="Search your friends"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            />
          </div>
        </form>
      </div>
      <div className="  w-full flex-grow overflow-scroll  scrollbar-thin  scrollbar-thumb-black/80   scrollbar-track-transparent  ">
        {loading ? (
          <div className="bg-black/5 w-full flex-grow">
            <div className="rounded-md p-4 max-w-sm w-full">
              <div className="animate-pulse flex space-x-2 mx-auto items-center h-full">
                <div className="rounded-full bg-transparent/30 h-12 w-12" />
                <div className="w-1/2">
                  <div className="h-4 bg-transparent/30 rounded" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          searchUser.map((item, index) => (
            <button key={index} onClick={() => {
             setSelectUser(item)
              
            }
            } className="hover:bg-slate-400/5 w-full rounded-xl">
              <UserCard
                profile_pic={item.profile_pic}
                name={item.name}
                id={item._id}
              />
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchUser;
