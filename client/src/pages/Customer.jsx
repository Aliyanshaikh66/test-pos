import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { TailSpin } from 'react-loader-spinner';

const columns = [
  { field: 'col1', headerName: 'ID', width: 400 },
  { field: 'col2', headerName: 'Customer Name', width: 300 },
  { field: 'col3', headerName: 'Contact No', width: 300 },
];

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    axios.get('/api/bills/get-bills')
      .then(json => { setCustomers(json.data); setLoad(false); })
      .catch(err => alert(err.message));
  }, []);

  const rows = customers.map(customer => ({
    id: customer._id,
    col1: customer._id,
    col2: customer.customerName,
    col3: customer.customerNumber,
  }));

  return (
    <>
      {load ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
          <TailSpin
            height="80"
            width="80"
            color="black"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div style={{ height: 600, width: '100%' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h1>Customer Details</h1>
            </div>
          </div>

          <DataGrid
            style={{ border: '2px solid black' }}
            rows={rows}
            columns={columns.map(col => ({
              ...col,
              headerClassName: 'bold-header', // Apply the custom class
            }))}
          />
        </div>
      )}
    </>
  );
}
