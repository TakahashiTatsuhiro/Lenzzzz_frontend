import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ItemsList from "./components/ItemsList";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Registrations from "./components/Registrations";
import DetailItem from "./components/DetailItem";
import RegistUser from "./components/RegistUser";
import { AutoLogin } from "./components/AutoLogin";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<AutoLogin />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/users/new" element={<RegistUser />} />
          <Route
            path="/items"
            element={
              <ProtectedRoute>
                <ItemsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/items/show/:index"
            element={
              <ProtectedRoute>
                <DetailItem />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/registrations"
            element={
              <ProtectedRoute>
                <Registrations />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
