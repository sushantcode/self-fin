import {
  faBank,
  faCalendar,
  faCircleInfo,
  faDollar,
  faPerson,
  faRupeeSign,
  faUndo,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { tableNames } from '../../../utils/Constants';
import { DateUtil } from '../../../utils/DateUtil';
import useUploadRecord from '../../commons/useUploadRecord';

const AddTransfer = () => {
  const [service, setService] = useState('MoneyGram');
  const [date, setDate] = useState(
    DateUtil.getLocalDateInISOFormat(new Date().toLocaleDateString())
  );
  const [receiver, setReceiver] = useState('');
  const [usd, setUsd] = useState('');
  const [nrs, setNrs] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Debit');
  const [remarks, setRemarks] = useState('');
  const [newTransfer, setNewTransfer] = useState(null);
  const [alert, setAlert] = useState(false);

  const [setAddData, error, uploading] = useUploadRecord(
    tableNames.HOME,
    newTransfer
  );

  useEffect(() => {
    if (newTransfer !== null) {
      setAddData(true);
      setAlert(true);
    } else {
      setAddData(false);
    }
  }, [newTransfer]);

  const resetForm = () => {
    setService('MoneyGram');
    setDate(DateUtil.getLocalDateInISOFormat(new Date().toLocaleDateString()));
    setReceiver('');
    setUsd('');
    setNrs('');
    setPaymentMethod('Debit');
    setRemarks('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setAlert(false);
    const newItem = {
      service: service,
      receiver: receiver,
      date: date,
      amount: usd,
      nrs: nrs,
      payment_method: paymentMethod,
      remarks: remarks,
    };
    setNewTransfer(newItem);
    resetForm();
  };

  return (
    <div>
      <Card>
        <Card.Header className="text-center fs-4">
          Enter details of the transfer?
        </Card.Header>
        <Card.Body>
          <Form className="mt-3">
            <Form.Group as={Col} className="mb-3">
              <InputGroup>
                <Dropdown>
                  <Dropdown.Toggle className="dropdown_headers">
                    Select the service
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {[
                      'MoneyGram',
                      'WesternUnion',
                      'Remitly',
                      'Xoom',
                      'Others',
                    ].map((item, index) => {
                      return (
                        <Dropdown.Item
                          key={index}
                          onClick={() => setService(item)}
                        >
                          {item}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                {service.length !== 0 ? (
                  <InputGroup.Text>{service}</InputGroup.Text>
                ) : (
                  <Form.Text className="ms-2" muted>
                    <span className="text-danger">*Must select a service</span>
                  </Form.Text>
                )}
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faPerson} className="me-2" /> Receiver
                </InputGroup.Text>
                <FormControl
                  required
                  autoComplete="off"
                  type="text"
                  name="receiver"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                  placeholder="John Doe"
                />
              </InputGroup>
              {receiver.length === 0 && (
                <Form.Text className="ms-2" muted>
                  <span className="text-danger">*Must eneter a receiver</span>
                </Form.Text>
              )}
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
                  <FontAwesomeIcon icon={faDollar} className="me-2" /> USD
                </InputGroup.Text>
                <FormControl
                  required
                  autoComplete="off"
                  type="number"
                  name="usd"
                  value={usd}
                  onChange={(e) => setUsd(e.target.value)}
                  placeholder="USD Amount"
                />
              </InputGroup>
              {usd.length === 0 && (
                <Form.Text className="ms-2" muted>
                  <span className="text-danger">*Must eneter usd amount</span>
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faRupeeSign} className="me-2" /> NRS
                </InputGroup.Text>
                <FormControl
                  required
                  autoComplete="off"
                  type="number"
                  name="nrs"
                  value={nrs}
                  onChange={(e) => setNrs(e.target.value)}
                  placeholder="NRS Amount"
                />
              </InputGroup>
              {nrs.length === 0 && (
                <Form.Text className="ms-2" muted>
                  <span className="text-danger">*Must eneter nrs amount</span>
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
                  placeholder="Debit, Cash, etc."
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faCircleInfo} className="me-2" />{' '}
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

            <input type="submit" style={{ display: 'none' }} disabled />
          </Form>
        </Card.Body>
        <Card.Footer className="py-3" style={{ textAlign: 'right' }}>
          {uploading && <div className="me-3 spinner-border" role="status" />}
          <Button
            className="me-3"
            size="sm"
            type="button"
            variant="success"
            onClick={(e) => onSubmit(e)}
            disabled={
              service.length === 0 ||
              receiver.length === 0 ||
              usd.length === 0 ||
              nrs.length === 0 ||
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
              receiver.length === 0 &&
              usd.length === 0 &&
              nrs.length === 0 &&
              remarks.length === 0
            }
          >
            <FontAwesomeIcon icon={faUndo} /> Reset
          </Button>
        </Card.Footer>
      </Card>
      {alert && !uploading && (
        <>
          {error.length !== 0 ? (
            <Alert
              className="mt-2"
              severity="error"
              onClose={() => setAlert(false)}
            >
              {error}
            </Alert>
          ) : (
            <Alert
              className="mt-2"
              severity="success"
              onClose={() => setAlert(false)}
            >
              Data uploaded successfully!!!
            </Alert>
          )}
        </>
      )}
    </div>
  );
};

export default AddTransfer;
