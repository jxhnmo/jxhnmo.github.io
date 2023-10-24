import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
  Projects,
  Contact,
  Construction
} from "./pages";

ReactDOM.render(
  <Router basename="/jxhnmo.github.io/">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/links" element={<Links />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Construction />} />
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);
