import React, { useState, useEffect, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import RoofingIcon from '@mui/icons-material/Roofing';
import ListIcon from '@mui/icons-material/List';
import GroupIcon from '@mui/icons-material/Group';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import FileRoutes from './FileRoutes'
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cookies from 'js-cookie'
import { GlobalContext } from './Context/context'

const openedMixin = (theme) => ({
    width: 240,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: 240,
        width: `calc(100% - ${240}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: 240,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Admin() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [cart, setCart] = useState([]);
    const { state, dispatch } = useContext(GlobalContext)
    console.log(state)

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const sidebar =
        [
            {
                tab: "Home",
                url: '/', icon: <RoofingIcon />
            },
            {
                tab: "Items",
                url: '/items', icon: <ListIcon />
            },
            {
                tab: "Customers",
                url: '/customers', icon: <GroupIcon />
            }
            ,
            {
                tab: "Bills",
                url: '/bills', icon: <DescriptionIcon />
            }

        ]

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    return (
        <Box sx={{ display: 'flex',backgroundColor:'rgb(255, 255, 165)' }} >
            <CssBaseline />
            <AppBar position="fixed" open={open} style={{backgroundColor:'#caa971',color:'black'}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon style={{color:'black'}} />
                    </IconButton>
                    <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                    <Typography variant="h6" noWrap component="div">
                      <b> POS</b> 
                    </Typography>
                    <Link style={{ textDecoration: 'none', color: 'black' }} key='Cart' to='/cart'><ShoppingCartIcon style={{color:'black'}} /></Link>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer style={{backgroundColor:'#ADCAD6'}} variant="permanent" open={open}>
                <DrawerHeader style={{backgroundColor:'#caa971'}}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List style={{backgroundColor:'#caa971',height:'100%'}}>
                    {sidebar.map((text, index) => (
                        <Link style={{ textDecoration: 'none',color:'black'}} key={text.tab} to={text.url}>
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {text.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={text.tab} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>


                    ))}


                    <ListItem  disablePadding sx={{ display: 'block' }} onClick={() => {
                        Cookies.remove('token')
                        dispatch({type : "LOGOUT"})


                    }}>
                        <ListItemButton sx={{
                            minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5,
                        }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                </List>



            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <FileRoutes />

            </Box>
        </Box>

    )
}
