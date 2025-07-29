import React from "react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import { Toaster } from "react-hot-toast";
import MyFriends from "./pages/MyFriends.jsx"
import PageLoader from "./components/PageLoder.jsx";

import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";
const App = () => {
  
  const {theme}=useThemeStore()
  const {isLoading,authUser}=useAuthUser()
 const isAuthenticated=Boolean(authUser);
 const isOnboarded=authUser?.isOnboarded;

  if (isLoading) {
    return (<PageLoader/>)
  }
  return (
    <div className=" h-screen text-5xl" data-theme={theme}>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated  && isOnboarded ? (<Layout showSidebar={true}><HomePage /></Layout>)  : (<Navigate to={!isAuthenticated?"/login": "/onboarding"} />)}
        />
          <Route
          path="/friends"
          element={isAuthenticated  && isOnboarded ? (<Layout showSidebar={true}> <MyFriends/> </Layout>)  : (<Navigate to={!isAuthenticated?"/login": "/onboarding"} />)}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded? "/":"/onboarding"} />}
        />
        <Route
          path="/call/:id"
          element={isAuthenticated && isOnboarded ? <CallPage /> : <Navigate to={!isAuthenticated?"/login":"/onboarding"} />}
        />
        <Route
          path="/notifications"
          element={isAuthenticated && isOnboarded? <Layout showSidebar={true}> <NotificationPage /> </Layout>  :( <Navigate to={!isAuthenticated?"/login":"/onboarding"} />)}
        />
        <Route
          path="/chat/:id"
          element={isAuthenticated && isOnboarded? (<Layout showSidebar={true}><ChatPage /></Layout> ) : <Navigate to={!isAuthenticated?"/login":"/onboarding"} />}
        />
        <Route
          path="/onboarding"
          element={isAuthenticated ? (<OnboardingPage />) : <Navigate to="/login" />}
        />
       
      </Routes>
    </div>
  );
};

export default App;
