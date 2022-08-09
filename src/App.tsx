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

function Test1() {
  return <div>test1</div>;
}
function Test2() {
  return <div>test2</div>;
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
            <Route path="test1" element={<Test1 />} />
            <Route path="test2/test3" element={<Test2/>} />
            <Route path="test2/test4" element={<Test2/>} />
            <Route path="test2/test5" element={<Test2/>} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
