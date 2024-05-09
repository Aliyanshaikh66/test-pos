import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddItem from '../components/AddItem';
import { TailSpin } from 'react-loader-spinner';
import Swal from 'sweetalert2';

export default function Items() {
  const [items, setItems] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    axios.get('/api/items/get-item')
      .then(json => {
        setItems(json.data.items);
        setLoad(false);
      })
      .catch(err => alert(err.message));
  }, []);

  const deleteItem = (_id) => {
    const payload = { _id };
    axios.delete('/api/items/delete-item', { data: payload })
      .then(json => {
        setItems(json.data.items);
        Swal.fire({
          title: 'Item Deleted',
          text: 'The item has been successfully deleted.',
          icon: 'success',
        });
      })
      .catch(err => alert(err.message));
  };

  const handleAddItem = () => {
    Swal.fire({
      title: 'Item Added',
      text: 'The item has been successfully added to the system.',
      icon: 'success',
    });
  };

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
        <>
          <TableContainer component={Paper} style={{ backgroundColor: 'rgb(255, 255, 165)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgb(255, 255, 165)' }}>
              <AddItem setItemVal={setItems} onClick={handleAddItem} />
            </div>
            <h1>Item List</h1>
            <Table sx={{ minWidth: 650 }} style={{ border: '2px solid black' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell><b>Item</b></TableCell>
                  <TableCell align="center"><b>Price</b></TableCell>
                  <TableCell align="center"><b>Category</b></TableCell>
                  <TableCell align="center"><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row, key) => (
                  <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell><Avatar alt={row.name} src={row.image} /></TableCell>
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" style={{ backgroundColor: 'black', color: 'white' }} onClick={() => deleteItem(row._id)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
