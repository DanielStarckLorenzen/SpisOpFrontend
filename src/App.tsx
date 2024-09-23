import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar.tsx";
import Dashboard from "./pages/dashboard.tsx";
import Companies from "./pages/companies.tsx";
import Communities from "./pages/communities.tsx";
import MyProfile from "./pages/myProfile.tsx";
import Login from "./pages/login.tsx";

function App() {
  const userId = sessionStorage.getItem('userId');

  return (
    <Router>
      {/* Conditionally render Navbar if user is logged in */}
      {userId && <Navbar />}

      <Routes>
        {/* Protecting the dashboard and other routes if the user is not logged in */}
        {userId ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/community" element={<Communities />} />
            <Route path="/myProfile" element={<MyProfile />} />
            <Route path="*" element={<Dashboard />} /> {/* Fallback route */}
          </>
        ) : (
          // If not logged in, redirect to login page
          <Route path="*" element={<Navigate to="/login" />} />
        )}
        {/* Login page should be accessible even if the user is not logged in */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
