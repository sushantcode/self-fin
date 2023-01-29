import {
  faAward,
  faBuilding,
  faCalendar,
  faChartLine,
  faCircleInfo,
  faDollar,
  faHashtag,
  faUndo,
  faUpload
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
  InputGroup
} from "react-bootstrap";
import { tableNames } from "../../../utils/Constants";
import { DateUtil } from "../../../utils/DateUtil";
import useUploadRecord from "../../commons/useUploadRecord";

const AddInvestment = () => {
  const [broker, setBroker] = useState("Webull");
  const [stock, setStock] = useState("");
  const [company, setCompany] = useState("");
  const [date, setDate] = useState(
    DateUtil.getLocalDateInISOFormat(new Date().toLocaleDateString())
  );
  const [amount, setAmount] = useState("");
  const [units, setUnits] = useState("");
  const [vested, setVested] = useState("Yes");
  const [remarks, setRemarks] = useState("");
  const [newInvestment, setNewInvestment] = useState(null);

  const [setAddData, error, uploading] = useUploadRecord(
    tableNames.INVESTMENTS,
    newInvestment
  );

  useEffect(
    () => {
      if (newInvestment !== null) {
        setAddData(true);
      } else {
        setAddData(false);
      }
    },
    [newInvestment]
  );

  const resetForm = () => {
    setBroker("Webull");
    setStock("");
    setCompany("");
    setDate(DateUtil.getLocalDateInISOFormat(new Date().toLocaleDateString()));
    setAmount("");
    setUnits("");
    setVested("Yes");
    setRemarks("");
  };

  const onSubmit = e => {
    e.preventDefault();
    const newItem = {
      broker: broker,
      stock: stock,
      company: company,
      date: date,
      amount: amount,
      units: units,
      vested: vested,
      remarks: remarks
    };
    setNewInvestment(newItem);
    resetForm();
  };

  return (
    <div>
      <Card>
        <Card.Header className="text-center fs-4">
          Enter details of the investment?
        </Card.Header>
        <Card.Body>
          <Form className="mt-3">
            <Form.Group as={Col} className="mb-3">
              <InputGroup>
                <Dropdown>
                  <Dropdown.Toggle className="dropdown_headers">
                    Select the broker
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {[
                      "Webull",
                      "Robinhood",
                      "Fidelity",
                      "Others"
                    ].map((item, index) => {
                      return (
                        <Dropdown.Item
                          key={index}
                          onClick={() => setBroker(item)}
                        >
                          {item}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                {broker.length !== 0
                  ? <InputGroup.Text>
                      {broker}
                    </InputGroup.Text>
                  : <Form.Text className="ms-2" muted>
                      <span className="text-danger">*Must select a broker</span>
                    </Form.Text>}
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faChartLine} className="me-2" /> Stock
                  Name
                </InputGroup.Text>
                <FormControl
                  required
                  autoComplete="off"
                  type="text"
                  name="stock"
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                  placeholder="AMZN, AAPL, etc."
                />
              </InputGroup>
              {stock.length === 0 &&
                <Form.Text className="ms-2" muted>
                  <span className="text-danger">*Must eneter stock name</span>
                </Form.Text>}
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faBuilding} className="me-2" /> Company
                </InputGroup.Text>
                <FormControl
                  required
                  autoComplete="off"
                  type="text"
                  name="company"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="Amazon.com, etc."
                />
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
                  <FontAwesomeIcon icon={faHashtag} className="me-2" /> Units
                </InputGroup.Text>
                <FormControl
                  required
                  autoComplete="off"
                  type="number"
                  name="units"
                  value={units}
                  onChange={e => setUnits(e.target.value)}
                  placeholder="Units"
                />
              </InputGroup>
              {units.length === 0 &&
                <Form.Text className="ms-2" muted>
                  <span className="text-danger">*Must eneter units</span>
                </Form.Text>}
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <InputGroup>
                <Form.Check
                  inline
                  label="Vested"
                  name="vested"
                  type="radio"
                  id="inline-radio-yes"
                  checked={vested === "Yes" ? true : false}
                  onChange={e => setVested(e.target.checked ? "Yes" : "No")}
                />
                <Form.Check
                  inline
                  label="Not-Vested"
                  name="vested"
                  type="radio"
                  id="inline-radio-no"
                  checked={vested === "No" ? true : false}
                  onChange={e => setVested(e.target.checked ? "No" : "Yes")}
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
            disabled={
              stock.length === 0 ||
              units.length === 0 ||
              amount.length === 0 ||
              uploading
            }
          >
            <FontAwesomeIcon icon={faUpload} /> Submit
          </Button>
          <Button
            size="sm"
            type="button"
            variant="info"
            onClick={() => resetForm()}
            disabled={
              stock.length === 0 &&
              company.length === 0 &&
              amount.length === 0 &&
              units.length === 0 &&
              remarks.length === 0
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

export default AddInvestment;
