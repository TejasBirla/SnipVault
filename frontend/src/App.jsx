import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/home/Navbar.jsx";
import Hero from "./components/home/Hero.jsx";
import Footer from "./components/home/Footer.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import ExampleSnip from "./components/snippets/ExampleSnip.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import CreateSnip from "./components/snippets/CreateSnip.jsx";
import MySnip from "./components/snippets/MySnip.jsx";
import EditSnip from "./components/snippets/EditSnip.jsx";
import ExploreSnip from "./components/snippets/ExploreSnip.jsx";
import ViewSnip from "./components/snippets/ViewSnip.jsx";
import "devicon/devicon.min.css";
import ProtectedRoute from "./Providers/ProtectedRoute.jsx";
import PublicRoute from "./Providers/PublicRoute.jsx";

export default function App() {
  return (
    <div data-theme="light" className="min-h-screen flex flex-col">
      <Routes>
        {/* Main Landing Page */}
        <Route
          path="/"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Hero />
              </main>
              <Footer />
            </div>
          }
        />

        {/* Example Snippet Page */}
        <Route
          path="/example/snip"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <ExampleSnip />
              </main>
              <Footer />
            </div>
          }
        />

        {/* Auth Pages (no navbar/footer) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Dashboard + Snippet Management */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create/snippets"
          element={
            <ProtectedRoute>
              <CreateSnip />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-snippet/:id"
          element={
            <ProtectedRoute>
              <EditSnip />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-snippets"
          element={
            <ProtectedRoute>
              <MySnip />
            </ProtectedRoute>
          }
        />

        <Route
          path="/explore-snippets"
          element={
            <ProtectedRoute>
              <ExploreSnip />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-snippet/:id"
          element={
            <ProtectedRoute>
              <ViewSnip />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
