import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import YearMonthPicker from "../../commons/YearMonthPicker";
import { tableNames } from "../../../utils/Constants";
import useLoadRecords from "../../commons/useLoadRecords";
import useGenerateReportData from "./useGenerateReportData";

const Report = () => {
  const [fromDate, setFromDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedDatesArr, setSelectedDatesArr] = useState([]);

  useEffect(
    () => {
      let dates = [];
      let from = new Date(fromDate);
      from.setDate(1);
      let to = new Date(toDate);
      to.setDate(1);
      while (from <= to) {
        dates.push(from.toISOString().split("T")[0]);
        from.setMonth(from.getMonth() + 1);
      }
      setSelectedDatesArr(dates);
    },
    [fromDate, toDate]
  );

  const [
    setLoadData,
    error,
    loading,
    tableVisibility,
    data
  ] = useGenerateReportData(selectedDatesArr);

  const generateReportData = () => {
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
                  dateProps={[fromDate, setFromDate]}
                  datePickerLabel="From"
                  minDate={new Date("2017-01-01")}
                />{" "}
                {" " + "-->" + " "}
                <YearMonthPicker
                  dateProps={[toDate, setToDate]}
                  datePickerLabel="To"
                  minDate={new Date(fromDate)}
                />
                <Button
                  className="ms-3 mt-2"
                  onClick={generateReportData}
                  // disabled={loading}
                >
                  xfxf
                  {/* {tableVisibility ? "Hide Table" : "Generate reports"} */}
                </Button>
                {/* {loading &&
                  <div className="ms-3 spinner-border" role="status" />} */}
              </Col>
            </Row>
            <Row>
              <Col>
                {/* {error.length !== 0 &&
                  <span className="text-danger ms-2">
                    {error}
                  </span>} */}
                {/* {tableVisibility && <ListTransfer transferList={data} />} */}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* <AddTransfer /> */}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Report;
