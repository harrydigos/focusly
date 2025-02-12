import YoutubeFactory from "youtube-player";
import {
  Accessor,
  Component,
  JSX,
  Setter,
  createContext,
  createEffect,
  createSignal,
  onMount,
  useContext,
} from "solid-js";
import PlayerStates from "youtube-player/dist/constants/PlayerStates";
import { YouTubePlayer } from "youtube-player/dist/types";

export interface YoutubeContextProps {
  player: Accessor<YouTubePlayer | undefined>;
  playerState: Accessor<PlayerStates>;
  volume: Accessor<number>;
  setVolume: Setter<number>;
  isMuted: Accessor<boolean>;
  toggleMute: () => void;
}

export const YoutubeContext = createContext<YoutubeContextProps>();

export const YoutubeProvider: Component<{
  children: JSX.Element;
}> = (props) => {
  const [container, setContainer] = createSignal<HTMLDivElement>();
  const [player, setPlayer] = createSignal<YouTubePlayer>();
  const [volume, setVolume] = createSignal(25);
  const [isMuted, setIsMuted] = createSignal(false);

  const [playerState, setPlayerState] = createSignal<PlayerStates>(
    PlayerStates.UNSTARTED,
  );

  onMount(() => {
    setPlayer(
      YoutubeFactory(container()!, {
        playerVars: {
          disablekb: 1,
          origin: "https://www.focusly.space",
        },
      }),
    );

    /* TODO: Give the option to select a space */
    player()?.loadVideoById("jfKfPfyJRdk");

    /* Default settings when player is initialized */
    player()?.stopVideo();
    player()?.setVolume(volume());

    player()?.on("stateChange", ({ data }) => setPlayerState(data));
  });

  createEffect(() => {
    player()?.setVolume(volume());
  });

  const toggleMute = () => {
    if (volume() === 0) {
      /**
       * When volume is 0, muted icon is displayed.
       * Volume equal to 0 and isMuted is the same thing but handled with 2 different signals.
       */
      setIsMuted(false);
      setVolume(25);
    } else {
      setIsMuted((prev) => !prev);
    }

    isMuted() ? player()?.mute() : player()?.unMute(); // Synchronize
  };

  return (
    <YoutubeContext.Provider
      value={{
        player,
        playerState,
        volume,
        setVolume,
        isMuted,
        toggleMute,
      }}
    >
      <div ref={setContainer} class="hidden" />
      {props.children}
    </YoutubeContext.Provider>
  );
};

export const useYoutubeContext = () => {
  const context = useContext(YoutubeContext);

  if (!context) {
    throw new Error("useYoutubeContext must be used within YoutubeProvider");
  }

  return context;
};
