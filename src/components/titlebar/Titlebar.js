import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { faRefresh, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { logout } from "../../utils/Authentication";

const Titlebar = () => {
  let navigate = useNavigate();
  const location = useLocation();

  const [currPath, setCurrPath] = useState("Dashboard");

  function getPathName(path) {
    switch (path) {
      case "/":
        return "Dashboard";

      case "/login":
        return "Login";

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

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          <img src="assets/logo.png" alt="logo" style={{ maxHeight: 75 }} />
        </Link>
        <div className="row d-flex">
          <div className="col justify-content-center text-light">
            {window.innerWidth < 760 && (
              <FontAwesomeIcon
                onClick={() => window.location.reload()}
                icon={faRefresh}
                className="me-3 fs-4"
              />
            )}
            {currPath}
            {location.pathname === "/login" && (
              <Button
                className="ms-3"
                variant="contained"
                color="error"
                onClick={onLogout}
              >
                <FontAwesomeIcon icon={faSignOut} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Titlebar;
