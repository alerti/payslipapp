import React from 'react';
import { useParams } from 'react-router-dom';
import { Plugins, Capacitor } from '@capacitor/core';
import { FilesystemDirectory } from '@capacitor/filesystem';
import { Payslip } from '../types';
import { mockPayslips } from '../dummy/mockData';

const { Filesystem } = Plugins;

interface Props {
  payslips: Payslip[];
}

const PayslipDetails: React.FC<Props> = ({ payslips }) => {
  const { id } = useParams<{ id: string }>();
  const payslip = payslips.find((p) => p.id === id);

  const downloadFile = async () => {
    if (payslip) {
      try {
        if (Capacitor.platform === 'web') {
          // For web, create a download link and simulate a click
          const link = document.createElement('a');
          link.href = payslip.file;
          link.download = 'payslip.pdf';
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          // For mobile platforms, use Capacitor's Filesystem API
          const { uri } = await Filesystem.getUri({
            directory: FilesystemDirectory.Documents,
            path: 'payslip.pdf',
          });

          await Filesystem.writeFile({
            path: 'payslip.pdf',
            data: payslip.file,
            directory: FilesystemDirectory.Documents,
          });

          if (Capacitor.platform === 'ios') {
            // For iOS, open the document in a new window
            window.open(uri, '_system');
          } else if (Capacitor.platform === 'android') {
            // For Android, use Filesystem API to open the document
            await Filesystem.openFile({ path: uri, directory: FilesystemDirectory.Documents });
          }
        }
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    }
  };

  return (
    <div>
      {/* Render your payslip details here */}
      {payslip && (
        <div>
          <h2>Payslip Details</h2>
          <p>From Date: {payslip.fromDate}</p>
          <p>To Date: {payslip.toDate}</p>
        </div>
      )}
      <button onClick={downloadFile}>Download</button>
      {/* The "View" button can be used differently based on the platform */}
      {Capacitor.platform === 'web' && <button onClick={downloadFile}>View</button>}
    </div>
  );
};

export default PayslipDetails;
