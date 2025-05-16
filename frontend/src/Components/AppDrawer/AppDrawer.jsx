import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { memo, useCallback } from 'react';
import { DASHBOARD, LOGOUT, TICKETS, USERS } from '../../Routes/Routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsNavbarOpen } from '../../Store/Selectors/AppSelectors';
import { setIsNavbarOpen } from '../../Store/Slices/AppSlice';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
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
    ...theme.mixins.toolbar,
}));

const menuItems = [
    { text: 'Home', icon: <HomeIcon />, route: DASHBOARD },
    { text: 'Ticket', icon: <ConfirmationNumberIcon />, route: TICKETS },
    { text: 'Utenti', icon: <GroupIcon />, route: USERS },
    { text: 'Logout', icon: <LogoutIcon />, route: LOGOUT },
];

const StyledAppDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
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
}));

const AppDrawer = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectIsNavbarOpen);
    const nav = useNavigate();
    const { pathname } = useLocation();

    const isMenuItemActive = useCallback((route) => pathname === route, [pathname]);

    const handleDrawerToggle = useCallback(() => {
        dispatch(setIsNavbarOpen(!isOpen));
    }, [dispatch, isOpen]);

    return (
        <Box sx={{ display: 'flex' }}>
            <StyledAppDrawer variant="permanent" open={isOpen}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerToggle}>
                        {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuItems.map(({ text, icon, route }) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                selected={isMenuItemActive(route)}
                                onClick={() => nav(route)}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: isOpen ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: isOpen ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: isOpen ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </StyledAppDrawer>
        </Box>
    );
};

export default memo(AppDrawer);