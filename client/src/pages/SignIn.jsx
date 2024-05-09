import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import axios from 'axios';
import Cookies from 'js-cookie';
import { GlobalContext } from '../Context/context';
import Swal from 'sweetalert2';

// Define the theme
const theme = createTheme();

function SignInSide() {
  const { state, dispatch } = React.useContext(GlobalContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get('email'),
      password: data.get('password'),
    };

    axios
      .post('/api/users/login', payload)
      .then((json) => {
        Cookies.set('token', json.data.token);
        dispatch({
          type: 'LOGIN',
          token: json.data.token,
        });

        if (json.data.message === 'invalid  credentials') {
          // Show error alert using SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Login failed',
            text: 'Invalid credentials. Please check your email and password.',
          });
        } else {
          // Show success alert using SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Logged in successfully!',
            text: json.data.message,
          });
        }

        console.log(json.data.message);
      })
      .catch((err) => {
        // Show error alert using SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: 'Error Failed',
        });
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {/* Left side background image */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1602665742701-389671bc40c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9zfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h3" color="primary">
              Welcome!
            </Typography>
            <Typography variant="h5" color="primary">
              Login to your account
            </Typography>
          </Box>
        </Grid>
        {/* Right side login form */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ backgroundColor: 'white'}}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
             
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  
                    Don't have an account? <Link href="/signup" variant="body2"> Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignInSide;
