import React, { useState } from 'react';
import orderBy from 'lodash/orderBy';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import VideoPlayer from 'components/VideoPlayer';
import PointList from 'components/PointList';
import CommentList from 'components/CommentList';
import videoFile from 'assets/videos/sample.mp4';
import { COMMENTS } from 'common/mock';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Paper className="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </Paper>
  );
}

const Main = () => {
  const [tab, setTab] = useState(0);
  const [points, setPoints] = useState([]);

  const handleChangeTab = (_, newTab) => {
    setTab(newTab);
  };

  const handleAddPoint = (pos) => {
    setPoints(orderBy([...points, { ...pos, type: 'point' }], 'time'));
  };

  const handleClickClear = () => {
    setPoints([]);
  };

  return (
    <div className="app">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Video Interaction</Typography>
        </Toolbar>
      </AppBar>

      <div className="main">
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <VideoPlayer
              sources={[{ src: videoFile, type: 'video/mp4' }]}
              onSaveClick={handleAddPoint}
              data={[...points, ...COMMENTS.map((item) => ({ ...item, type: 'comment' }))]}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <AppBar position="static">
              <Tabs value={tab} onChange={handleChangeTab}>
                <Tab label="Comments" />
                <Tab label="Tracking" />
              </Tabs>
            </AppBar>
            <TabPanel value={tab} index={0}>
              <CommentList comments={COMMENTS} />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <PointList points={points} onClear={handleClickClear} />
            </TabPanel>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Main;
