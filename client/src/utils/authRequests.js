import { SetCookie } from "../hooksAndFunctions/cookies";

const authentication = async (body, url) => {
  const res = await fetch(`//localhost:5000/api/chet-app/uath/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body }),
  });
  const data = await res.json();
  SetCookie("jwt", data?.data.token);

  if (data.status === "success") {
    return data.status;
  }
};
export default authentication;
