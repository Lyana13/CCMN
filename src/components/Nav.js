import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import BarChartTwoToneIcon from '@material-ui/icons/BarChartTwoTone';
import RoomSharpIcon from '@material-ui/icons/RoomSharp';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const currentTab = window.location.pathname.split("/")[1];

  return (
      <Container>
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={currentTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab value="floor" component={Link} to="/floor" label="Floors" icon={<BarChartTwoToneIcon />} {...a11yProps(5)} />
          <Tab value="content" component={Link} to="/content" label="Analytics and Presence" icon={<RoomSharpIcon />} {...a11yProps(6)} />
          <Tab value="chart" component={Link} to="/chart" label="Forecasting" icon={<EqualizerIcon />} {...a11yProps(5)} />
          <Tab value="corelation" component={Link} to="/corelation" label="Corelation" icon={<ImportantDevicesIcon />} {...a11yProps(11)} />
        </Tabs>
      </AppBar>
    </div>
    </Container>
  );
}