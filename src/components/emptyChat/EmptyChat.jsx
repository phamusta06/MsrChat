 const EmptyChat = () => {
  return (
    <div className=" relative flex flex-1 overflow-hidden ">
     
      <span className="absolute bg-slate-500/70 text-white text-sm font-semibold tracking-wider p-1 rounded-full px-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        select a chat to start messaging
      </span>
    </div>
  );
};

export default EmptyChat;
