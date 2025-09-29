import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import SetPassword from "./pages/auth/SetPasswordPage";
import ProtectedRoute from "./components/ProtectedPage";
import Home from "./pages/blogs/HomeLayout";
import PostFeed from "./pages/blogs/PostFeed";
import MyPosts from "./pages/blogs/MyPosts";
import UserProfile from "./pages/blogs/UserProfile";
import { ToastContainer } from 'react-toastify';
import CreatePost from "./pages/blogs/CreatePost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/set-password" element={<SetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />}>
            <Route index element={<PostFeed />} />       // default child
            <Route path="create" element={<CreatePost />} />
            <Route path="myposts" element={<MyPosts />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>         {/* Homepage protected */}
        </Route>

      </Routes>

       <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>

    
  );
}

export default App;
