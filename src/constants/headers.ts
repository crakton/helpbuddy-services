import Cookies from "js-cookie";

export const headers = {
  Authorization: "Bearer " + Cookies.get("token"),
};
