import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const useSearchUser = (search) => {
  const URL = import.meta.env.VITE_API_URL;
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchUserFunc = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${URL}/api/search-user`, { search });
      if (res?.data) {
        setSearchUser(res.data.data );
      } else {
        setSearchUser([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search) {
      searchUserFunc();
    } else {
      setSearchUser([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return { searchUser, loading };
};

export default useSearchUser;
