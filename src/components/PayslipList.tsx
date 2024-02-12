// PayslipList.tsx
import React from 'react';
import { Payslip } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  payslips: Payslip[];
}

const PayslipList: React.FC<Props> = ({ payslips }) => {
  return (
    <div>
      {payslips.map((payslip) => (
        <Link to={`/payslip/${payslip.id}`} key={payslip.id}>
          <div>
            <p>{payslip.fromDate} - {payslip.toDate}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PayslipList;