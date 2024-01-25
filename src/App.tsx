import { Routes, Route } from "react-router-dom";
import SigninForm from "./_auth/forms/SigninForm";
import SignupFrom from "./_auth/forms/SignupFrom";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import {
  AllUsers,
  CreatePost,
  Explore,
  Home,
  Saved,
  EditPost,
  PostDetails,
  Profile,
  UpdateProfile,
  LikedPosts,
} from "./_root/pages";
import { Toaster } from "./components/ui/toaster";
const App = () => {
  return (
    <main className=" flex h-screen ">
      <Routes>
        {/* {public routes} */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupFrom />} />
        </Route>
        {/* {private routes} */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/profile/:id/liked-posts" element={<LikedPosts />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
