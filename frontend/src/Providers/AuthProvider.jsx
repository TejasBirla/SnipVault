import { AuthContext } from "./AuthContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../components/utility/Toast.jsx";
import { useEffect, useState } from "react";

const backendUrl = import.meta.env.VITE_SNIPVAULT_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastStatus, setToastStatus] = useState(false);
  const [userSnippets, setUserSnippets] = useState([]);
  const [othersSnippets, setOthersSnippets] = useState([]);
  const [seeSnippet, setSeeSnippet] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setAuthUser(JSON.parse(storedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const registerUser = async (registerData) => {
    try {
      const { data } = await axios.post("/api/user/register", registerData);
      if (data.success) {
        setAuthUser(data.user);
        localStorage.setItem("authUser", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Error in register user: ", error);
      setToastMsg(error?.response?.data?.message || "Something went wrong");
      setShowToast(true);
      setToastStatus(false);
    }
  };

  const loginUser = async (loginData) => {
    try {
      const { data } = await axios.post("/api/user/login", loginData);
      if (data.success) {
        setAuthUser(data.user);
        localStorage.setItem("authUser", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Error in login user: ", error);
      setToastMsg(error?.response?.data?.message || "Something went wrong");
      setShowToast(true);
      setToastStatus(false);
    }
  };

  const logoutUser = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("authUser");
      setAuthUser(null);
      setSeeSnippet(null);
      setUserSnippets([]);
      delete axios.defaults.headers.common["Authorization"];
      setToastMsg("Logout successfull");
      setToastStatus(true);
      setShowToast(true);
    } catch (error) {
      console.log("Error in logout: ", error);
      setToastMsg("Logout failed. Try again later");
      setToastStatus(false);
      setShowToast(true);
    }
  };

  const mySnippets = async () => {
    try {
      const { data } = await axios.get("/api/user/snippets");
      if (data.success) {
        setUserSnippets(data.snippet);
        setShowToast(true);
        setToastMsg(data.message);
        setToastStatus(true);
      }
    } catch (error) {
      console.log("Error in mysnippets: ", error);
      setShowToast(true);
      setToastMsg(error?.response?.data?.message || "Something went wrong");
      setToastStatus(false);
    }
  };

  const createSnippet = async (newSnipData) => {
    try {
      const { data } = await axios.post("/api/snippets/create", newSnipData);
      if (data.success) {
        setToastMsg(data.message);
        setShowToast(true);
        setToastStatus(true);
        setTimeout(() => {
          navigate("/my-snippets");
        }, 1500);
      }
    } catch (error) {
      console.log("Error occur in creating new snip: ", error);
      setShowToast(true);
      setToastMsg(error?.response?.data?.message || "Something went wrong");
      setToastStatus(false);
    }
  };

  const viewSnippet = async (snipId) => {
    try {
      setSeeSnippet(null);
      const { data } = await axios.get(`/api/snippets/view/${snipId}`);
      if (data.success) {
        setSeeSnippet(data.snippet);
      }
    } catch (error) {
      console.log("Error in view snippet: ", error);
      setToastMsg(error?.response?.data?.message || "Something went wrong");
      setShowToast(true);
      setToastStatus(false);
    }
  };

  const deleteCurrentSnippet = async (snipId) => {
    try {
      const { data } = await axios.delete(`/api/snippets/delete/${snipId}`);
      if (data.success) {
        setShowToast(true);
        setToastMsg(data.message);
        setToastStatus(true);
      }
    } catch (error) {
      console.log("Error occur in delete current snip: ", error);
      setToastMsg(error?.response?.data?.message || "Something went wrong");
      setShowToast(true);
      setToastStatus(false);
    }
  };

  const editSnippet = async (snipId, editDetails) => {
    try {
      const { data } = await axios.patch(
        `/api/snippets/edit/${snipId}`,
        editDetails
      );
      if (data.success) {
        setToastStatus(true);
        setShowToast(true);
        setToastMsg(data.message);
      }
    } catch (error) {
      console.log("Error in edit snippet: ", error);
      setToastStatus(false);
      setShowToast(true);
      setToastMsg(error?.response?.data?.message);
    }
  };

  const exploreSnippets = async () => {
    try {
      const { data } = await axios.get("/api/snippets/explore");
      if (data.success) {
        setOthersSnippets(data.allSnips);
      }
    } catch (error) {
      console.log("Error in explore snippet: ", error);
      setToastStatus(false);
      setShowToast(true);
      setToastMsg(error?.response?.data?.message);
    }
  };

  const likeToggle = async (snipId) => {
    try {
      const { data } = await axios.put(`/api/snippets/like/${snipId}`);
      return { liked: data.liked, likeCount: data.likeCount };
    } catch (error) {
      console.log("Error in like toggle: ", error);
      return null;
    }
  };

  const showToastMsg = (message, status) => {
    setToastMsg(message);
    setToastStatus(status); // true = success, false = error
    setShowToast(true);
  };

  const value = {
    registerUser,
    loginUser,
    logoutUser,
    authUser,
    userSnippets,
    mySnippets,
    createSnippet,
    showToastMsg,
    viewSnippet,
    seeSnippet,
    deleteCurrentSnippet,
    editSnippet,
    exploreSnippets,
    othersSnippets,
    likeToggle,
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
      <Toast
        message={toastMsg}
        status={toastStatus}
        show={showToast}
        setShow={setShowToast}
      />
    </AuthContext.Provider>
  );
};
