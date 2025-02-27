import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SaveChange from "./pages/SaveChange";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saveChange/:id" element={<SaveChange />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
