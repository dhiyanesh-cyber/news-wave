import axios from "axios";
import React, { createContext, useState } from "react";

const startContext = createContext();

const StartEffect = () => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/getUser",{});
  }, []);

  return <div>StartEffect</div>;
};

export default StartEffect;
