import {
  faBank,
  faCalendar,
  faCircleInfo,
  faDollar,
  faUndo,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { tableNames } from "../../../utils/Constants";
import useUploadRecord from "../../commons/useUploadRecord";

const AddIncome = () => {
  const [source, setSource] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Chase Direct-Deposit");
  const [remarks, setRemarks] = useState("");
  const [newIncome, setNewIncome] = useState(null);

  const [setAddData, error, uploading] = useUploadRecord(
    tableNames.INCOME,
    newIncome
  );

  useEffect(() => {
    if (newIncome !== null) {
      setAddData(true);
    } else {
      setAddData(false);
    }
  }, [newIncome]);

  const resetForm = () => {
    setSource("");
    setDate(new Date().toISOString().split("T")[0]);
    setAmount("");
    setPaymentMethod("Discover");
    setRemarks("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      source: source,
      date: date,
      amount: amount,
      payment_method: paymentMethod,
      remarks: remarks,
    };
    setNewIncome(newItem);
    resetForm();
  };
  return (
    <div>
      <Card>
        <Card.Header className="text-center fs-4">
          Enter details of the income?
        </Card.Header>
        <Card.Body>
          <Form className="mt-3">
            <Form.Group as={Col} className="mb-3">
              <InputGroup>
                <Dropdown>
                  <Dropdown.Toggle className="dropdown_headers">
                    Select Source of Income
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {["Salary", "Saving", "Stock", "Individual", "Others"].map(
                      (item, index) => {
                        return (
                          <Dropdown.Item
                            key={index}
                            onClick={() => setSource(item)}
                          >
                            {item}
                          </Dropdown.Item>
                        );
                      }
                    )}
                  </Dropdown.Menu>
                </Dropdown>
                {source.length !== 0 ? (
                  <InputGroup.Text>{source}</InputGroup.Text>
                ) : (
                  <Form.Text className="ms-2" muted>
                    <span className="text-danger">*Must select a source</span>
                  </Form.Text>
                )}
              </InputGroup>
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
                  onChange={(e) => setDate(e.target.value)}
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
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                />
              </InputGroup>
              {amount.length === 0 && (
                <Form.Text className="ms-2" muted>
                  <span className="text-danger">*Must eneter amount</span>
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faBank} className="me-2" /> Paid By
                </InputGroup.Text>
                <FormControl
                  required
                  autoComplete="off"
                  type="text"
                  name="payment_method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  placeholder="Discover, Amex, etc."
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
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Remarks"
                />
              </InputGroup>
            </Form.Group>
            <input type="submit" style={{ display: "none" }} disabled />
          </Form>
        </Card.Body>
        <Card.Footer className="py-3" style={{ textAlign: "right" }}>
          {uploading && (
            <div className="me-3 spinner-border" role="status"></div>
          )}
          {error.length !== 0 && (
            <Form.Text className="me-4" muted>
              <span className="text-danger">{error}</span>
            </Form.Text>
          )}
          <Button
            className="me-3"
            size="sm"
            type="button"
            variant="success"
            onClick={(e) => onSubmit(e)}
            disabled={source.length === 0 || amount.length === 0 || uploading}
          >
            <FontAwesomeIcon icon={faUpload} /> Submit
          </Button>
          <Button
            size="sm"
            type="button"
            variant="info"
            onClick={() => resetForm()}
            disabled={
              source.length === 0 && amount.length === 0 && remarks.length === 0
            }
          >
            <FontAwesomeIcon icon={faUndo} /> Reset
          </Button>
        </Card.Footer>
      </Card>
      {error.length !== 0 && (
        <div className="row text-center">
          <div className="col">
            <Form.Text className="mt-4" muted>
              <span className="text-danger">{error}</span>
            </Form.Text>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddIncome;
