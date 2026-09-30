import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard.jsx";
import ProcessFile from "./pages/ProcessFile";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";

const App = () => {
  return (
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected dashboard pages */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/process" element={<ProcessFile />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Route>

        {/* Fallback */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
  );
};

export default App;