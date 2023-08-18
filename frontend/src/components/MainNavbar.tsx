import React from "react";
import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {NavLink} from "react-router-dom";

const pages = ['Login', 'Sign Up'];
const routes = ['/auth/login', '/auth/signUp'];

export const MainNavbar: React.FC = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
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
                            {pages.map((page, index) => (
                                <NavLink key={page} to={routes[index]}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                </NavLink>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', sm: 'flex'}, justifyContent: "flex-end"}}>
                        {pages.map((page, index) => (
                            <NavLink key={page} to={routes[index]}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {page}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
