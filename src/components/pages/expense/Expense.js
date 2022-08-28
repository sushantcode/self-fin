import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import YearMonthPicker from "../../commons/YearMonthPicker";
import AddExpense from "./AddExpense";
import { tableNames } from "../../../utils/Constants";
import useLoadRecords from "../../commons/useLoadRecords";
import SmartTable from "../../commons/SmartTable";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../utils/Authentication";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import Graphs from "../../commons/Graphs";

const headCells = [
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category"
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date"
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "Location"
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

const Expense = () => {
  let navigate = useNavigate();

  let authenticated = isAuthenticated();

  useEffect(
    () => {
      if (!authenticated) {
        navigate("/login");
      }
    },
    [authenticated, navigate]
  );

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isGraph, setIsGraph] = useState(false);

  const [setLoadData, error, loading, tableVisibility, data] = useLoadRecords(
    tableNames.EXPENSE,
    date
  );

  const loadExpenses = () => {
    setLoadData(true);
  };

  return (
    <Row className="mt-4 mb-4">
      <Col>
        <Row className="mb-3">
          <Col>
            <Row className="mb-2">
              <Col>
                <YearMonthPicker
                  dateProps={[date, setDate]}
                  datePickerLabel="Year and Month"
                  minDate={new Date("2017-01-01")}
                />
                <Button
                  className="ms-3 mt-2"
                  onClick={loadExpenses}
                  disabled={loading}
                >
                  {tableVisibility ? "Hide Table" : "Load Expenses"}
                </Button>
                {loading &&
                  <div className="ms-3 spinner-border" role="status" />}
              </Col>
              <Col className="d-flex justify-content-end">
                <FormGroup>
                  <FormControlLabel
                    control={<Switch onChange={() => setIsGraph(!isGraph)} />}
                    label="Graph"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                {error.length !== 0 &&
                  <span className="text-danger ms-2">
                    {error}
                  </span>}
                {tableVisibility &&
                  (!isGraph
                    ? <SmartTable
                        tableHeaders={headCells}
                        data={data.item}
                        subject={tableNames.EXPENSE}
                        period={date}
                      />
                    : <Graphs data={data.item} />)}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <AddExpense />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Expense;
