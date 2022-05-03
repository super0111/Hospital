import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Link from '@material-ui/core/Link';

const drawerWidth = "100%!important";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    opacity: "0.8!important",
    backgroundColor: "#7eaaf8!important"

  },
  drawerPaper: {
    width: drawerWidth,
    padding: "0 30px",
    height: 326,
    background: "#1551a1",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  menuTitle : {
    color: "white",
    fontSize: 18,
  },
  listItemText : {
    color: "white",
    fontSize: 18,
    textDecoration: "none!important",
    margin: "10px 0",
  },
  menuIcon : {
    color: "white",
    fontSize: 25,
  },
  dFlex : {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "10px 30px",
  },
  navDrawWidth : {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer"
  }
}));

const sections1 = [
  { title: "Home", url: '/' },
  { title: 'Login', url: '/login'},
  { title: 'Register', url: '/register' },
  { title: 'PasswordPut', url: 'passwordPut' },
  { title: 'Contact Us', url: '#' },
];

const NavMenuDraw = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <IconButton
        style={{color:"white"}}
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton, open && classes.hide)}
        >
        <MenuIcon style={{fontSize:30}} />
      </IconButton>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div onClick={handleDrawerClose}className={classes.navDrawWidth}>
          <IconButton className={classes.menuIcon} >
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <div className={classes.menuTitle}>Menu</div>   
        </div>
        <Divider />
        <List className={classes.dFlex}>
          {sections1.map((section1, index) => (
            <Link
                wrap = "true"
                key={section1.title}
                href={section1.url}
                className={classes.listItemText}
            >
              {section1.title}
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
export default NavMenuDraw;