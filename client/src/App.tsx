import { useRef } from "react";
import "./App.css";
import VideoJsComponent from "./components/VideoJsComponent";
import videojs from "video.js";

function App() {
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "http://localhost:3000/video",
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <VideoJsComponent options={videoJsOptions} onReady={handlePlayerReady} />
  );
}

export default App;
