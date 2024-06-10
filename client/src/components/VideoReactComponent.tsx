import { Player } from "video-react";
import "video-react/dist/video-react.css";

function VideoReactComponent() {
  return (
    <div className="video-container">
      <Player>
        <source src="http://localhost:3000/video" />
      </Player>
    </div>
  );
}

export default VideoReactComponent;
