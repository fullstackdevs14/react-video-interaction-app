import React, { useEffect, useRef, useState } from 'react';
import throttle from 'lodash/throttle';
import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import videojs from 'video.js';

const VideoPlayer = ({ onSaveClick, data, ...props }) => {
  const videoNode = useRef(null);
  const player = useRef(null);
  const wrapper = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [playTime, setPlayTime] = useState(0);
  const [layout, setLayout] = useState({});

  useEffect(() => {
    player.current = videojs(
      videoNode.current,
      {
        ...props,
        autoplay: false,
        responsive: true,
        loop: true,
      },
      () => {
        console.warn('Video Player Ready');

        player.current.on('timeupdate', () => {
          setPlayTime(player.current.currentTime());
        });

        player.current.on('loadeddata', () => {
          const offsets = videoNode.current.getBoundingClientRect();
          const { width, height } = player.current.currentDimensions();
          const videoWidth = player.current.videoWidth();
          const videoHeight = player.current.videoHeight();
          const ratio = Math.min(width / videoWidth, height / videoHeight);

          setLayout({
            x: offsets.x,
            y: offsets.y,
            width,
            height,
            videoWidth: videoWidth * ratio,
            videoHeight: videoHeight * ratio,
          });
        });
      }
    );

    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickPlayPause = () => {
    if (!playing) {
      player.current.play();
      setPlaying(true);
    } else {
      player.current.pause();
      setPlaying(false);
    }
  };

  const handleClickVideo = (e) => {
    const x = (e.clientX - layout.x - layout.width / 2) / layout.videoWidth;
    const y = (e.clientY - layout.y - layout.height / 2) / layout.videoHeight;
    onSaveClick && onSaveClick({ x, y, time: player.current.currentTime() });
  };

  const handleWheelVideo = (e) => {
    let currentTime = player.current.currentTime();
    currentTime = currentTime + e.deltaY * 0.1;
    if (currentTime < 0 || currentTime > player.current.duration()) {
      currentTime = 0;
    }
    setPlayTime(currentTime);
    player.current.currentTime(currentTime);
  };

  const throttledWheelHandler = throttle(handleWheelVideo, 500);

  const points = (data || [])
    .filter((item) => item.type === 'point' && parseInt(item.time) === parseInt(playTime))
    .map((item) => ({
      left: item.x * layout.videoWidth + layout.width / 2 - 3,
      top: item.y * layout.videoHeight + layout.height / 2 - 3,
    }));

  const comments = (data || []).filter(
    (item) =>
      item.type === 'comment' &&
      parseInt(playTime) >= parseInt(item.startTime) &&
      parseInt(playTime) <= parseInt(item.endTime)
  );

  return (
    <div className="video-player-container">
      <div
        className="video-player-overlay"
        onClick={handleClickVideo}
        onWheel={throttledWheelHandler}
      >
        <div data-vjs-player ref={wrapper}>
          <video ref={videoNode} className="video-js" />
        </div>

        {comments.length > 0 && (
          <div className="video-player-comment-list">
            {comments.map((comment, index) => (
              <div key={index.toString()} className="video-player-comment-list__item">
                {comment.message}
              </div>
            ))}
          </div>
        )}
        {points.map((style, index) => (
          <div key={index.toString()} className="video-player-point" style={style} />
        ))}
      </div>

      <div className="video-player-actions">
        <Fab color="primary" aria-label="add" onClick={handleClickPlayPause}>
          {playing ? <PauseIcon /> : <PlayArrowIcon />}
        </Fab>
      </div>
    </div>
  );
};

export default VideoPlayer;
