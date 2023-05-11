import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import YearMonthPicker from '../../commons/YearMonthPicker';
import AddExpense from './AddExpense';
import { tableNames } from '../../../utils/Constants';
import useLoadRecords from '../../commons/useLoadRecords';
import SmartTable from '../../commons/SmartTable';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../../utils/Authentication';
import Graphs from '../../commons/Graphs';
import { DateUtil } from '../../../utils/DateUtil';
import GraphSwitch from '../../commons/GraphSwitch';
import CategoryGraph from './CategoryGraph';
import { Tab, Tabs } from '@mui/material';
import BatchProcessor from '../batch_processor/BatchProcessor';

const headCells = [
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'location',
    numeric: false,
    disablePadding: false,
    label: 'Location',
  },
  {
    id: 'amount',
    numeric: false,
    disablePadding: false,
    label: 'Amount ($)',
  },
  {
    id: 'payment_method',
    numeric: false,
    disablePadding: false,
    label: 'Payment Method',
  },
  {
    id: 'remarks',
    numeric: false,
    disablePadding: false,
    label: 'Remarks',
  },
];

const Expense = () => {
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
  const [isGraph, setIsGraph] = useState(false);
  const [categoryGraph, setCategoryGraph] = useState(false);
  const [addExpenseTab, setAddExpenseTab] = useState(0);

  const handleAddExpenseTabChange = (event, newValue) => {
    setAddExpenseTab(newValue);
  };

  useEffect(() => {
    if (!isGraph) {
      setCategoryGraph(false);
    }
  }, [isGraph]);

  const [setLoadData, error, loading, tableVisibility, data] = useLoadRecords(
    tableNames.EXPENSE,
    date
  );

  const loadExpenses = () => {
    setLoadData(true);
  };

  return (
    <Row className="mt-4 mb-4">
      <Col>
        <Row className="mb-3">
          <Col>
            <Row className="mb-2">
              <Col>
                <YearMonthPicker
                  dateProps={[date, setDate]}
                  datePickerLabel="Year and Month"
                  minDate={new Date('2017-01-01')}
                />
                <Button
                  className="ms-3 mt-2"
                  onClick={loadExpenses}
                  disabled={loading}
                >
                  {tableVisibility ? 'Hide Table' : 'Load Expenses'}
                </Button>
                {loading && (
                  <div className="ms-3 spinner-border" role="status" />
                )}
              </Col>
              {data && data.item && data.item.length && tableVisibility && (
                <GraphSwitch graphView={isGraph} setGraphView={setIsGraph} />
              )}
            </Row>
            <Row>
              <Col>
                {error.length !== 0 && (
                  <span className="text-danger ms-2">{error}</span>
                )}
                {tableVisibility &&
                  ((data && data.item && data.item.length) > 0 ? (
                    !isGraph ? (
                      <SmartTable
                        tableHeaders={headCells}
                        data={data.item}
                        subject={tableNames.EXPENSE}
                        period={date}
                      />
                    ) : (
                      <>
                        {categoryGraph ? (
                          <CategoryGraph data={data.item} />
                        ) : (
                          <Graphs data={data.item} />
                        )}
                        <GraphSwitch
                          graphView={categoryGraph}
                          setGraphView={setCategoryGraph}
                          label="By-Category"
                        />
                      </>
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
            <Tabs value={addExpenseTab} onChange={handleAddExpenseTabChange} aria-label="expense add tabs">
                <Tab label="Individual Expense" id="individual-add-expense" aria-controls="individual-add-expense-tab-panel" />
                <Tab label="Batch Expense" id="batch-add-expense" aria-controls="batch-add-expense-tab-panel" />
            </Tabs>
            <div
                className="mt-3"
                role="tabpanel"
                hidden={addExpenseTab !== 0}
                id="individual-add-expense-tab-panel"
                aria-labelledby="individual-add-expense"
            >
                <AddExpense />
            </div>
            <div
                className="mt-3"
                role="tabpanel"
                hidden={addExpenseTab !== 1}
                id="batch-add-expense-tab-panel"
                aria-labelledby="batch-add-expense"
            >
                <BatchProcessor />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Expense;
