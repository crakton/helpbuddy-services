import { tokenDecode } from "./token_decode";
import Cookies from "js-cookie";

export const prepareHeaders = async (headers: Headers) => {
  headers.set("Authorization", `Bearer ${Cookies.get("token")}`);
  const jwt = tokenDecode();
  if (jwt.currentTime > jwt.exp!) {// token expires
  document.location.pathname = "/authentication"
    return headers
  } else {
    return headers;
  }
};
