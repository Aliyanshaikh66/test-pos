import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Swal from 'sweetalert2';
// import '@sweetalert2/theme-dark/dark.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState(0);
  const [method, setMethod] = useState('cash');
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleIncrement = (item) => {
    item.quantity = item.quantity + 1;
    setCart([...cart]);
  };
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      item.quantity = item.quantity - 1;
      setCart([...cart]);
    }
  };

  const deleteFromCart = (_id) => {
    const updatedCart = cart.filter((cartItem) => cartItem._id !== _id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

 

  const addBill = (e) => {
    e.preventDefault();
   
    const payload = {
      customerName: name,
      customerNumber: number,
      totalAmount: Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2)),
      subTotal: subTotal,
      tax: Number(((subTotal / 100) * 10).toFixed(2)),
      paymentMode: method,
      cartItems: cart,
    };
    Swal.fire({
      title: 'Generate Bill',
      text: 'Are you sure you want to generate the bill?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, generate it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        handleOpen();
      }
    });

    axios
      .post('/api/bills/add-bills', payload)
      .then((json) => {
        setOpen(false);
        localStorage.setItem('cart', JSON.stringify([]));
        navigate('/bills');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    let temp = 0;
    cart.forEach((item) => {
      temp += Number(item.price) * Number(item.quantity);
    });
    setSubTotal(temp);
  }, [cart]);

  return (
    <>
      <div style={{ backgroundColor:'rgb(255, 255, 165)',display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'flex-end', minHeight: '85vh' }}>
        <TableContainer style={{backgroundColor:'rgb(255, 255, 165)'}} component={Paper}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>Cart</h2>
          </div>

          <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{border:'2px solid black'}}>
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>Name</b></TableCell>
                <TableCell align="center"><b>Image</b></TableCell>
                <TableCell align="center"><b> Price</b></TableCell>
                <TableCell align="center">
                 <b> Quantity</b></TableCell>
                <TableCell align="center">
                 <b>Action</b> </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {
                cart.length > 0 ? 
                  (cart.map((item, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center"><img src={item.image} alt={item.name} height="40" width="60" /></TableCell>
                      <TableCell align="center">{item.price}</TableCell>
                      <TableCell align="center">
                      <IconButton onClick={() => handleDecrement(item)} aria-label="decrement"><RemoveCircleOutlineIcon /></IconButton>
                        {item.quantity}
                    <IconButton onClick={() => handleIncrement(item)} aria-label="increment"><AddCircleOutlineIcon /></IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <Button style={{backgroundColor:'black',color:'white'}} variant="contained" onClick={() => deleteFromCart(item._id)}> <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow> 
                  ))
                  ) :
                  <TableRow key='empty' sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <Typography>Cart empty</Typography>
                  </TableRow> 
              }
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <h4>
            SUB TOTAL : $ <b> {subTotal}</b> /-{" "}
          </h4>
              {
                cart.length > 0 ? 
                <Button variant="contained" onClick={handleOpen} style={{backgroundColor:'black',color:'white'}}> Create Invoice </Button>
                :
                <Button variant="contained" disabled onClick={handleOpen} > Create Invoice </Button>
              }
        </div>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box component="form"
              sx={{ '& > :not(style)': { m: 1, }, }}
              noValidate
              autoComplete="off"
              onSubmit={addBill}
            >
              <div><TextField id="outlined-basic" sx={{ width: '100%' }} label="Customer Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div><TextField id="filled-basic" sx={{ width: '100%' }} label="Contact Number" variant="outlined" value={number} onChange={(e) => setNumber(e.target.value)} /></div>
              <div><TextField
                id="outlined-select-category"
                select
                label="Select Payment Method"
                defaultValue="cash"
                onChange={(e) => setMethod(e.target.value)}
                sx={{ width: '100%' }}
              >
                <MenuItem key='cash' value='cash'>
                  Cash
                </MenuItem>
                <MenuItem key='card' value='card'>
                  Card
                </MenuItem>
              </TextField></div>
              <div><Button type='submit' variant="contained">Generate Bill</Button></div>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default Cart; 