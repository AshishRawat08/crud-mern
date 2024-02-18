import { commenReq } from "./ApiCall";
import { BASE_URL } from "./helper";

export const registerFunction = async (data, header) => {
  return await commenReq("POST", `${BASE_URL}/user/register`, data, header);
};

export const getAllUsersFunction = async (search,gender) => {
  return await commenReq(
    "GET",
    `${BASE_URL}/user/details?search=${search}&gender=${gender}`,
    ""
  );
};

export const getSingleUserFunction = async (id) => {
  return await commenReq("GET", `${BASE_URL}/user/${id}`, "");
};

export const editUserFunction = async (id, data, header) => {
  return await commenReq("PUT", `${BASE_URL}/user/edit/${id}`, data, header);
};
export const deleteUserFunction = async (id) => {
  return await commenReq("DELETE", `${BASE_URL}/user/delete/${id}`, {});
};
