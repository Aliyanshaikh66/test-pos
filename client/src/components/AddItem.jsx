import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import Swal from 'sweetalert2';

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

export default function AddItem({ setItemVal }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const categories = [
        {
            value: 'drinks',
            label: 'drinks',
        },
        {
            value: 'rice',
            label: 'rice',
        },
        {
            value: 'noodles',
            label: 'noodles',
        },
    ];

    const [name, setName] = React.useState('');
    const [category, setCategory] = React.useState(categories[0].value);
    const [price, setPrice] = React.useState('');
    const [image, setImage] = React.useState('');

    const addItem = (e) => {
        e.preventDefault();
        const payload = { name, price: parseInt(price), image, category };
        console.log(payload);
        axios.post('/api/items/add-item', payload)
            .then(json => {
                setItemVal(json.data.items);
                setOpen(false);
                Swal.fire({
                    title: 'Item Added',
                    text: 'The item has been successfully added to the system.',
                    icon: 'success',
                });
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Button onClick={handleOpen} style={{ backgroundColor: 'black', color: 'white' }}>Add Item</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={open}>
                    <Box sx={style} style={{ backgroundColor: 'lightcyan' }}>
                        <Box component="form" style={{ backgroundColor: 'lightcyan' }}
                            sx={{ '& > :not(style)': { m: 1 } }}
                            noValidate
                            autoComplete="off"
                            onSubmit={addItem}
                        >
                            <div><TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} /></div>
                            <div><TextField id="filled-basic" label="Price" variant="outlined" value={price} onChange={(e) => setPrice(e.target.value)} /></div>
                            <div><TextField id="standard-basic" label="Image" variant="outlined" value={image} onChange={(e) => setImage(e.target.value)} /></div>
                            <div><TextField
                                id="outlined-select-category"
                                select
                                label="Select Category"
                                defaultValue="drinks"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField></div>
                            <div><Button type='submit' variant="contained">Add</Button></div>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
