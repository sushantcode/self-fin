import {
  faBank,
  faCalendar,
  faChartLine,
  faCircleInfo,
  faDollar,
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
  Form,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { tableNames } from '../../../utils/Constants';
import useUploadRecord from '../../commons/useUploadRecord';
import { DateUtil } from '../../../utils/DateUtil';

const AddSavings = () => {
  const [where, setWhere] = useState('');
  const [date, setDate] = useState(
    DateUtil.getLocalDateInISOFormat(new Date().toLocaleDateString())
  );
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [newSaving, setNewSaving] = useState(null);
  const [currency, setCurrency] = useState('Rs');
  const [alert, setAlert] = useState(false);

  const [setAddData, error, uploading] = useUploadRecord(
    tableNames.SAVING,
    newSaving
  );

  useEffect(() => {
    if (newSaving !== null) {
      setAddData(true);
      setAlert(true);
    } else {
      setAddData(false);
    }
  }, [newSaving]);

  const resetForm = () => {
    setWhere('');
    setDate(DateUtil.getLocalDateInISOFormat(new Date().toLocaleDateString()));
    setAmount('');
    setInterest('Discover');
    setRemarks('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setAlert(false);
    const newItem = {
      where: where,
      date: date,
      amount: amount,
      interest: interest,
      currency: currency,
      remarks: remarks,
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
                  onChange={(e) => setWhere(e.target.value)}
                  placeholder="Sanima, John Doe, etc."
                />
              </InputGroup>
              {where.length === 0 && (
                <Form.Text className="ms-2" muted>
                  <span className="text-danger">
                    *Must eneter where invested
                  </span>
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
                <InputGroup.Text> Amount </InputGroup.Text>
                <FormControl
                  required
                  autoComplete="off"
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                />
                <Button
                  variant={currency === 'Rs' ? 'primary' : 'secondary'}
                  onClick={(e) => setCurrency('Rs')}
                >
                  <FontAwesomeIcon icon={faRupeeSign} className="px-2" />
                </Button>
                <Button
                  variant={currency === 'USD' ? 'primary' : 'secondary'}
                  onClick={(e) => setCurrency('USD')}
                >
                  <FontAwesomeIcon icon={faDollar} className="px-2" />
                </Button>
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
                  <FontAwesomeIcon icon={faChartLine} className="me-2" />{' '}
                  Interest Rate (%)
                </InputGroup.Text>
                <FormControl
                  required
                  autoComplete="off"
                  type="number"
                  name="interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  placeholder="0 %"
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

export default AddSavings;
