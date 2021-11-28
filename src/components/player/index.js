import { createContext, useContext, useState } from "react";
import reactDom from "react-dom";

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
  const { showPlayer, setShowPlayer } = useContext(PlayerContext);
  return showPlayer
    ? reactDom.createPortal(
        <Overlay
          onClick={(e) => {
            setShowPlayer(false);
          }}
          {...restProps}
        >
          <Inner>
            <video
              id="netflix-player"
              controls
              onClick={(e) => e.stopPropagation()}
            >
              <source src={src} type="video/mp4" />
            </video>
            <Close src="/images/icons/close.png" alt="Close" />
          </Inner>
        </Overlay>,
        document.body
      )
    : null;
};

Player.Button = function PlayerButton({ ...restProps }) {
  const { showPlayer, setShowPlayer } = useContext(PlayerContext);
  return (
    <Button onClick={() => setShowPlayer((showPlayer) => !showPlayer)}>
      Play
    </Button>
  );
};