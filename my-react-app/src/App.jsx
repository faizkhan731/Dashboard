import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersonalData from "./components/PersonalData";
import Dashboard from "./components/Summary";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonalData />} />
        <Route path="/Summary" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
