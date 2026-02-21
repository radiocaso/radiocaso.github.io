import { Route, Routes } from "react-router";
import Home from "@/pages/Home";
import Schedule from "@/pages/Schedule";
import Archive from "@/pages/Archive";
import Publications from "@/pages/Publications";
import Info from "@/pages/Info";
import Header from "@/components/layout/Header";

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agenda" element={<Schedule />} />
        <Route path="/archivo" element={<Archive />} />
        <Route path="/publicaciones" element={<Publications />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </>
  );
}

export default App;
