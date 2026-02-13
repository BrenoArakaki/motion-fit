import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "@/routes/PrivateRoutes";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Navbar from "./components/navbar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Navbar />
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
