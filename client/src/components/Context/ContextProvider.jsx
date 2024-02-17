import React, { createContext, useState } from "react";

export const addData = createContext();
export const updatedata = createContext();
export const deletedata = createContext();

const ContextProvider = ({ children }) => {
  const [useradd, setUseradd] = useState("");
  const [updateUser, setUpdateUser] = useState("");
  const [deleteUserdata, setDeleteUserdata] = useState("");

  return (
    <>
      <addData.Provider value={{ useradd, setUseradd }}>
        <updatedata.Provider value={{ updateUser, setUpdateUser }}>
          <deletedata.Provider value={{ deleteUserdata, setDeleteUserdata }}>
            {children}
          </deletedata.Provider>
        </updatedata.Provider>
      </addData.Provider>
    </>
  );
};

export default ContextProvider;
