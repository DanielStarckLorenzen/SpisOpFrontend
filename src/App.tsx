import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar.tsx";
import Dashboard from "./pages/dashboard.tsx";
import Companies from "./pages/companies.tsx";
import Communities from "./pages/communities.tsx";
import MyProfile from "./pages/myProfile.tsx";
import Login from "./pages/login.tsx";
import { useEffect, useState } from "react";
import { User } from "./types/User.ts";
import { getUser } from "./api/userApi.ts";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId")?.replace(/"/g, "");
    if (userId) {
      getUser(userId).then((userData) => {
        setUser(userData);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {user && <Navbar user={user} />}

      <Routes>
        {user ? (
          <>
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/companies" element={<Companies user={user} />} />
            <Route path="/community" element={<Communities user={user} />} />
            <Route path="/myProfile" element={<MyProfile user={user} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} /> {/* Fallback route */}
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to login if not logged in */}
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
