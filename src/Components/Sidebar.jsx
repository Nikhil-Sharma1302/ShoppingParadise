import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
} from '@mui/material';
import { Add, Edit, Delete, Home } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle, isMobile }) => {
  const drawerContent = (
    <Box>
      <List>
        {[
          { text: 'Add Product', icon: <Add />, path: '/admin/add' },
          { text: 'Edit Product', icon: <Edit />, path: '/admin/edit' },
          { text: 'Delete Product', icon: <Delete />, path: '/admin/delete' },
          {text:'Go to Home',icon:<Home/>,path:'/home'}
        ].map((item) => (
          <ListItem
            button
            key={item.text}
            component={NavLink}
            to={item.path}
            sx={{
              '&.active': { backgroundColor: '#f5f5f5' },
              '&:hover': { backgroundColor: '#f0f0f0' },
            }}
            onClick={isMobile ? handleDrawerToggle : undefined}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

   const drawerContent2 = (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        {[
          { text: 'Add Product', icon: <Add />, path: '/admin/add' },
          { text: 'Edit Product', icon: <Edit />, path: '/admin/edit' },
          { text: 'Delete Product', icon: <Delete />, path: '/admin/delete' },
          {text:'Go to Home',icon:<Home/>,path:'/home'}
        ].map((item) => (
          <ListItem
            button
            key={item.text}
            component={NavLink}
            to={item.path}
            sx={{
              '&.active': { backgroundColor: '#f5f5f5' },
              '&:hover': { backgroundColor: '#f0f0f0' },
            }}
            onClick={isMobile ? handleDrawerToggle : undefined}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return isMobile ? (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': { width: drawerWidth },
      }}
    >
      {drawerContent2}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      open
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
