import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { data } from "../../../Mock_data";
import { tableNames } from "../../../utils/Constants";
import SmartTable from "../../commons/SmartTable";
import useLoadRecords from "../../commons/useLoadRecords";
import YearMonthPicker from "../../commons/YearMonthPicker";
import AddIncome from "./AddIncome";

const headCells = [
  {
    id: "source",
    numeric: false,
    disablePadding: false,
    label: "Source"
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date"
  },
  {
    id: "amount",
    numeric: false,
    disablePadding: false,
    label: "Amount ($)"
  },
  {
    id: "payment_method",
    numeric: false,
    disablePadding: false,
    label: "Payment Method"
  },
  {
    id: "remarks",
    numeric: false,
    disablePadding: false,
    label: "Remarks"
  }
];

const Income = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [setLoadData, error, loading, tableVisibility, data] = useLoadRecords(
    tableNames.INCOME,
    date
  );

  const loadIncomes = () => {
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
                  onClick={loadIncomes}
                  disabled={loading}
                >
                  {tableVisibility ? "Hide Table" : "Load Incomes"}
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
                {tableVisibility &&
                  <SmartTable tableHeaders={headCells} data={data.item} />}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <AddIncome />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Income;
