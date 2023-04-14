import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Dash from "./pages/Dash";
import AdminDash from "./pages/AdminDash";
import NewUser from "./pages/NewUser";
import PlayerDisplay from "./pages/PlayerDisplay";
import PlayerDash from "./pages/PlayerDash";
import Cricket from "./pages/CRICKET";
import Badminton from "./pages/Badminton";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Dash />} />
          <Route path="/PlayerDash" element={<PlayerDash />} />
          <Route path="/AdminDash" element={<AdminDash />} />
          <Route path="/NewUser" element={<NewUser />} />
          <Route path="/PlayerDisplay" element={<PlayerDisplay />} />
          <Route path="/Cricket" element={<Cricket />} />
          <Route path="/Badminton" element={<Badminton />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
