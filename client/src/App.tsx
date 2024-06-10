import { Player } from "video-react";
import "video-react/dist/video-react.css";
import "./App.css";

function App() {
  return (
    <div className="video-container">
      <Player>
        <source src="http://localhost:3000/video" />
      </Player>
    </div>
  );
}

export default App;
