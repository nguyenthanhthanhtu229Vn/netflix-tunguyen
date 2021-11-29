import { createContext, useContext, useState } from "react";
import reactDom from "react-dom";
import YouTube from "react-youtube";
import { Container, Button, Overlay, Inner, Close } from "./styles/player";

export const PlayerContext = createContext();

export default function Player({ children, ...restProps }) {
  const [showPlayer, setShowPlayer] = useState(false);
  return (
    <PlayerContext.Provider value={{ showPlayer, setShowPlayer }}>
      <Container {...restProps}>{children}</Container>
    </PlayerContext.Provider>
  );
}

Player.Video = function PlayerVideo({ src, ...restProps }) {
  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const { showPlayer, setShowPlayer } = useContext(PlayerContext);
  // console.log(showPlayer);
  return showPlayer
    ? reactDom.createPortal(
        <Overlay
          onClick={(e) => {
            setShowPlayer(false);
            // console.log(showPlayer);
          }}
          {...restProps}
        >
          <Inner>
            <YouTube
              videoId={src}
              opts={opts}
              onClick={(e) => e.stopPropagation()}
            ></YouTube>
          </Inner>
        </Overlay>,
        document.body
      )
    : null;
};

Player.Button = function PlayerButton({ ...restProps }) {
  const { showPlayer, setShowPlayer } = useContext(PlayerContext);
  return (
    <Button
      onClick={() => {
        setShowPlayer(true);
        console.log("asas");
      }}
    >
      Play
    </Button>
  );
};
