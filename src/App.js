import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import BlogList from "./components/BlogList";
import BlogCreate from "./components/BlogCreate";
import BlogDetail from "./components/BlogDetail";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignupPage";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="App">
      <Router>
        <Header
          setSearchResults={setSearchResults}
        />
        <div className="container-fluid mt-5 pt-3">
          <Routes>
            <Route
              path="/"
              element={
                <BlogList
                  searchResults={searchResults}
                />
              }
            />
            <Route path="/:blogId" element={<BlogDetail />} />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <BlogCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:blogId/edit"
              element={
                  <BlogCreate />
              }
            />
            <Route
              path="/login"
              element={<LoginPage />}
            />
            <Route
              path="/signup"
              element={<SignUpPage />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
