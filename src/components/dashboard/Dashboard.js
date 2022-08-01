import {
  faCartPlus,
  faSackDollar,
  faUserGroup,
  faPiggyBank,
  faArrowTrendUp,
  faChartBar,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Container>
      <Row className="mb-4 mt-4">
        <Col className="border text-center">
          <Link to={"expense"}>
            <Button variant="outline-secondary" className="fw-bold fs-2 my-4">
              <FontAwesomeIcon icon={faCartPlus} className="pe-1" /> <br />
              Regular Expense
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col className="border mb-5">
          <Row>
            <Col className="text-center mt-5">
              <Link to={"income"}>
                <Button
                  variant="outline-secondary"
                  className="fw-bold fs-4 py-3"
                >
                  <div className="fs-1">
                    <FontAwesomeIcon icon={faSackDollar} />
                  </div>
                  <span className="fs-5">Add Income</span>
                </Button>
              </Link>
            </Col>
            <Col className="text-center mt-5">
              <Link to={"loan"}>
                <Button
                  variant="outline-secondary"
                  className="fw-bold fs-4 py-3"
                >
                  <div className="fs-1">
                    <FontAwesomeIcon icon={faUserGroup} />
                  </div>
                  <span className="fs-5">Loan to Friends</span>
                </Button>
              </Link>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col className="text-center mt-5">
              <Link to={"savings"}>
                <Button
                  variant="outline-secondary"
                  className="fw-bold fs-4 py-3"
                >
                  <div className="fs-1">
                    <FontAwesomeIcon icon={faPiggyBank} />
                  </div>
                  <span className="fs-5">Add Savings</span>
                </Button>
              </Link>
            </Col>
            <Col className="text-center mt-5">
              <Link to={"investments"}>
                <Button
                  variant="outline-secondary"
                  className="fw-bold fs-4 py-3"
                >
                  <div className="fs-1">
                    <FontAwesomeIcon icon={faArrowTrendUp} />
                  </div>
                  <span className="fs-5">Investments</span>
                </Button>
              </Link>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col className="text-center">
              <Link to={"home"}>
                <Button
                  variant="outline-secondary"
                  className="fw-bold fs-4 py-3"
                >
                  <div className="fs-1">
                    <FontAwesomeIcon icon={faMoneyBillTransfer} />
                  </div>
                  <span className="fs-5">Transfer Home</span>
                </Button>
              </Link>
            </Col>
            <Col className="text-center">
              <Link to={"report"}>
                <Button
                  variant="outline-secondary"
                  className="fw-bold fs-4 py-3"
                >
                  <div className="fs-1">
                    <FontAwesomeIcon icon={faChartBar} />
                  </div>
                  <span className="fs-5">Custom Report</span>
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
