"use client";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Revealer } from "../components/Revealer";
import WorkInfo from "../components/WorkInfo";
import WorkText from "../components/WorkText";

export default function Work() {
  return (
    <div className="relative w-full work">
      <Revealer />

      <div className="flex flex-col min-h-screen">
        <Navbar active="work" />
        <WorkText />
      </div>
      <WorkInfo />

      <Footer />
    </div>
  );
}
