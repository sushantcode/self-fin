import {
    faBank,
    faCalendar,
    faCircleInfo,
    faDollar,
    faPerson,
    faUndo,
    faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

const AddNewLoan = () => {
    const [person, setPerson] = useState('');
    const [date, setDate] = useState(
        DateUtil.getLocalDateInISOFormat(new Date().toLocaleDateString())
    );
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Zelle Chase Bank');
    const [remarks, setRemarks] = useState('');
    const [newLoanRecord, setNewLoanRecord] = useState(null);

    const [setAddData, error, uploading] = useUploadRecord(
        tableNames.LOANTOFRIEND,
        newLoanRecord
    );

    useEffect(() => {
        if (newLoanRecord !== null) {
            setAddData(true);
        } else {
            setAddData(false);
        }

        return () => {
            setAddData(false);
        };
    }, [newLoanRecord]);

    const resetForm = () => {
        setPerson('');
        setDate(
            DateUtil.getLocalDateInISOFormat(new Date().toLocaleDateString())
        );
        setAmount('');
        setPaymentMethod('Discover');
        setRemarks('');
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            person: person,
            date: date,
            amount: amount,
            payment_method: paymentMethod,
            remarks: remarks,
        };
        setNewLoanRecord(newItem);
        resetForm();
    };
    return (
        <div>
            <Card>
                <Card.Header className="text-center fs-4">
                    Enter details of the loan?
                </Card.Header>
                <Card.Body>
                    <Form className="mt-3">
                        <Form.Group as={Col} className="mb-3">
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon
                                        icon={faPerson}
                                        className="me-2"
                                    />{' '}
                                    Loaned To
                                </InputGroup.Text>
                                <FormControl
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="person"
                                    value={person}
                                    onChange={(e) => setPerson(e.target.value)}
                                    placeholder="Jon Doe"
                                />
                            </InputGroup>
                            {person.length === 0 && (
                                <Form.Text className="ms-2" muted>
                                    <span className="text-danger">
                                        *Must eneter person name
                                    </span>
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon
                                        icon={faCalendar}
                                        className="me-2"
                                    />{' '}
                                    Date
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
                                    <FontAwesomeIcon
                                        icon={faDollar}
                                        className="me-2"
                                    />{' '}
                                    Amount
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
                                    <span className="text-danger">
                                        *Must eneter amount
                                    </span>
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon
                                        icon={faBank}
                                        className="me-2"
                                    />{' '}
                                    Paid By
                                </InputGroup.Text>
                                <FormControl
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="payment_method"
                                    value={paymentMethod}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                    placeholder="Cash, Zelle, etc."
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon
                                        icon={faCircleInfo}
                                        className="me-2"
                                    />{' '}
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
                        <input
                            type="submit"
                            style={{ display: 'none' }}
                            disabled
                        />
                    </Form>
                </Card.Body>
                <Card.Footer className="py-3" style={{ textAlign: 'right' }}>
                    {uploading && (
                        <div className="me-3 spinner-border" role="status" />
                    )}
                    <Button
                        className="me-3"
                        size="sm"
                        type="button"
                        variant="success"
                        onClick={(e) => onSubmit(e)}
                        disabled={
                            person.length === 0 ||
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
                            person.length === 0 &&
                            amount.length === 0 &&
                            remarks.length === 0
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

export default AddNewLoan;
