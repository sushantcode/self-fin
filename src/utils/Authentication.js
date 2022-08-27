import bcrypt from "bcryptjs";
import { decrypt, encrypt } from "./Encryption";

export const validatePassword = (inputPassword) => {
  const hasMatched = bcrypt.compareSync(
    inputPassword,
    "$2a$10$qw/ZFYix23ftY9YmYI4Sw.AFvWbrTmMk1y5Rpb97.swJLWJr9r7YW"
  );
  return hasMatched;
};

export const writePassword = (password) => {
  window.sessionStorage.setItem("name", encrypt(password));
};

export const isAuthenticated = () => {
  if (getPassword() && validatePassword(getPassword())) return true;
  else return false;
};

export const getPassword = () => {
  const password = window.sessionStorage.getItem("name");
  // const password = process.env.REACT_APP_PASSWORD;
  if (password) return decrypt(password);
  return null;
};

export const logout = () => {
  window.sessionStorage.clear();
};
