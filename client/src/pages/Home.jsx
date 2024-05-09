import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { TailSpin } from 'react-loader-spinner';

export default function Home() {
  const [items, setItems] = useState([]);
  const [selecedCategory, setSelecedCategory] = useState('drinks');
  const [load, setLoad] = useState(true);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const obj = { ...item, quantity: 1 };
    const updatedCart = [...cart, obj];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Use SweetAlert to show a success message
    Swal.fire({
      icon: 'success',
      title: 'Item Added to Cart',
      text: `${item.name} has been added to your cart.`,
      showConfirmButton: false,
      timer: 1500, // Auto close after 1.5 seconds
    });
  };

  const categories = [
    {
      name: 'drinks',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/430/430561.png',
    },
    {
      name: 'rice',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3174/3174880.png',
    },
    {
      name: 'noodles',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/1471/1471262.png',
    },
  ];

  useEffect(() => {
    axios
      .get('/api/items/get-item')
      .then((json) => {
        setItems(json.data.items);
        setLoad(false);
      })
      .catch((err) => alert(err.message));
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <>
      {load ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
          }}
        >
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
          <Stack spacing={2} direction="row">
            {categories.map((category) => (
              <Button
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  fontStyle: 'bolder',
                }}
                key={category.name}
                variant="outlined"
                startIcon={
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    height="40"
                    width="60"
                  />
                }
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
                onClick={() => {
                  setSelecedCategory(category.name);
                }}
              >
                <Typography className="button">{category.name}</Typography>
              </Button>
            ))}
          </Stack>

          <div style={{ marginTop: '30px' }}>
            <Grid container spacing={3}>
              {items
                .filter((i) => i.category === selecedCategory)
                .map((item) => (
                  <Grid
                    item
                    key={item.name}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                  >
                    <Card style={{ backgroundColor: '#caa971' }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image={item.image}
                        title={item.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        {cart.some((cartItem) => cartItem._id === item._id) ? (
                          <Button disabled variant="contained">
                            Added to Cart
                          </Button>
                        ) : (
                          <Button
                            style={{ backgroundColor: 'black', color: 'white' }}
                            variant="contained"
                            startIcon={<AddShoppingCartIcon />}
                            onClick={() => {
                              addToCart(item);
                            }}
                          >
                            Add to Cart
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </div>
        </>
      )}
    </>
  );
}
