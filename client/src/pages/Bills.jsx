import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InvoiceModal from '../components/InvoiceModal';
import { TailSpin } from  'react-loader-spinner';

export default function Bills() {
  const [bills, setBills] = useState([])
  const [query, setQuery] = useState('')
  const [load, setLoad] = useState(true);

  useEffect(() => {
    axios.get('/api/bills/get-bills')
      .then(json => {setBills(json.data); setLoad(false)})
      .catch(err => alert(err.message))
  }, [])

  useEffect(()=>{
    if(query === ''){
      axios.get('/api/bills/get-bills')
      .then(json => setBills(json.data))
      .catch(err => alert(err.message))
    }
    else{
      const updatedBills = bills.filter((bill)=> {
        const lowerBillId = bill._id.toLowerCase();
        const lowerName = bill.customerName ? bill.customerName.toLowerCase() : '';
        const lowerQuery = query.toLowerCase();
  
        return lowerBillId.includes(lowerQuery) || lowerName.includes(lowerQuery);
      });

      setBills(updatedBills);
      
    }
  },[query]);

  

  return (
    <>
    {
      load ?
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh'}}> 
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
      :
      <>
    <TableContainer component={Paper} style={{backgroundColor:'rgb(255, 255, 165)'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Invoice List</h1>
        <TextField id="outlined-basic" label="Search Bills" variant="outlined" value={query} onChange={(e) => {setQuery(e.target.value)}} size='small'/>
      </div>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Customer Name</TableCell>
            <TableCell align="center">Sub Total</TableCell>
            <TableCell align="center">Tax</TableCell>
            <TableCell align="center">Total Amount</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {bills.map((row, key) => (
            <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell align="center">{row._id}</TableCell>
              <TableCell align="center">{row.customerName}</TableCell>
              <TableCell align="center">{row.subTotal}</TableCell>
              <TableCell align="center">{row.tax}</TableCell>
              <TableCell align="center">{row.totalAmount}</TableCell>
              <TableCell align="center">
                <InvoiceModal _id={row._id}/>
              </TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  }
  </>
  )
}
