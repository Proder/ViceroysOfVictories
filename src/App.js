import "./pages/AdminDash.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Dash from "./pages/Login";
import AdminDash from "./pages/Admin/AdminDash";
import NewUser from "./pages/Admin/NewUser";
import PlayerDisplay from "./pages/Admin/PlayerDisplay";
import PlayerDash from "./pages/Player/PlayerDash";
import Cricket from "./pages/Player/CRICKET";
import Badminton from "./pages/Player/Badminton";
import TT from "./pages/Player/TT";
import Football from "./pages/Player/Football";
import GuestDash from "./pages/Guest/GuestDash";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Dash />} />
          <Route exact path="/GuestDash" element={<GuestDash />} />
          <Route path="/PlayerDash" element={<PlayerDash />} />
          <Route path="/AdminDash" element={<AdminDash />} />
          <Route path="/NewUser" element={<NewUser />} />
          <Route path="/PlayerDisplay" element={<PlayerDisplay />} />
          <Route path="/Cricket" element={<Cricket />} />
          <Route path="/Badminton" element={<Badminton />} />
          <Route path="/TT" element={<TT />} />
          <Route path="/Football" element={<Football />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
