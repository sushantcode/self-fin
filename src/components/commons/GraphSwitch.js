import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import React from 'react';
import { Col } from 'react-bootstrap';

const GraphSwitch = ({ graphView, setGraphView }) => {
  return (
    <Col className="d-flex justify-content-end">
      <FormGroup>
        <FormControlLabel
          control={<Switch onChange={() => setGraphView(!graphView)} />}
          label="Graph"
        />
      </FormGroup>
    </Col>
  );
};

export default GraphSwitch;
