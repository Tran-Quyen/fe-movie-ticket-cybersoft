import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import VerticalTabsDateTime from "./VerticalTabsDateTime";
import CommentList from "./commentList";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

export default function CenteredTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <Paper className={classes.root} id="detail">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          className="detailSec2"
        >
          <Tab label="Đặt vé" {...a11yProps(0)} style={{ color: "white" }} />
          <Tab label="Đánh giá" {...a11yProps(1)} style={{ color: "white" }} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <VerticalTabsDateTime
            DateTime={props.DateTime}
            movie={props.movie}
            id={props.id}
            theaterInfo={props.theaterInfo}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CommentList id={props.id} danhGia={props.movie.danhGia} />
        </TabPanel>
      </Paper>
    </React.Fragment>
  );
}
