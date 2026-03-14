import PastTransmissionsList from "@/domains/transmission/components/PastTransmissionsList";
import usePlayer from "@/features/player/usePlayer";

export default function Archive() {
  const { setCurrentAudio, setIsPlaying, isPlaying } = usePlayer();
  return (
    <PastTransmissionsList
      //TODO:anda raro, se queda en pausa
      onPlay={(arg) => {
        console.log("playing", arg);
        if (isPlaying) {
          setIsPlaying(false);
        }
        setCurrentAudio(arg);
        setIsPlaying(true);
      }}
    />
  );
}
