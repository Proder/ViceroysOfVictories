import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Dash from "./pages/Dash";
import AdminLanding from "./pages/adminLanding";
import AdminDash from "./pages/AdminDash";
import NewUser from "./pages/NewUser";
import Sports from "./pages/Sports";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Dash />} />
          <Route path="/adminLanding" element={<AdminLanding />} />
          <Route path="/Sports" element={<Sports />} />
          <Route path="/AdminDash" element={<AdminDash />} />
          <Route path="/NewUser" element={<NewUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
