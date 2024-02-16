import { commenReq } from "./ApiCall";
import { BASE_URL } from "./helper";

export const registerFunction = async (data, header) => {
  return await commenReq("POST", `${BASE_URL}/user/register`, data, header);
};

export const getAllUsersFunction = async () => {
  return await commenReq("GET", `${BASE_URL}/user/details`, "");
};

export const getSingleUserFunction = async (id) => {
  return await commenReq("GET", `${BASE_URL}/user/${id}`, "");
};
