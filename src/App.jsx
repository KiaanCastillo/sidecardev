import { RoomPage } from "./components";
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/room/:id" element={<RoomPage/>}/>
      </Routes>
  </Router>
  );
}

export default App;
