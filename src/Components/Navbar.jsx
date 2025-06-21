import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { useLogin } from '../LoginContext';

const navItems = [
  { label: 'Home', path: '/home' },
  { label: 'Cart', path: '/cart' },
  { label: 'Admin Panel', path: '/admin' },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const cart = useLogin();

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    cart.logout();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        {/* Mobile menu icon */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>

        {/* App title left aligned */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Shopping Paradise
        </Typography>

        {/* Customer name centered (only on md and up) */}
        {!isMobile && (
          <Typography
            variant="h6"
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              fontWeight: 'bold',
            }}
          >
            {cart.user?.name}
          </Typography>
        )}

        {/* Nav buttons & logout for desktop */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={NavLink}
              to={item.path}
              sx={{
                color: 'white',
                '&.active': {
                  borderBottom: '2px solid white',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        {/* Mobile menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {navItems.map((item) => (
            <MenuItem
              key={item.label}
              component={NavLink}
              to={item.path}
              onClick={handleClose}
            >
              {item.label}
            </MenuItem>
          ))}
          <MenuItem
            onClick={() => {
              handleClose();
              handleLogout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
