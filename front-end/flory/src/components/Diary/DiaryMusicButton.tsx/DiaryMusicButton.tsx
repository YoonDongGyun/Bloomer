import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { convertMusicFormat } from "../../../utils/utils";
import { SMusicWrapper } from "./styles";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";
import { updateIsPlaying } from "../../../redux/modules/music/music-slice";

interface DiaryMusicButtonProps {
  musicUrl: string;
}

const DiaryMusicButton = ({ musicUrl }: DiaryMusicButtonProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDetail, setIsDetail] = useState(false);
  const audioControl = useRef<HTMLAudioElement>(null);
  const music = useAppSelector((store) => store.music);
  const dispatch = useAppDispatch();

  const handlePlay = () => {
    if (audioControl.current) {
      if (music.isPlaying) {
        dispatch(updateIsPlaying(false));
      } else {
        dispatch(updateIsPlaying(true));
      }
    }
  };
  useEffect(() => {
    if (music.isPlaying && audioControl.current?.src) {
      audioControl.current.play();
      setIsPlaying(true);
    } else {
      audioControl.current?.pause();
      setIsPlaying(false);
    }

    if (music.isDetail) {
      setIsDetail(true);
    } else {
      setIsDetail(false);
    }
  }, [music, musicUrl]);

  return (
    <SMusicWrapper onClick={handlePlay}>
      {musicUrl && (
        <audio
          ref={audioControl}
          src={musicUrl}
          loop
          autoPlay
          controls
          id="myAudio"
        ></audio>
      )}
      {isDetail && (
        <FontAwesomeIcon
          className={`icon play`}
          icon={isPlaying ? faVolumeHigh : faVolumeMute}
        />
      )}
    </SMusicWrapper>
  );
};

export default DiaryMusicButton;
