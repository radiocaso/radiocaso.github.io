import { useRef, useState, useEffect } from "react";
import { useSiteSettings } from "@/domains/site/hooks/useSiteSettings";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  SpeakerSimpleXIcon,
  SpeakerSimpleHighIcon,
  SpeakerSimpleLowIcon,
} from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";
import { useNowPlaying } from "./useNowPlaying";
import usePlayer from "./usePlayer";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(1);
  const [volumeOpen, setVolumeOpen] = useState(false);
  const { currentAudio, isPlaying, setIsPlaying } = usePlayer();

  const { data: siteSettings, isLoading: siteSettingsLoading } =
    useSiteSettings();
  const { data, isLoading } = useNowPlaying();

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

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  if (isLoading || siteSettingsLoading) return null;

  const streamAudio = siteSettings?.streamUrl
    ? {
        url: siteSettings?.streamUrl,
        title: data?.title,
        artist: data?.artist,
      }
    : null;

  const audioToPlay = currentAudio ?? streamAudio;

  console.log(audioToPlay);
  console.log(data);

  return (
    <>
      <Separator />
      <div className="flex h-full items-center justify-start gap-4 p-4">
        <Button onClick={handlePlay} className="w-16">
          {isPlaying ? "pausa" : "play"}
        </Button>

        {data ? (
          <div>
            {data.artist} - <span className="italic">{data.title}</span>
          </div>
        ) : (
          <div>{siteSettings?.fallbackMessage}</div>
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

      {audioToPlay?.url && (
        <audio src={fixArchiveUrl(audioToPlay.url)} ref={audioRef}></audio>
      )}
    </>
  );
}

function fixArchiveUrl(url: string) {
  const fixed = url.replace(
    /^https:\/\/archive\.org\/details\//,
    "https://archive.org/download/",
  );

  console.log(fixed);
  return fixed;
}
