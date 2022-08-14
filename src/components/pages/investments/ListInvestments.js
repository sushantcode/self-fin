import React from "react";
import { Table } from "react-bootstrap";

const ListInvestments = ({ investmentsList }) => {
  return investmentsList && investmentsList.item.length !== 0 ? (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.N.</th>
          <th>Broker</th>
          <th>Stock</th>
          <th>Amount ($) </th>
          <th>Units</th>
          <th>Date</th>
          <th>Vested?</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
        {investmentsList.item.map((element, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{element.broker}</td>
              <td>
                {element.stock +
                  (element.company.length !== 0
                    ? " (" + element.company + ")"
                    : "")}
              </td>
              <td>{element.date}</td>
              <td>{element.amount}</td>
              <td>{element.units}</td>
              <td>{element.vested}</td>
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

export default ListInvestments;
