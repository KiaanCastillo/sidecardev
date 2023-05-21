import { RoomPage, LandingPage } from "./components";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/room/:id" element={<RoomPage />} />
      </Routes>
    </Router>
  );
}

export default App;
