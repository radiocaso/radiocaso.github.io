//TODO: no se porque serian dos

export interface NowPlayingResponse {
  title: string;
  artist: string;
  album?: string;
}

export interface CurrentAudio {
  title: string;
  artist: string;
  url: string;
  album?: string;
}
