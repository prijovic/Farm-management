import React from "react";
import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {Link, NavLink} from "react-router-dom";
import {logout} from "../utils/auth";
import {logout as logoutAction, selectIsAuthenticated} from "../store/features/authSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import logo from "../assets/lilly021.png";
import classes from "./MainNavbar.module.css";
import {ThemeToggle} from "./ThemeToggle";
import {selectTheme, Theme} from "../store/features/uiSlice";

const unauthenticatedPages = ['Login', 'Sign Up'];
const authenticatedPages = ['Parcels'];
const unauthenticatedRoutes = ['/auth/login', '/auth/signUp'];
const authenticatedRoutes = ['/parcel/all'];

export const MainNavbar: React.FC = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const theme = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const mapMenuItems = (pages: string[], routes: string[]) => {
        return pages.map((page, index) => (
            <NavLink key={page} to={routes[index]}>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                </MenuItem>
            </NavLink>
        ))
    }

    const authenticatedMenuItems = () => {
        const menuItems = mapMenuItems(authenticatedPages, authenticatedRoutes);
        menuItems.push((<Link key={"Logout"} to={"/auth/login"}>
            <MenuItem onClick={() => {
                handleCloseNavMenu();
                logout();
                dispatch(logoutAction());
            }}>
                <Typography textAlign="center">Logout</Typography>
            </MenuItem>
        </Link>));
        return menuItems;
    }

    const menuItems = () => {
        return !isAuthenticated ? mapMenuItems(unauthenticatedPages, unauthenticatedRoutes) : authenticatedMenuItems();
    }

    const mapNavLinks = (pages: string[], routes: string[]) => {
        return pages.map((page, index) => (
            <NavLink key={page} to={routes[index]}>
                <Button
                    onClick={handleCloseNavMenu}
                    sx={{my: 2, color: 'white', display: 'block'}}
                >
                    {page}
                </Button>
            </NavLink>
        ))
    }

    const authenticatedNavLinks = () => {
        const menuItems = mapNavLinks(authenticatedPages, authenticatedRoutes);
        menuItems.push((<Link key={"Logout"} to={"/auth/login"}>
            <Button
                onClick={() => {
                    dispatch(logoutAction());
                    logout();
                }}
                sx={{my: 2, color: 'white', display: 'block'}}
            >
                Logout
            </Button>
        </Link>));
        return menuItems;
    }

    const navLinks = () => {
        return !isAuthenticated ? mapNavLinks(unauthenticatedPages, unauthenticatedRoutes) : authenticatedNavLinks();
    }

    return (
        <AppBar className={theme === Theme.LIGHT ? classes.light : undefined} position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <NavLink to={"/"}>
                        <IconButton component={"div"}>
                            <img className={classes.logo} src={logo} alt={"Lilly021"}/>
                        </IconButton>
                    </NavLink>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', sm: 'none'}, justifyContent: "flex-end"}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', sm: 'none'},
                            }}
                        >
                            {menuItems()}
                        </Menu>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', sm: 'flex'}, justifyContent: "flex-end"}}>
                        {navLinks()}
                    </Box>
                    <ThemeToggle/>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
