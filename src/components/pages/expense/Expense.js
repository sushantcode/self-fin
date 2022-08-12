import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { data } from "../../../Mock_data";
import YearMonthPicker from "../../commons/YearMonthPicker";
import { getData } from "../../../utils/DDBClients";
import { decrypt } from "../../../utils/Encryption";
import AddExpense from "./AddExpense";
import ListExpense from "./ListExpense";
import { getPassword } from "../../../utils/Authentication";
import { tableNames } from "../../../utils/Constants";

const Expense = () => {
  const [expenseList, setExpenseList] = useState(null);
  const [visibleExpenseList, setVisibleExpenseList] = useState(false);
  const [yearMonth, setYearMonth] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [pollingError, setPollingError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadExpenses = () => {
    // TODO: Remove these two lines
    // setExpenseList(data.expense);
    // setVisibleExpenseList(!visibleExpenseList);

    if (visibleExpenseList) {
      setVisibleExpenseList(!visibleExpenseList);
      return;
    } else if (
      expenseList &&
      expenseList[0].date.substring(0, 7) === yearMonth.substring(0, 7)
    ) {
      setVisibleExpenseList(!visibleExpenseList);
      return;
    }
    setPollingError("");
    setLoading(true);
    getData(tableNames.EXPENSE, yearMonth)
      .then((response) => {
        handleResponse(response);
        setVisibleExpenseList(!visibleExpenseList);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setPollingError("Error occured while polling data!!!");
        setLoading(false);
      });
  };

  const handleResponse = (response) => {
    console.log(response.Count + " items retrieved.");
    if (response.Count > 0) {
      const decryptedData = decrypt(response.Items[0].item, getPassword());
      setExpenseList(decryptedData);
    } else {
      setExpenseList(null);
    }
  };

  return (
    <Row className="mt-4 mb-4">
      <Col>
        <Row className="mb-3">
          <Col>
            <Row className="mb-2">
              <Col className="">
                <YearMonthPicker dateProps={[yearMonth, setYearMonth]} />
                <Button
                  className="ms-3 mt-2"
                  onClick={loadExpenses}
                  disabled={loading}
                >
                  {visibleExpenseList ? "Hide Expense Tab" : "Load Expenses"}
                </Button>
                {loading && (
                  <div className="ms-3 spinner-border" role="status"></div>
                )}
                {pollingError.length !== 0 && (
                  <span className="text-danger ms-2">{pollingError}</span>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                {visibleExpenseList && (
                  <ListExpense expenseList={expenseList} />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <AddExpense expenseState={[expenseList, setExpenseList]} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Expense;
