import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import SetPassword from "./pages/auth/SetPasswordPage";
import ProtectedRoute from "./components/ProtectedPage";
import Home from "./pages/blogs/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/set-password" element={<SetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />          {/* Homepage protected */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
