import {
    faBank,
    faCalendar,
    faCircleInfo,
    faDollar,
    faLocation,
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

const AddExpense = () => {
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(
        DateUtil.getLocalDateInISOFormat(new Date().toLocaleDateString())
    );
    const [location, setLocation] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Discover');
    const [remarks, setRemarks] = useState('');
    const [newExpense, setNewExpense] = useState(null);

    const [setAddData, error, uploading] = useUploadRecord(
        tableNames.EXPENSE,
        newExpense
    );

    useEffect(() => {
        if (newExpense !== null) {
            setAddData(true);
        } else {
            setAddData(false);
        }
    }, [newExpense]);

    const resetForm = () => {
        setCategory('');
        setDate(
            DateUtil.getLocalDateInISOFormat(new Date().toLocaleDateString())
        );
        setLocation('');
        setAmount('');
        setPaymentMethod('Discover');
        setRemarks('');
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            category: category,
            date: date,
            location: location,
            amount: amount,
            payment_method: paymentMethod,
            remarks: remarks,
        };
        setNewExpense(newItem);
        resetForm();
    };

    return (
        <div>
            <Card>
                <Card.Header className="text-center fs-4">
                    Enter details of the expense?
                </Card.Header>
                <Card.Body>
                    <Form className="mt-3">
                        <Form.Group as={Col} className="mb-3">
                            <InputGroup>
                                <Dropdown>
                                    <Dropdown.Toggle className="dropdown_headers">
                                        Select Category of Expense
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {[
                                            'Food',
                                            'Rent',
                                            'Utility',
                                            'Personal',
                                            'Travel',
                                            'Gasoline',
                                            'Others',
                                        ].map((item, index) => {
                                            return (
                                                <Dropdown.Item
                                                    key={index}
                                                    onClick={() =>
                                                        setCategory(item)
                                                    }
                                                >
                                                    {item}
                                                </Dropdown.Item>
                                            );
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                                {category.length !== 0 ? (
                                    <InputGroup.Text>
                                        {category}
                                    </InputGroup.Text>
                                ) : (
                                    <Form.Text className="ms-2" muted>
                                        <span className="text-danger">
                                            *Must select a category
                                        </span>
                                    </Form.Text>
                                )}
                            </InputGroup>
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
                                        icon={faLocation}
                                        className="me-2"
                                    />{' '}
                                    Location
                                </InputGroup.Text>
                                <FormControl
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="location"
                                    value={location}
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                    placeholder="Walmart, Amazon, etc."
                                />
                            </InputGroup>
                            {location.length === 0 && (
                                <Form.Text className="ms-2" muted>
                                    <span className="text-danger">
                                        *Must eneter a location
                                    </span>
                                </Form.Text>
                            )}
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
                                    placeholder="Discover, Amex, etc."
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
                            category.length === 0 ||
                            location.length === 0 ||
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
                            category.length === 0 &&
                            location.length === 0 &&
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

export default AddExpense;
