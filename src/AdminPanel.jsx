import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AddProduct from './Components/AddProduct';
import EditProduct from './Components/EditProduct';
import DeleteProduct from './Components/DeleteProduct';
import Sidebar from './Components/Sidebar';
import {
  Box,
  CssBaseline,
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


const drawerWidth = 220;

const AdminPanel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
    <Box sx={{ display: 'flex',flexWrap:'wrap' }}>
      <CssBaseline />

      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Admin Panel
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Sidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: isMobile ? 0 : `${drawerWidth}px`,
        }}
      >
        {isMobile && <Toolbar />} 
        <Routes>
          <Route path="add" element={<AddProduct />} />
          <Route path="edit" element={<EditProduct />} />
          <Route path="delete" element={<DeleteProduct />} />
        </Routes>
      </Box>
    </Box></>
  );
};

export default AdminPanel;
