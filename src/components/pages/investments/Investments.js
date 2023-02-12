import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { data } from '../../../Mock_data';
import { tableNames } from '../../../utils/Constants';
import SmartTable from '../../commons/SmartTable';
import useLoadRecords from '../../commons/useLoadRecords';
import YearMonthPicker from '../../commons/YearMonthPicker';
import AddInvestment from './AddInvestment';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../../utils/Authentication';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import Graphs from '../../commons/Graphs';
import { DateUtil } from '../../../utils/DateUtil';

const headCells = [
    {
        id: 'broker',
        numeric: false,
        disablePadding: false,
        label: 'Broker',
    },
    {
        id: 'stock',
        numeric: false,
        disablePadding: false,
        label: 'Stock',
    },
    {
        id: 'amount',
        numeric: false,
        disablePadding: false,
        label: 'Amount ($)',
    },
    {
        id: 'units',
        numeric: false,
        disablePadding: false,
        label: 'Units',
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'vested',
        numeric: false,
        disablePadding: false,
        label: 'Vested?',
    },
    {
        id: 'remarks',
        numeric: false,
        disablePadding: false,
        label: 'Remarks',
    },
];

const Investments = () => {
    let navigate = useNavigate();

    let authenticated = isAuthenticated();

    useEffect(() => {
        if (!authenticated) {
            navigate('/login');
        }
    }, [authenticated, navigate]);

    const [date, setDate] = useState(
        DateUtil.getLocalDateInISOFormat(new Date().toLocaleDateString())
    );

    const [setLoadData, error, loading, tableVisibility, data] = useLoadRecords(
        tableNames.INVESTMENTS,
        date
    );

    const loadinvestments = () => {
        setLoadData(true);
    };
    return (
        <Row className="mt-4 mb-4">
            <Col>
                <Row className="mb-3">
                    <Col>
                        <Row className="mb-2">
                            <Col className="">
                                <YearMonthPicker
                                    dateProps={[date, setDate]}
                                    datePickerLabel="Year and Month"
                                    minDate={new Date('2017-01-01')}
                                />
                                <Button
                                    className="ms-3 mt-2"
                                    onClick={loadinvestments}
                                    disabled={loading}
                                >
                                    {tableVisibility
                                        ? 'Hide Table'
                                        : 'Load Investments'}
                                </Button>
                                {loading && (
                                    <div
                                        className="ms-3 spinner-border"
                                        role="status"
                                    />
                                )}
                            </Col>
                            <Col className="d-flex justify-content-end">
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                disabled={
                                                    !tableVisibility ||
                                                    !(
                                                        data &&
                                                        data.item &&
                                                        data.item.length
                                                    )
                                                }
                                                onChange={() =>
                                                    setIsGraph(!isGraph)
                                                }
                                            />
                                        }
                                        label="Graph"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {error.length !== 0 && (
                                    <span className="text-danger ms-2">
                                        {error}
                                    </span>
                                )}
                                {tableVisibility &&
                                    ((data && data.item && data.item.length) >
                                    0 ? (
                                        !isGraph ? (
                                            <SmartTable
                                                tableHeaders={headCells}
                                                data={data.item}
                                                subject={tableNames.INVESTMENTS}
                                                period={date}
                                            />
                                        ) : (
                                            <Graphs data={data.item} />
                                        )
                                    ) : (
                                        <span className="text-danger ms-2">
                                            No records found for this month!!!
                                        </span>
                                    ))}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AddInvestment />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default Investments;
