import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3} style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>{children}</Box>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Row = ({ index, style }) => (
  <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
    Row {index}
  </div>
);

export default function Home() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>

      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Latest Words" {...a11yProps(0)} />
          <Tab label="Most Views" {...a11yProps(1)} />
          <Tab label="Highest Voted" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} style={{ border: '3px solid red', flex: 1, display: 'flex' }}>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          style={{ border: '3px solid green', marginLeft: 'auto', marginRight: 20, display: 'block', width: '20%' }}
        >
          <ToggleButton value="left" aria-label="left aligned">
            Week
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered">
            Month
          </ToggleButton>
          <ToggleButton value="right" aria-label="right aligned">
            All time
          </ToggleButton>
        </ToggleButtonGroup>
        <div
        style={{border: '1px solid orange', display: 'flex', flex: 1}}
        >
        <AutoSizer>
    {({ height, width }) => (
      <List
        className="List"
        height={height}
        itemCount={1000}
        itemSize={35}
        width={width}
      >
        {Row}
      </List>
    )}
  </AutoSizer>
  
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Most Views
      </TabPanel>
      <TabPanel value={value} index={2}>
        Highest Voted
      </TabPanel>
    </div>
  );
}
