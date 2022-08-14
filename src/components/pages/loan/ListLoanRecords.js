import React from "react";
import { Table } from "react-bootstrap";

const ListLoanRecords = ({ loanList }) => {
  return loanList && loanList.item.length !== 0 ? (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.N.</th>
          <th>Person</th>
          <th>Date</th>
          <th>Amount ($) </th>
          <th>Payment Method</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
        {loanList.item.map((element, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{element.person}</td>
              <td>{element.date}</td>
              <td>{element.amount}</td>
              <td>{element.payment_method}</td>
              <td>{element.remarks}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  ) : (
    <p> No data found for this month</p>
  );
};

export default ListLoanRecords;
