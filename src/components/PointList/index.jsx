import React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { toPreciseNumber } from 'utils';
import { formatTime } from 'utils';

const PointList = ({ points, onClick, onClear }) => {
  const handleClickItem = (point) => {
    onClick && onClick(point);
  };

  const handleClickClear = () => {
    onClear && onClear();
  };

  if (!points || points.length === 0) {
    return (
      <Box p={2}>
        <Typography>There is no tracked points.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box p={2}>
        <Typography variant="caption">All points are calculated by percentage.</Typography>
        <Button color="secondary" onClick={handleClickClear}>
          Clear
        </Button>
      </Box>
      <List className="point-list">
        {points.map((item, index) => (
          <ListItem button key={index.toString()} onClick={() => handleClickItem(item)}>
            <ListItemText
              primary={`${formatTime(item.time)} => (${toPreciseNumber(item.x)}, ${toPreciseNumber(
                item.y
              )})`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default PointList;
