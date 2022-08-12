import bcrypt from "bcryptjs";

export const isAuthenticated = () => {
  if (getPassword()) return true;
  else return false;
};

export const getPassword = () => {
  // const password = window.sessionStorage.getItem("key");
  const password = process.env.REACT_APP_PASSWORD;
  return password;
};

export const setPassword = (key) => {
  window.sessionStorage.setItem("key", key);
};

export const validatePassword = (inputPassword) => {
  console.log(process.env.REACT_APP_HASHEDPASSWORD);
  const hasMatched = bcrypt.compareSync(
    inputPassword,
    "$2a$10$qw/ZFYix23ftY9YmYI4Sw.AFvWbrTmMk1y5Rpb97.swJLWJr9r7YW"
  );
  console.log(hasMatched);
};
