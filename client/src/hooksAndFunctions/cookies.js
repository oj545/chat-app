import Cookies from "js-cookie";

export const GetCookie = (cookieName) => {
  const cookei = Cookies.get(cookieName);
  return cookei;
};

export const SetCookie = (cookieName, value) => {
  Cookies.set(cookieName, value, {
    expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
    secure: true,
  });
};

export const RemoveCookie = (cookieName) => {
  Cookies.remove(cookieName, { secure: true });
};
