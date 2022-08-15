import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import YearMonthPicker from "../../commons/YearMonthPicker";
import { tableNames } from "../../../utils/Constants";
import useLoadRecords from "../../commons/useLoadRecords";
import ListTransfer from "./ListTransfer";
import AddTransfer from "./AddTransfer";

const Home = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [setLoadData, error, loading, tableVisibility, data] = useLoadRecords(
    tableNames.HOME,
    date
  );

  const loadTransfers = () => {
    setLoadData(true);
  };

  return (
    <Row className="mt-4 mb-4">
      <Col>
        <Row className="mb-3">
          <Col>
            <Row className="mb-2">
              <Col className="">
                <YearMonthPicker
                  dateProps={[date, setDate]}
                  datePickerLabel="Year and Month"
                  minDate={new Date("2017-01-01")}
                />
                <Button
                  className="ms-3 mt-2"
                  onClick={loadTransfers}
                  disabled={loading}
                >
                  {tableVisibility ? "Hide Table" : "Load Tranfers"}
                </Button>
                {loading &&
                  <div className="ms-3 spinner-border" role="status" />}
              </Col>
            </Row>
            <Row>
              <Col>
                {error.length !== 0 &&
                  <span className="text-danger ms-2">
                    {error}
                  </span>}
                {tableVisibility && <ListTransfer transferList={data} />}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <AddTransfer />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
