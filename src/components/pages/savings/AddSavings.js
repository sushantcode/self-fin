import {
  faBank,
  faCalendar,
  faChartLine,
  faCircleInfo,
  faDollar,
  faUndo,
  faUpload
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  InputGroup
} from "react-bootstrap";
import { tableNames } from "../../../utils/Constants";
import useUploadRecord from "../../commons/useUploadRecord";

const AddSavings = () => {
  const [where, setWhere] = useState("");
  const [date, setDate] = useState(
    DateUtil.getLocalDateInISOFormat(new Date().toLocaleDateString)
  );
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("Chase Direct-Deposit");
  const [remarks, setRemarks] = useState("");
  const [newSaving, setNewSaving] = useState(null);

  const [setAddData, error, uploading] = useUploadRecord(
    tableNames.SAVING,
    newSaving
  );

  useEffect(
    () => {
      if (newSaving !== null) {
        setAddData(true);
      } else {
        setAddData(false);
      }
    },
    [newSaving]
  );

  const resetForm = () => {
    setWhere("");
    setDate(DateUtil.getLocalDateInISOFormat(new Date().toLocaleDateString));
    setAmount("");
    setInterest("Discover");
    setRemarks("");
  };

  const onSubmit = e => {
    e.preventDefault();
    const newItem = {
      where: where,
      date: date,
      amount: amount,
      interest: interest,
      remarks: remarks
    };
    setNewSaving(newItem);
    resetForm();
  };
  return (
    <div>
      <Card>
        <Card.Header className="text-center fs-4">
          Enter details of the saving?
        </Card.Header>
        <Card.Body>
          <Form className="mt-3">
            <Form.Group as={Col} className="mb-3">
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faBank} className="me-2" /> Where
                </InputGroup.Text>
                <FormControl
                  required
                  autoComplete="off"
                  type="text"
                  name="where"
                  value={where}
                  onChange={e => setWhere(e.target.value)}
                  placeholder="Sanima, John Doe, etc."
                />
              </InputGroup>
              {where.length === 0 &&
                <Form.Text className="ms-2" muted>
                  <span className="text-danger">
                    *Must eneter where invested
                  </span>
                </Form.Text>}
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faCalendar} className="me-2" /> Date
                </InputGroup.Text>
                <FormControl
                  required
                  autoComplete="off"
                  aria-describedby="date"
                  type="date"
                  name="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faDollar} className="me-2" /> Amount
                </InputGroup.Text>
                <FormControl
                  required
                  autoComplete="off"
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="Amount"
                />
              </InputGroup>
              {amount.length === 0 &&
                <Form.Text className="ms-2" muted>
                  <span className="text-danger">*Must eneter amount</span>
                </Form.Text>}
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faChartLine} className="me-2" />{" "}
                  Interest Rate (%)
                </InputGroup.Text>
                <FormControl
                  required
                  autoComplete="off"
                  type="number"
                  name="interest"
                  value={interest}
                  onChange={e => setInterest(e.target.value)}
                  placeholder="0 %"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faCircleInfo} className="me-2" />{" "}
                  Remarks
                </InputGroup.Text>
                <FormControl
                  required
                  autoComplete="off"
                  type="text"
                  name="remarks"
                  value={remarks}
                  onChange={e => setRemarks(e.target.value)}
                  placeholder="Remarks"
                />
              </InputGroup>
            </Form.Group>
            <input type="submit" style={{ display: "none" }} disabled />
          </Form>
        </Card.Body>
        <Card.Footer className="py-3" style={{ textAlign: "right" }}>
          {uploading && <div className="me-3 spinner-border" role="status" />}
          <Button
            className="me-3"
            size="sm"
            type="button"
            variant="success"
            onClick={e => onSubmit(e)}
            disabled={where.length === 0 || amount.length === 0 || uploading}
          >
            <FontAwesomeIcon icon={faUpload} /> Submit
          </Button>
          <Button
            size="sm"
            type="button"
            variant="info"
            onClick={() => resetForm()}
            disabled={
              where.length === 0 && amount.length === 0 && remarks.length === 0
            }
          >
            <FontAwesomeIcon icon={faUndo} /> Reset
          </Button>
        </Card.Footer>
      </Card>
      {error.length !== 0 &&
        <div className="row text-center">
          <div className="col">
            <Form.Text className="mt-4" muted>
              <span className="text-danger">
                {error}
              </span>
            </Form.Text>
          </div>
        </div>}
    </div>
  );
};

export default AddSavings;
