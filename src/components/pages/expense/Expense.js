import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { data } from "../../../Mock_data";
import AddExpense from "./AddExpense";
import ListExpense from "./ListExpense";

const Expense = () => {
  const [expenseList, setExpenseList] = useState(null);
  const [visibleExpenseList, setVisibleExpenseList] = useState(false);

  useEffect(() => {
    setExpenseList(data.expense);

    return () => {
      setExpenseList(null);
    };
  }, []);
  return (
    <Row className="mt-2 mb-4">
      <Col>
        <Row className="mb-3">
          <Col>
            <Button
              className="mb-2"
              onClick={() => setVisibleExpenseList(!visibleExpenseList)}
            >
              {visibleExpenseList ? "Hide Expense List" : "Show ExpenseList"}
            </Button>
            {visibleExpenseList && <ListExpense expenseList={expenseList} />}
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
