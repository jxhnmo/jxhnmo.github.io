import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./components/variables.css" // colour variables
import { HashRouter as Router, Route, Routes } from "react-router-dom";

// components
import {
  Navbar,
  Footer,
} from "./components";

// pages
import {
  Home,
  About,
  Links,
  Experience,
  ResumeLogin,
  // Resume,
  Projects,
  // Contact,
  Construction
} from "./pages";

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/links" element={<Links />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/resume" element={<ResumeLogin />} />
      <Route path="/projects" element={<Projects />} />
      {/* <Route path="/contact" element={<Contact />} /> */}
      <Route path="*" element={<Construction />} />
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);
