import { GetCookie } from "../hooksAndFunctions/cookies";

const goupsRequest = async (method, body) => {
  try {
    fetch(`//localhost:5000/api/chet-app/goups`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        authorizaton: `Bearer ${GetCookie("jwt")} `,
      },
      body: JSON.stringify({ ...body }),
    });
  } catch (err) {
    return "fail";
  }
};

export const goupsRequestId = async (body, method, id) => {
  try {
    const res = await fetch(`//localhost:5000/api/chet-app/goups/${id}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        authorizaton: `Bearer ${GetCookie("jwt")} `,
      },
      body: JSON.stringify({ ...body }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return "fail";
  }
};
export default goupsRequest;
