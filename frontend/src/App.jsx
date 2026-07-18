import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About-impact';
import TruckOwner from './pages/Truck';
import AgentExperiencePage from './pages/agent-experience/AgentExperiencePage';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/truck-owner" element={<TruckOwner />} />
        <Route path="/talk-to-agent" element={<AgentExperiencePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}