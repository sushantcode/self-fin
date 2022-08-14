import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import YearMonthPicker from "../../commons/YearMonthPicker";
import AddSavings from "./AddSavings";
import ListSavings from "./ListSavings";
import { tableNames } from "../../../utils/Constants";
import useLoadRecords from "../../commons/useLoadRecords";

const Savings = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [setLoadData, error, loading, tableVisibility, data] = useLoadRecords(
    tableNames.SAVING,
    date
  );

  const loadSavings = () => {
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
                  onClick={loadSavings}
                  disabled={loading}
                >
                  {tableVisibility ? "Hide Table" : "Load Savings"}
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
                {tableVisibility && <ListSavings savingsList={data} />}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <AddSavings />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Savings;
