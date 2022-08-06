import React from "react";
import { Table } from "react-bootstrap";

const ListExpense = ({ expenseList }) => {
  return expenseList ? (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.N.</th>
          <th>Category</th>
          <th>Date</th>
          <th>Location</th>
          <th>Amount {"($)"}</th>
          <th>Payment Method</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
        {expenseList.map((element, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{element.category}</td>
              <td>{element.date}</td>
              <td>{element.location}</td>
              <td>{element.amount}</td>
              <td>{element.payment_method}</td>
              <td>{element.remarks}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  ) : (
    <p> No expense found for this month</p>
  );
};

export default ListExpense;
