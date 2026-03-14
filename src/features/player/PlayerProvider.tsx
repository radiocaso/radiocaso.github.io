import { createContext, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import type { CurrentAudio } from "./types";

type PlayerContextType = {
  currentAudio: CurrentAudio | null;
  setCurrentAudio: Dispatch<SetStateAction<CurrentAudio | null>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
};

type PlayerProviderProps = {
  children: ReactNode;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

const PlayerProvider = ({ children }: PlayerProviderProps) => {
  // const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentAudio, setCurrentAudio] = useState<CurrentAudio | null>(null);

  //TODO: investigar mas que onda con tener en audio aca
  return (
    <PlayerContext.Provider
      value={{ currentAudio, setCurrentAudio, isPlaying, setIsPlaying }}
    >
      {/* <audio ref={audioRef} preload="none" /> */}
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
