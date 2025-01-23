import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export function tokenDecode() {
  const token = Cookies.get("token");
  const decoded = jwtDecode(token!);
  const currentTime = Date.now().valueOf() / 1000;
 return {
    ...decoded,
    currentTime,
 }
}
