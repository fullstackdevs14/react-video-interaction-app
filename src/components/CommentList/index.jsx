import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { formatTime } from 'utils';

const CommentList = ({ comments }) => {
  return (
    <Timeline align="alternate">
      {comments.map((comment, index) => (
        <TimelineItem key={index.toString()}>
          <TimelineOppositeContent>
            <Typography variant="caption" color="textSecondary">
              {formatTime(comment.startTime)}
            </Typography>
            &nbsp;-&nbsp;
            <Typography variant="caption" color="textSecondary">
              {formatTime(comment.endTime)}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography>{comment.message}</Typography>
              </Box>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default CommentList;
