import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../redux/AuthSlice";
import { toast } from 'react-hot-toast';

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  const login = async ({ email, password }) => {
    setLoading(true);

    try {
      const res = await axios.post(`${URL}/api/login`, { email, password }, { withCredentials: true });
      if (res.data.success) {
        dispatch(setToken(res?.data?.token));
        localStorage.setItem("token", res?.data?.token);
        toast.success('Login successful!');
        navigate("/");
      } else {
        toast.error(res.data.message || 'Login failed!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
