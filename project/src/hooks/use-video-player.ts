import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import timeEndNormalization from '../helpers/timeend-normalization';

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

  const onPlayPauseVideo = () => {
    setPlayerOption({
      ...playerOption,
      isPlaying: !playerOption.isPlaying
    });
  };

  const onFullScreenOnOff = () => {
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
      playerOption.isFullscreen ? video.requestFullscreen() : document.exitFullscreen();
    }
  },[playerOption.isFullscreen, video]);

  const handleTimeProgress = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    if (video?.currentTime && video?.duration) {
      const progress = (video.currentTime / video.duration) * 100;
      const timeEnd = (video?.duration - video?.currentTime);
      setPlayerOption({
        ...playerOption,
        timeLine: progress,
        timeEnd: timeEndNormalization(timeEnd),
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
    onPlayPauseVideo,
    onFullScreenOnOff,
    handleChangeTimeLine,
    handleTimeProgress,
  };
};


