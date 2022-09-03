import { ChangeEvent, useEffect, useState } from 'react';
import countEndTime from '../helpers/count-end-time';

interface IVideoPlayerState {
  isPlaying: boolean,
  isFullscreen: boolean,
  timeLine: number,
  timeEnd: string,
}

export const useVideoPlayer = (video: HTMLVideoElement | null) => {
  const [playerOption, setPlayerOption] = useState<IVideoPlayerState>({
    isPlaying: false,
    isFullscreen: false,
    timeLine: 0,
    timeEnd: '',
  });

  const handlePlayPauseVideo = () => {
    setPlayerOption({
      ...playerOption,
      isPlaying: !playerOption.isPlaying
    });
  };

  const handleFullScreenOnOff = () => {
    setPlayerOption({
      ...playerOption,
      isFullscreen: !playerOption.isFullscreen
    });
  };

  useEffect(() => {
    playerOption.isPlaying ? video?.play() : video?.pause();
  },[playerOption.isPlaying, video]);

  useEffect(() => {
    if (video) {
      playerOption.isFullscreen && video.requestFullscreen();
    }
  },[playerOption.isFullscreen, video]);

  useEffect(() => {
    if (document.fullscreenElement === null) {
      setPlayerOption({
        ...playerOption,
        isFullscreen: false
      });
    }
  }, [playerOption.isFullscreen, document.fullscreenElement]);

  const handleTimeProgress = () => {
    if (video?.currentTime && video?.duration) {
      const progress = (video.currentTime / video.duration) * 100;
      const timeEnd = (video?.duration - video?.currentTime);
      setPlayerOption({
        ...playerOption,
        timeLine: progress,
        timeEnd: countEndTime(timeEnd),
      });
    }
  };

  const handleChangeTimeLine = (e: ChangeEvent<HTMLInputElement>) => {
    const changeTimeLine = Number(e.target.value);
    if (video?.currentTime && video?.duration) {
      video.currentTime = (video.duration / 100) * changeTimeLine;
      setPlayerOption({
        ...playerOption,
        timeLine: playerOption.timeLine,
      });
    }
  };

  return {
    playerOption,
    handlePlayPauseVideo,
    handleFullScreenOnOff,
    handleChangeTimeLine,
    handleTimeProgress,
  };
};


