import bcrypt from "bcryptjs";
import { decrypt, encrypt } from "./Encryption";

const passwordEncrypter = process.env.REACT_APP_PASSWORD_ENCRYPTER;

export const validatePassword = inputPassword => {
  const hasMatched = bcrypt.compareSync(
    inputPassword,
    "$2a$10$qw/ZFYix23ftY9YmYI4Sw.AFvWbrTmMk1y5Rpb97.swJLWJr9r7YW"
  );
  return hasMatched;
};

export const writePassword = password => {
  window.sessionStorage.setItem("name", encrypt(password, passwordEncrypter));
};

export const isAuthenticated = () => {
  if (getPassword() && validatePassword(getPassword())) return true;
  else return false;
};

export const getPassword = () => {
  const password = window.sessionStorage.getItem("name");
  if (password) return decrypt(password, passwordEncrypter);
  return null;
};

export const logout = () => {
  window.sessionStorage.clear();
};
