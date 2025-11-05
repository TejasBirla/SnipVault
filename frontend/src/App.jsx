import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/home/Navbar.jsx"
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard + Snippet Management */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create/snippets" element={<CreateSnip />} />
        <Route path="/my-snippets" element={<MySnip />} />
        <Route path="/edit-snippet/:id" element={<EditSnip />} />
        <Route path="/explore-snippets" element={<ExploreSnip />} />
        <Route path="/view-snippet/:id" element={<ViewSnip />} />
      </Routes>
    </div>
  );
}
