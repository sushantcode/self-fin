import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Titlebar from './titlebar/Titlebar';

function App() {
  return (
    <Router>
      <Container fluid>
        <Titlebar />
      </Container>
    </Router>
  );
}

export default App;
