import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Titlebar = () => {
  const location = useLocation();

  const [currPath, setCurrPath] = useState("Dashboard");

  function getPathName(path) {
    switch (path) {
      case "/":
        return "Dashboard";

      case "/expense":
        return "Regular Expense";

      case "/income":
        return "Add Income";

      case "/loan":
        return "Loan to Friends";

      case "/savings":
        return "Add Savings";

      case "/investments":
        return "Investments";

      case "/home":
        return "Transfer Home";

      case "/report":
        return "Custom Report";

      default:
        return "Unknown Path";
    }
  }

  useEffect(() => {
    // eslint-disable-next-line
    let isMounted = true;

    setCurrPath(getPathName(location.pathname));

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          <img src="assets/logo.png" alt="logo" style={{ maxHeight: 75 }} />
        </Link>
        <div className="row d-flex">
          <div className="col justify-content-center text-light">
            {currPath}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Titlebar;
