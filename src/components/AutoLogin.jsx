import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const AutoLogin = () => {
  const navigate = useNavigate();
  const { login, setUserId, setUserName } = useAuth();
  const [user_name, setUsername] = useState("");
  const fetchLogin = async () => {
    try {
      const url =
        import.meta.env.VITE_DEVELOPMENT_BACKEND_URL ||
        import.meta.env.VITE_PRODUCTION_BACKEND_URL;
      // console.log("最終的なURLは?", url);
      const response = await fetch(url + "/", {
        credentials: "include",
      });
      const data = await response.json();
      // console.log("getMyId", data);

      if (response.ok) {
        // console.log("data[0].id ha? ", data[0].id);
        await setUserId(data[0].id);
        await setUserName(user_name);
        await login();
        await navigate("/items");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchAsync = async () => {
      await fetchLogin();
    };
    fetchAsync();
  }, [navigate]);

  return <div>AutoLogin</div>;
};
