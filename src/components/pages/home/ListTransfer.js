import React from "react";
import { Table } from "react-bootstrap";

const ListTransfer = ({ transferList }) => {
  return transferList && transferList.item.length !== 0
    ? <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Service</th>
            <th>Receiver</th>
            <th>Date</th>
            <th>USD ($)</th>
            <th>NRS.</th>
            <th>Payment Method</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {transferList.item.map((element, index) => {
            return (
              <tr key={index}>
                <td>
                  {index + 1}
                </td>
                <td>
                  {element.service}
                </td>
                <td>
                  {element.receiver}
                </td>
                <td>
                  {element.date}
                </td>
                <td>
                  {element.usd}
                </td>
                <td>
                  {element.nrs}
                </td>
                <td>
                  {element.payment_method}
                </td>
                <td>
                  {element.remarks}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    : <p> No record found for this month</p>;
};

export default ListTransfer;
