// import { Backdrop, Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import { height, width } from '@mui/system';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';



const drawerWidth = 220;
const miniDrawerWidth = 60;

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
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  }),
);


export const TransparentDrawer = styled(Drawer)(({ theme, open}) => ({
  '& .MuiDrawer-paper': {
      width: open ? drawerWidth : miniDrawerWidth,
      backgroundColor:'#408b84',
      color:'white',
      // transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
    },
    '& .sub-listitem1': { // Add hover effect to the sub-listitem
          width: '22px',
          height: '22px',
        },
    '& .listitem': {
      transition: 'background-color 0.2s ease, color 0.2s ease',
      '&:hover': {
        backgroundColor: 'white', 
        color: 'black', 
        '& .sub-listitem': { // Add hover effect to the sub-listitem
          width: '35px',
          height: '35px',
        },
        '& .sub-listitem1': { // Add hover effect to the sub-listitem
          width: '35px',
          height: '35px',
        },
      }, 
      '&:hover .listitem-dropdown ': {
        color: 'black', // Change text color to black on hover
      },
      '&:hover .logoutbtn':{
        color:'black'
      },
      
    },
    // '& .sublistitem': {
    //   transition: 'width 0.3s ease, height 0.3s ease', // Add transition for width and height
    //   '&:hover': {
    //     width: '100px', // Increase width on hover
    //     height: '100px', // Increase height on hover
    //   },

    // },
    // ...(open
    //   ? {
    //       '& .MuiBackdrop-root': {
    //         backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    //         backdropFilter: 'blur(5px)', // Apply blur effect
    //         transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
    //       },
    //     }
    //   : {
    //       '& .MuiBackdrop-root': {
    //         display: 'none',
    //       },
    //     }),
  }));