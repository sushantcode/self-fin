import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import YearMonthPicker from '../../commons/YearMonthPicker';
import useGenerateReportData from './useGenerateReportData';
import ReportTable from './ReportTable';
import Checkbox from '@mui/material/Checkbox';
import { Alert, FormControlLabel, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../../utils/Authentication';
import { DateUtil } from '../../../utils/DateUtil';
import GraphSwitch from '../../commons/GraphSwitch';
import ReportGraph from './ReportGraph';

const Report = () => {
  let navigate = useNavigate();

  let authenticated = isAuthenticated();

  useEffect(() => {
    if (!authenticated) {
      navigate('/login');
    }
  }, [authenticated, navigate]);

  const [fromDate, setFromDate] = useState(
    DateUtil.getLocalDateInISOFormat(new Date().toLocaleDateString())
  );
  const [toDate, setToDate] = useState(
    DateUtil.getLocalDateInISOFormat(new Date().toLocaleDateString())
  );
  const [selectedDatesArr, setSelectedDatesArr] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [graphView, setGraphView] = useState(false);

  useEffect(() => {
    let dates = [];
    let from = new Date(fromDate);
    from.setDate(1);
    let to = new Date(toDate);
    to.setDate(1);
    while (from <= to) {
      dates.push(DateUtil.getLocalDateInISOFormat(from.toLocaleDateString()));
      from.setMonth(from.getMonth() + 1);
    }
    setSelectedDatesArr(dates);
  }, [fromDate, toDate]);

  const [setLoadData, error, loading, data] = useGenerateReportData(
    selectedDatesArr,
    selectedSubjects
  );

  const generateReportData = (e) => {
    e.preventDefault();
    setLoadData(true);
  };

  const handleCheckbox = (event) => {
    let currentSelection = [...selectedSubjects];
    event.target.checked
      ? currentSelection.push(event.target.name)
      : currentSelection.splice(currentSelection.indexOf(event.target.name), 1);
    setSelectedSubjects(currentSelection);
  };

  return (
    <Row className="mt-4 mb-4">
      <Col>
        <Row className="mb-3">
          <Col>
            <Row className="mb-2">
              <Col>
                <YearMonthPicker
                  dateProps={[fromDate, setFromDate]}
                  datePickerLabel="From"
                  minDate={new Date('2017-01-01')}
                />
                &ensp;
                <YearMonthPicker
                  dateProps={[toDate, setToDate]}
                  datePickerLabel="To"
                  minDate={new Date(fromDate)}
                />
              </Col>
            </Row>
            <Row>
              <Col className="mt-2 mb-2">
                <FormControlLabel
                  control={
                    <Checkbox name="expense" onChange={handleCheckbox} />
                  }
                  label="Expense"
                />
                <FormControlLabel
                  control={<Checkbox name="income" onChange={handleCheckbox} />}
                  label="Income"
                />
                <FormControlLabel
                  control={
                    <Checkbox name="investments" onChange={handleCheckbox} />
                  }
                  label="Investments"
                />
                <FormControlLabel
                  control={
                    <Checkbox name="loanToFriends" onChange={handleCheckbox} />
                  }
                  label="Loans"
                />
                <FormControlLabel
                  control={
                    <Checkbox name="savings" onChange={handleCheckbox} />
                  }
                  label="Savings"
                />
                <FormControlLabel
                  control={<Checkbox name="toHome" onChange={handleCheckbox} />}
                  label="Transfer-Home"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  className="mt-2"
                  onClick={generateReportData}
                  disabled={loading || selectedSubjects.length === 0}
                >
                  {loading ? (
                    <div className="ms-3 spinner-border" role="status" />
                  ) : (
                    'Generate reports'
                  )}
                </Button>
                {selectedSubjects.length === 0 && (
                  <FormHelperText className="text-danger">
                    *Must select subject
                  </FormHelperText>
                )}
              </Col>
              {error.length === 0 && data && (
                <GraphSwitch
                  graphView={graphView}
                  setGraphView={setGraphView}
                />
              )}
            </Row>
          </Col>
        </Row>

        <Row>
          <Col>
            {error.length === 0 &&
              data &&
              (graphView ? (
                <ReportGraph data={data} />
              ) : (
                <ReportTable data={data} />
              ))}
            {error.length > 0 && <Alert severity="error">{error}</Alert>}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Report;
