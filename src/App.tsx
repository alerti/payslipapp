// App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PayslipList from './components/PayslipList';
import PayslipDetails from './components/PayslipDetails';
import { Payslip } from './types';
import { mockPayslips } from './dummy/mockData';

function App() {
  const [payslips, setPayslips] = useState<Payslip[]>(mockPayslips);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PayslipList payslips={payslips} />} />
        <Route path="/payslip/:id" element={<PayslipDetails payslips={payslips} />} />
      </Routes>
    </Router>
  );
}

export default App;