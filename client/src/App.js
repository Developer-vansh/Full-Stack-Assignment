import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React, { useState } from "react";
import Post from "./Components/PostPage/Post";
import LoadingBar from "react-top-loading-bar";
import Signup from "./Components/SignUpPage/Signup";
import Home from "./Components/HomePage/Home";

const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        {localStorage.getItem("accessToken") ? (
          <>
            <LoadingBar
              height={3}
              color="#f11946"
              progress={progress}
              onLoaderFinished={() => setProgress(0)}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                exact
                path="/posts"
                element={<Post setProgress={setProgress} pagesize={6} />}
              />
            </Routes>
          </>
        ) : (
          <Signup />
        )}
      </Router>
    </div>
  );
};

export default App;
