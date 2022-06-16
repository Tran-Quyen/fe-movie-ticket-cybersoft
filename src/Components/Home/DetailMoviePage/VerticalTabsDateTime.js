import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import * as Action from "../../../Store/action";
import DayofMovie from "./DayofMovie";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: "linear-gradient(145deg, #151417, #19181c)",
    boxShadow: "8px 8px 5px #0f0f11,-8px -8px 5px #1f1d23",
    display: "flex",
    height: "auto",
    marginBottom: 30,
    borderRadius: 20
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 86
  }
}));

function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [rap, setRap] = useState("BHDStar");
  const [theater, setTheater] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClick = event => {
    setRap(event.target.id);
  };
  useEffect(() => {
    props.getTheaterInfo();
    if (theater !== "") {
      setTheater(props.theaterInfo);
    }
  }, [theater]);
  useEffect(() => {
    setRap(rap);
  }, [rap]);
  const renderRap = () => {
    if (theater) {
      return theater.map((item, index) => {
        return (
          <Tab
            key={index}
            id={item.maHeThongRap}
            label={
              <img
                id={item.maHeThongRap}
                src={item.logo}
                onClick={handleClick}
                className="theaterIcon"
                alt="theater-Icon"
              />
            }
            {...a11yProps(index)}
          />
        );
      });
    }
  };
  const renderRapContent = () => {
    if (props.theaterInfo && props.movie) {
      return props.theaterInfo.map((item, index) => {
        return (
          <TabPanel key={index} value={value} index={index}>
            <DayofMovie movie={props.dateTimeMovie} id={props.id} maRap={rap} />
          </TabPanel>
        );
      });
    }
  };
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        {renderRap()}
      </Tabs>
      {rap !== "" ? renderRapContent() : <p className="detail-movie-no-choose-noti">Mời bạn bấm vào rạp để chọn lịch</p>}
    </div>
  );
}
const mapStateToProps = state => ({
  theaterInfo: state.movieReducer.theaterInfo
});
const mapDispatchToProps = dispatch => {
  return {
    getTheaterInfo: () => {
      dispatch(Action.actLayThongTinRap());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VerticalTabs);
