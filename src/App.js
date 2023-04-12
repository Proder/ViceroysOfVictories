import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Dash from "./pages/Dash";
import AdminLanding from "./pages/adminLanding";
import AdminDash from "./pages/AdminDash";
import NewUser from "./pages/NewUser";
import PlayerDisplay from "./pages/PlayerDisplay";
import PlayerDash from "./pages/PlayerDash";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
