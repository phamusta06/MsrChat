import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const useSignUp = () => {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  const signup = async ({ name, email, password, profile_pic }) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${URL}/api/register`,
        {
          name,
          email,
          password,
          profile_pic,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Account created successfully!");
        navigate("/login");
      } else {
        toast.error("Failed to create account.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignUp;
