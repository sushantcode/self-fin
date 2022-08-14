import React from "react";
import { Table } from "react-bootstrap";

const ListSavings = ({ savingsList }) => {
  return savingsList && savingsList.item.length !== 0 ? (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.N.</th>
          <th>Where</th>
          <th>Date</th>
          <th>Amount ($) </th>
          <th>Inerest (%)</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
        {savingsList.item.map((element, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{element.where}</td>
              <td>{element.date}</td>
              <td>{element.amount}</td>
              <td>{element.interest}</td>
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

export default ListSavings;
