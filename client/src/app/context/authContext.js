"use client";
import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // check token
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");

    if (data) {
      const parseData = JSON.parse(data);
      setAuth((prevAuth) => ({
        ...prevAuth,
        user: parseData?.user,
        token: parseData?.token,
      }));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// /-------------------------- Assistant Context--------------------------->

const AssistantContext = createContext();

const AssistantProvider = ({ children }) => {
  const [assistant, setAssistant] = useState({
    threadData: null,
  });
  const [active, setActive] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [userAnalytic, setUserAnalytics] = useState([]);
  const [assistAnalytic, setAssistAnalytics] = useState([]);
  const [filesAnalytic, setFilesAnalytics] = useState([]);
  const [leadAnalytic, setleadAnalytics] = useState([]);
  const [userLen, setUserLen] = useState("");
  const [totalAssistant, setTotalAssistant] = useState("");
  const [filesLen, setFilesLen] = useState("");
  const [leadLen, setLeadLen] = useState("");
  const [loadTotal, setLoadTotal] = useState(false);
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const threadData = localStorage.getItem("thread");
    if (threadData) {
      const parsedThreadData = JSON.parse(threadData);
      setAssistant({ ...assistant, threadData: parsedThreadData });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("color");
    if (data) {
      setColor(data);
    }
  }, [color]);

  // Get Logo
  const getLogo = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/layout/get-layout/Logo`
      );
      setLogo(data?.layoutData?.logo);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLogo();
  }, []);

  // Get User Data
  const userInfo = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/analytics/user-analytics`
      );
      setUserAnalytics(data?.users?.last12Months);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    userInfo();
    //  eslint-disable-next-line
  }, []);

  // 2-------------------------------Assistant Analytics--------->

  const assistantInfo = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/analytics/assistant-analytics`
      );
      setAssistAnalytics(data?.assistants?.last12Months);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    assistantInfo();
    //  eslint-disable-next-line
  }, []);

  // 3-------------------------------Files Analytics--------->
  const filesData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/analytics/files-analytics`
      );
      setFilesAnalytics(data?.files?.last12Months);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    filesData();
    //  eslint-disable-next-line
  }, []);

  // 4-------------------------------Leads Analytics--------->
  const leadData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/analytics/leads-analytics`
      );
      setleadAnalytics(data?.leadUsers?.last12Months);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    leadData();
    //  eslint-disable-next-line
  }, []);

  //
  // <------------------>Getting User Length<------------------>
  // {
  //   headers: {
  //     Authorization: `${auth?.token}`,
  //     "X-User-Role": auth?.user?.role,
  //   },
  // }

  const getAllUsers = async () => {
    setLoadTotal(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/users/all-users`
      );
      if (data?.success) {
        setUserLen(data?.users);
        setLoadTotal(false);
      }
    } catch (error) {
      console.log(error);
      setLoadTotal(false);
    }
  };
  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  // <-------------------->Getting Assistant Lenght<-------------------->

  // <-------------------->Getting Files Lenght<-------------------->

  // <-------------------->Getting Lead Lenght<-------------------->

  return (
    <AssistantContext.Provider
      value={{
        assistant,
        setAssistant,
        active,
        setActive,
        color,
        setColor,
        userAnalytic,
        loading,
        assistAnalytic,
        filesAnalytic,
        leadAnalytic,
        userLen,
        totalAssistant,
        filesLen,
        leadLen,
        loadTotal,
        logo,
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
};

const useAssistant = () => useContext(AssistantContext);

export { AuthProvider, useAuth, AssistantProvider, useAssistant };
