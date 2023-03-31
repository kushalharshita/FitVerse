import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
      <List>
        <ListItem component={Link} to="/dashboard">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={Link} to="/profile">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem component={Link} to="/workout-environment-form">
          <ListItemIcon>
            <FitnessCenterIcon />
          </ListItemIcon>
          <ListItemText primary="Environments" />
        </ListItem>
        <ListItem component={Link} to="/workouts">
          <ListItemIcon>
            <FitnessCenterIcon />
          </ListItemIcon>
          <ListItemText primary="Workouts" />
        </ListItem>
        <ListItem component={Link} to="/fitnessroutine">
          <ListItemIcon>
            <FitnessCenterIcon />
          </ListItemIcon>
          <ListItemText primary="Fitness Routine" />
        </ListItem>
        <ListItem component={Link} to="/fitnesstable">
          <ListItemIcon>
            <FitnessCenterIcon />
          </ListItemIcon>
          <ListItemText primary="Exercises" />
        </ListItem>
        <ListItem component={Link} to="/demoworkout">
          <ListItemIcon>
            <FitnessCenterIcon />
          </ListItemIcon>
          <ListItemText primary="Demo Workout" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem component={Link} to="/" >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FitVerse
          </Typography>
          
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        {drawer}
      </Drawer>
      <Box sx={{ mt: 8, mx: 4 }}>{children}</Box>
    </Box>
  );
};

export default Layout;