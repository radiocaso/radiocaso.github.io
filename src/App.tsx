import { Route, Routes } from "react-router";
import Home from "@/pages/Home";
import Schedule from "@/pages/Schedule";
import Archive from "@/pages/Archive";
import Publications from "@/pages/Publications";
import Info from "@/pages/Info";
import Header from "@/components/layout/Header";
import Player from "./features/player/Player";
import ArchivePermalinkTool from "@/tools/ArchivePermalinkTool";

export function App() {
  return (
    <>
      <Header />
      <section className="pb-32">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agenda" element={<Schedule />} />
          <Route path="/archivo" element={<Archive />} />
          <Route path="/publicaciones" element={<Publications />} />
          <Route path="/info" element={<Info />} />
          <Route path="/permanentes" element={<ArchivePermalinkTool />} />
        </Routes>
      </section>
      <div className="bg-background fixed bottom-0 left-0 w-full">
        <Player />
      </div>
    </>
  );
}

export default App;
