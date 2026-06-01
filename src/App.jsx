import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import PortfolioShell from "./components/PortfolioShell";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PortfolioShell />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
