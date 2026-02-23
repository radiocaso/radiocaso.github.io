import { useRef, useState, useEffect } from "react";
import { useSiteSettings } from "@/domains/site/hooks/useSiteSettings";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  SpeakerSimpleXIcon,
  SpeakerSimpleHighIcon,
  SpeakerSimpleLowIcon,
} from "@phosphor-icons/react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [data, setData] = useState<{
    artist: string;
    title: string;
  } | null>(null);
  const [volume, setVolume] = useState(1);
  const [volumeOpen, setVolumeOpen] = useState(false);

  const { data: initialData } = useSiteSettings();

  const isHoverSupported =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches;
  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value: number[]) => {
    if (!audioRef.current) return;
    const newVolume = value[0];
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const currentAudio = { url: initialData?.streamUrl };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // TODO: resolver esto
  const fetchData = () => {
    fetch("https://www.radiojar.com/api/stations/34efk49zvncwv/now_playing/")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
      });
  };

  // Fetch the data on mount and then every 15 seconds
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="border-accent/40 flex h-full items-center justify-start gap-4 border-t p-4">
        <Button onClick={handlePlay} className="w-16">
          {isPlaying ? "pausa" : "play"}
        </Button>

        {data ? (
          <div>
            {data.artist} - <span className="italic">{data.title}</span>
          </div>
        ) : (
          <div>sonando ahora x RADIO CASo</div>
        )}

        <div className="size-2 animate-pulse rounded-full bg-red-500" />

        <div
          className="relative ml-auto flex items-center"
          onMouseEnter={() => isHoverSupported && setVolumeOpen(true)}
          onMouseLeave={() => isHoverSupported && setVolumeOpen(false)}
        >
          <Button
            size="icon"
            variant="ghost"
            onClick={() => !isHoverSupported && setVolumeOpen((p) => !p)}
            className="cursor-pointer"
          >
            {volume === 0 ? (
              <SpeakerSimpleXIcon className="h-4 w-4" />
            ) : volume > 0.5 ? (
              <SpeakerSimpleHighIcon className="h-4 w-4" />
            ) : (
              <SpeakerSimpleLowIcon className="h-4 w-4" />
            )}
          </Button>

          {volumeOpen && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 pt-2 pb-2">
              <div className="bg-background animate-in fade-in zoom-in-95 rounded-xl border p-3 shadow-lg duration-150">
                <Slider
                  orientation="vertical"
                  value={[volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="h-24 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {currentAudio?.url && (
        <audio src={currentAudio.url} ref={audioRef}></audio>
      )}
    </>
  );
}
