import { GetCookie } from "../hooksAndFunctions/cookies";

const contactsRequests = async (body, method, id) => {
  fetch(`//localhost:5000/api/chet-app/contacts`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorizaton: `Bearer ${GetCookie("jwt")} `,
    },
    body: JSON.stringify({ ...body }),
  });
};

export const contactsRequestsId = async (body, method, id) => {
  fetch(`//localhost:5000/api/chet-app/contacts/${id}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorizaton: `Bearer ${GetCookie("jwt")} `,
    },
    body: JSON.stringify({ ...body }),
  });
};
export default contactsRequests;
