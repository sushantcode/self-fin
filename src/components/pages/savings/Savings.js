import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import YearMonthPicker from "../../commons/YearMonthPicker";
import AddSavings from "./AddSavings";
import { tableNames } from "../../../utils/Constants";
import useLoadRecords from "../../commons/useLoadRecords";
import SmartTable from "../../commons/SmartTable";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../utils/Authentication";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import Graphs from "../../commons/Graphs";

const headCells = [
  {
    id: "where",
    numeric: false,
    disablePadding: false,
    label: "Where"
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
    id: "interest",
    numeric: false,
    disablePadding: false,
    label: "Inerest (%)"
  },
  {
    id: "remarks",
    numeric: false,
    disablePadding: false,
    label: "Remarks"
  }
];

const Savings = () => {
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
                <YearMonthPicker
                  dateProps={[date, setDate]}
                  datePickerLabel="Year and Month"
                  minDate={new Date("2017-01-01")}
                />
                <Button
                  className="ms-3 mt-2"
                  onClick={loadSavings}
                  disabled={loading}
                >
                  {tableVisibility ? "Hide Table" : "Load Savings"}
                </Button>
                {loading &&
                  <div className="ms-3 spinner-border" role="status" />}
              </Col>
              <Col className="d-flex justify-content-end">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        disabled={
                          !tableVisibility ||
                          !(data && data.item && data.item.length)
                        }
                        onChange={() => setIsGraph(!isGraph)}
                      />
                    }
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
                  ((data && data.item && data.item.length) > 0
                    ? !isGraph
                      ? <SmartTable
                          tableHeaders={headCells}
                          data={data.item}
                          subject={tableNames.SAVING}
                          period={date}
                        />
                      : <Graphs data={data.item} />
                    : <span className="text-danger ms-2">
                        No records found for this month!!!
                      </span>)}
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
