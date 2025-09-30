import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import PostFeed from "./pages/blogs/PostFeed";
import PostDetailPage from "./pages/blogs/PostDetailPage";
import PublicRoute from "./components/PublicLayout";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedPage";
import HomeLayout from "./pages/blogs/HomeLayout";
import MyPosts from "./pages/blogs/MyPosts";
import CreatePost from "./pages/blogs/CreatePost";
import UserProfile from "./pages/blogs/UserProfile";
import SetPassword from "./pages/auth/SetPasswordPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PublicRoute />}>
          <Route index element={<PostFeed />} />
          <Route path="posts/:id" element={<PostDetailPage />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="set-password" element={<SetPassword />} />
        </Route>

        {/* 🔒 Private Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<HomeLayout />}>
            <Route path="/home" element={<MyPosts />} />
            <Route path="myposts" element={<MyPosts />} />
            <Route path="create" element={<CreatePost />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Route>
        

      </Routes>

       <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>

    
  );
}

export default App;
