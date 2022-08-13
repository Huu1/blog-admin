import React from "react";
import {
  Route,
  unstable_HistoryRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Basic from "@/Layout/Basic";
import Home from "@/views/Home";
import LoginPage from "@/Layout/Login";
import { AuthProvider, RequireAuth } from "@/Layout/Auth";
import { customHistory } from "@/utils/history";
import Series from "@/views/Series";

function Test1() {
  return <div>test1</div>;
}

function App() {
  return (
    <AuthProvider>
      <Router history={customHistory}>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Basic />
              </RequireAuth>
            }
          >
            <Route index element={<Home />} />
            <Route path="series" element={<Series />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
