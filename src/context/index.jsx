import React, { createContext, useState, memo } from "react";
import { useLocalStorage } from "../hooks/useLocalSrorage";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();
const AppProvider = (props) => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const [adminRole, setAdminRole] = useLocalStorage("admin", null);
  const [user, setUser] = useLocalStorage("users", null);
  const navigate = useNavigate();

  const login = async (data) => {
    setUser(data);
    navigate("/", { replace: true }); 
  };
  const adminLoginToDashboard = async (data) => {
    setAdminRole(data);
    navigate("/dashboard", { replace: true });
  };

  const logout = () => {
    setAdminRole(null);
    navigate("/admin/login", { replace: true });
  };
  const userLogout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };



  return (
    <AppContext.Provider
      value={{
        userLogout,
        openDrawer,
        setOpenDrawer,
        user,
        login,
        logout,
        adminLoginToDashboard,
        adminRole
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default memo(AppProvider);