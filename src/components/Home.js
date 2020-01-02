import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import {FixedSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import {getLatestTerms, setTerm} from "../actions";

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3} style={{display: "flex", flex: 1, flexDirection: "column"}}>
        {children}
      </Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const sampleWords = useSelector(state => state.latestTerms);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Row = ({index, style}) => (
    <div
      className="ListItem"
      style={style}
      onClick={() => {
        dispatch(setTerm(sampleWords[index]));
        history.push("/term/" + sampleWords[index]);
      }}
    >
      {sampleWords[index]}
    </div>
  );

  useEffect(() => {
    dispatch(getLatestTerms());
  }, [dispatch]);

  return (
    <div className={[classes.root, "homeColumn"].join(" ")}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          variant="fullWidth"
        >
          <Tab label="Latest Words" wrapped {...a11yProps(0)} />
          <Tab
            label="Most Views (coming soon)"
            wrapped
            disabled={true}
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabPanel value={value} index={0} style={{flex: 1, display: "flex"}}>
          <div
            style={{
              display: "flex",
              flex: 1
            }}
          >
            <AutoSizer>
              {({height, width}) => (
                <List
                  className="List"
                  height={height}
                  itemCount={sampleWords.length}
                  itemSize={70}
                  width={width}
                >
                  {Row}
                </List>
              )}
            </AutoSizer>
          </div>
        </TabPanel>
      )}
      {value === 1 && (
        <TabPanel value={value} index={1}>
          Most Views
        </TabPanel>
      )}
    </div>
  );
}
