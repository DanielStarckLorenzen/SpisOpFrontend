import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/navbar.tsx";
import Dashboard from "./pages/dashboard.tsx";
import Companies from "./pages/companies.tsx";
import Communities from "./pages/communities.tsx";
import MyProfile from "./pages/myProfile.tsx";


function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/community" element={<Communities />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="*" element={<Dashboard />} /> {/* Fallback route */}
      </Routes>
    </Router>
  );
}

export default App;
