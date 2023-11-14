import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { 
  AppBar, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Typography, 
  useMediaQuery 
} from '@mui/material';
import UsersIcon from '@mui/icons-material/Group';
import ReportIcon from '@mui/icons-material/Report';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function DefaultLayout({ children }: { children: React.ReactElement }) {
  const [isOpened, setIsOpened] = React.useState<boolean>(false);

  const navigate = useNavigate();
  const isMobileView = useMediaQuery('(max-width:1024px)');

  const toggleDrawer = (open: boolean) => () => setIsOpened(open);

  const navigateHandler = (param: string) => () => navigate(param);

  return (
    <Box display="flex" maxWidth="100%" minHeight="100vh">
      {
        !isMobileView ?
        <Box className="max-w-[350px] border-r border-lightgray pt-50">
          <List>
            {['Users', 'Reports', 'Analytics'].map(text => (
              <ListItem  key={text} disablePadding onClick={navigateHandler(`/${text.toLowerCase()}`)}>
                <ListItemButton>
                  <ListItemIcon className="!min-w-0 pr-15">
                    {
                      text === "Users" ? 
                      <UsersIcon /> : 
                        text === "Reports" ?
                        <ReportIcon /> :
                          <AnalyticsIcon />
                    }
                  </ListItemIcon>

                  <ListItemText primary={text} className="pr-100" />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box> :
        null
      }

      <Box flexGrow={1}>
        <AppBar position="static" className="border-l border-lightgray h-min !w-auto grow">
          <Toolbar>
            <Typography variant="h6" component="div" className={`grow ${!isMobileView ? "text-center" : ""}`}>
              Dashboard Application
            </Typography>
            {
              isMobileView ?
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                className="focus:outline-0"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>: 
              null
            }
          </Toolbar>
        </AppBar>

          <Box py="50px" px={isMobileView ? "20px" : "50px"}>
            { children }
          </Box>
      </Box>

      <Drawer
        anchor="left"
        open={isOpened}
        onClose={toggleDrawer(false)}
      >
        <IconButton
          className="w-max mb-0 !ml-20 !mt-10 float-right"
          onClick={toggleDrawer(false)}
        >
          <CloseIcon />
        </IconButton>

        <Box className="pt-10 pl-30 pr-100 mb-20" flexDirection="column" display="flex" width={250}>
          <NavLink 
            className={({ isActive }) => isActive ? "font-bold text-lg my-5" : "my-5 transition-all"}
            to="/users"
          >Users</NavLink>
          <NavLink 
            className={({ isActive }) => isActive ? "font-bold text-lg my-5" : "my-5 transition-all"}
            to="/reports"
          >Reports</NavLink>
          <NavLink 
            className={({ isActive }) => isActive ? "font-bold text-lg my-5" : "my-5 transition-all"}
            to="/analytics"
          >Analytics</NavLink>
        </Box>

        <Divider />
      </Drawer>
    </Box>
  );
}