import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { data } from "../../../Mock_data";
import { tableNames } from "../../../utils/Constants";
import useLoadRecords from "../../commons/useLoadRecords";
import YearMonthPicker from "../../commons/YearMonthPicker";
import AddInvestment from "./AddInvestment";
import ListInvestments from "./ListInvestments";

const Investments = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [setLoadData, error, loading, tableVisibility, data] = useLoadRecords(
    tableNames.INVESTMENTS,
    date
  );

  const loadinvestments = () => {
    setLoadData(true);
  };
  return (
    <Row className="mt-4 mb-4">
      <Col>
        <Row className="mb-3">
          <Col>
            <Row className="mb-2">
              <Col className="">
                <YearMonthPicker dateProps={[date, setDate]} />
                <Button
                  className="ms-3 mt-2"
                  onClick={loadinvestments}
                  disabled={loading}
                >
                  {tableVisibility ? "Hide Table" : "Load Investments"}
                </Button>
                {loading && (
                  <div className="ms-3 spinner-border" role="status"></div>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                {error.length !== 0 && (
                  <span className="text-danger ms-2">{error}</span>
                )}
                {tableVisibility && <ListInvestments investmentsList={data} />}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <AddInvestment />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Investments;
