import { GetCookie } from "../hooksAndFunctions/cookies";

const getMe = async () => {
  const res = await fetch(`//localhost:5000/api/chet-app/uath/`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      authorizaton: `Bearer ${GetCookie("jwt")}`,
    },
  });
  const data = await res.json();
  return data;
};
export default getMe;
